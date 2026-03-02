(function () {
  const data = window.PA_APP_DATA;
  const A = data.assumptions;
  const allIndustries = data.industries;
  const countyProfiles = data.countyProfiles;

  const params = new URLSearchParams(window.location.search);
  const requested = params.get("industry");
  const fallbackKey = "advanced_manufacturing";
  const key = Object.prototype.hasOwnProperty.call(allIndustries, requested) ? requested : fallbackKey;
  const d = allIndustries[key];
  const bench = data.industryBenchmarks[key];

  const BASE_SCENARIO = {
    investment: 5000000,
    wage: 78000,
    land: 7.5,
    capacity: 800,
    employees: 45,
    countyKey: "allegheny"
  };

  const fields = {
    county: document.getElementById("county"),
    investment: document.getElementById("investment"),
    employees: document.getElementById("employees"),
    wage: document.getElementById("wage"),
    land: document.getElementById("land"),
    capacity: document.getElementById("capacity")
  };
  const wizardFields = {
    county: document.getElementById("wizCounty"),
    facilityType: document.getElementById("wizFacilityType"),
    emissionsWastewater: document.getElementById("wizEmissionsWastewater"),
    solidWaste: document.getElementById("wizSolidWaste"),
    employees: document.getElementById("wizEmployees")
  };

  const fmtMoney = n => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);
  const fmtPct = n => `${(n * 100).toFixed(1)}%`;
  const fmtPctPt = n => `${n.toFixed(2)}%`;
  let cashflowChart = null;
  let costMixChart = null;

  function safeNum(v, f = 0) {
    const n = Number(v);
    return Number.isFinite(n) ? n : f;
  }

  function scoreTag(v) {
    if (v <= 4) return `<span class="tag t-good">${v}/10</span>`;
    if (v <= 7) return `<span class="tag t-mid">${v}/10</span>`;
    return `<span class="tag t-high">${v}/10</span>`;
  }

  function destroyCharts() {
    if (cashflowChart) {
      cashflowChart.destroy();
      cashflowChart = null;
    }
    if (costMixChart) {
      costMixChart.destroy();
      costMixChart = null;
    }
  }

  function initCountySelect() {
    const options = Object.entries(countyProfiles)
      .sort((a, b) => a[1].label.localeCompare(b[1].label))
      .map(([countyKey, c]) => `<option value="${countyKey}">${c.label}</option>`)
      .join("");
    if (fields.county) {
      fields.county.innerHTML = options;
      fields.county.value = BASE_SCENARIO.countyKey;
    }
    if (wizardFields.county) {
      wizardFields.county.innerHTML = options;
      wizardFields.county.value = BASE_SCENARIO.countyKey;
    }
  }

  function getWizardInput() {
    const countyKey = wizardFields.county
      ? wizardFields.county.value
      : (fields.county ? fields.county.value : BASE_SCENARIO.countyKey);
    const employeesVal = wizardFields.employees
      ? wizardFields.employees.value
      : (fields.employees ? fields.employees.value : BASE_SCENARIO.employees);
    return {
      countyKey,
      facilityType: wizardFields.facilityType ? wizardFields.facilityType.value : "new_build",
      emissionsWastewater: wizardFields.emissionsWastewater ? wizardFields.emissionsWastewater.value : "no",
      solidWaste: wizardFields.solidWaste ? wizardFields.solidWaste.value : "no",
      employees: Math.max(1, safeNum(employeesVal, BASE_SCENARIO.employees))
    };
  }

  function buildWizardChecklist(w) {
    const checklist = [];
    checklist.push({
      step: "Confirm project scope and municipal pre-application meeting",
      agency: "County/Municipal Planning & Zoning Office",
      duration: "1-3 weeks"
    });
    checklist.push({
      step: "Complete business registration and tax account setup",
      agency: "PA Department of State + PA Business One-Stop",
      duration: "1-2 weeks"
    });

    if (w.facilityType === "new_build") {
      checklist.push({
        step: "Land development review and zoning approvals for new construction",
        agency: "Municipal Zoning Board / Planning Commission",
        duration: "6-16 weeks"
      });
      checklist.push({
        step: "UCC building permits, plan review, and staged inspections",
        agency: "Municipal UCC Office or Third-Party UCC Agency",
        duration: "4-12 weeks"
      });
    } else if (w.facilityType === "retrofit") {
      checklist.push({
        step: "Change-of-use check and alteration permit package",
        agency: "Municipal Zoning + UCC Office",
        duration: "3-8 weeks"
      });
    } else {
      checklist.push({
        step: "Office occupancy and fit-out compliance check",
        agency: "Municipal Zoning + UCC Office",
        duration: "2-6 weeks"
      });
    }

    if (w.emissionsWastewater === "yes") {
      checklist.push({
        step: "DEP media permitting screening (air/wastewater/stormwater as applicable)",
        agency: "PA DEP Regional Office",
        duration: "8-24 weeks"
      });
    } else {
      checklist.push({
        step: "Document no-major-media-permit determination",
        agency: "PA DEP Regional Office (verification)",
        duration: "1-3 weeks"
      });
    }

    if (w.solidWaste === "yes") {
      checklist.push({
        step: "Residual/solid waste handling approval pathway",
        agency: "PA DEP",
        duration: "4-16 weeks"
      });
    }

    checklist.push({
      step: "Fire, life-safety, and final occupancy approval",
      agency: "Local Fire Marshal + UCC Inspector",
      duration: "2-6 weeks"
    });

    if (w.employees >= 20) {
      checklist.push({
        step: "Payroll, unemployment, and labor compliance setup",
        agency: "PA Revenue + PA Labor & Industry",
        duration: "1-3 weeks"
      });
    }

    return checklist;
  }

  function renderWizard() {
    const w = getWizardInput();
    const county = countyProfiles[w.countyKey];
    const checklist = buildWizardChecklist(w);

    const resources = [
      ["Business One-Stop Shop Registration", "https://business.pa.gov/register/registering-with-pennsylvania/"],
      ["PA DOS Business Registration", "https://www.pa.gov/agencies/dos/programs/business.html"],
      ["PA DEP Permits", "https://www.pa.gov/agencies/dep/programs-and-services/business.html"],
      ["UCC Building Permits", "https://www.pa.gov/agencies/dli/programs-services/labor-management-relations/bureau-of-occupational-and-industrial-safety/uniform-construction-code-home"]
    ];

    const docs = [
      "Business formation documents and tax account confirmations",
      "Site control evidence (deed, lease, or option agreement)",
      "Facility/site plan set, narrative of operations, and equipment list",
      "Utility demand profile and connection information",
      "Zoning application materials and municipality forms"
    ];
    if (w.emissionsWastewater === "yes") {
      docs.push("Environmental technical attachments (discharge/emissions details, process flow narrative, and supporting calculations)");
    }
    if (w.solidWaste === "yes") {
      docs.push("Waste handling/storage procedures and contractor/disposal pathway documentation");
    }

    const rejectReasons = [
      "Incomplete application forms or unsigned certification pages",
      "Missing engineering/technical attachments or inconsistent project descriptions",
      "Site plan details that do not match zoning use classification",
      "Unclear waste/emissions handling pathway or unsupported assumptions",
      "Incorrect fee payment, missing application exhibits, or outdated form versions"
    ];

    const summary = document.getElementById("wizardSummary");
    if (summary) {
      summary.innerHTML = `
        <div class="industry-card">
          <h4 style="margin:0 0 8px;">Wizard Summary</h4>
          <div class="meta-row"><strong>County</strong><span>${county ? county.label : "Not selected"}</span></div>
          <div class="meta-row"><strong>Facility Type</strong><span>${w.facilityType.replace("_", " ")}</span></div>
          <div class="meta-row"><strong>Environmental Trigger</strong><span>${w.emissionsWastewater === "yes" ? "Yes" : "No"}</span></div>
          <div class="meta-row"><strong>Solid Waste</strong><span>${w.solidWaste === "yes" ? "Yes" : "No"}</span></div>
          <div class="meta-row"><strong>Expected Employees</strong><span>${w.employees.toLocaleString("en-US")}</span></div>
          <div class="meta-row" style="border-bottom:0;"><strong>Last Generated</strong><span>${new Date().toLocaleTimeString()}</span></div>
        </div>
      `;
    }

    const output = document.getElementById("wizardOutput");
    if (!output) return;
    output.innerHTML = `
      <h4 style="margin:0 0 8px;">Step-by-Step Checklist</h4>
      <ol>
        ${checklist.map(item => `<li><strong>${item.step}</strong><br><span class="muted">Agency: ${item.agency} | Typical duration: ${item.duration}</span></li>`).join("")}
      </ol>
      <h4 style="margin:12px 0 8px;">Official PA Resources</h4>
      <ul>
        ${resources.map(([label, url]) => `<li><a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a></li>`).join("")}
      </ul>
      <h4 style="margin:12px 0 8px;">Documents Typically Required</h4>
      <ul>
        ${docs.map(d0 => `<li>${d0}</li>`).join("")}
      </ul>
      <h4 style="margin:12px 0 8px;">Common Reasons Applications Are Returned/Rejected</h4>
      <ul>
        ${rejectReasons.map(r0 => `<li>${r0}</li>`).join("")}
      </ul>
      <p class="muted" style="margin-top:10px;">Typical requirements vary by municipality; verify with local officials.</p>
    `;
  }

  function safeRenderAnalysis() {
    try {
      renderAnalysis();
    } catch (e) {
      const p = document.getElementById("resultPanel");
      if (p) {
        p.innerHTML = `<h2>Analysis Outcome</h2><p class="muted">The analysis module encountered an error and could not render. Reload the page and try again.</p>`;
      }
      // Keep app interactive; log for diagnostics.
      console.error("renderAnalysis error:", e);
    }
  }

  function safeRenderWizard() {
    try {
      renderWizard();
    } catch (e) {
      const out = document.getElementById("wizardOutput");
      if (out) {
        out.innerHTML = `<p class="muted">The wizard module encountered an error and could not render. Reload the page and try again.</p>`;
      }
      console.error("renderWizard error:", e);
    }
  }

  function getInput() {
    const countyVal = wizardFields.county
      ? wizardFields.county.value
      : (fields.county ? fields.county.value : BASE_SCENARIO.countyKey);
    const employeesVal = wizardFields.employees
      ? safeNum(wizardFields.employees.value, BASE_SCENARIO.employees)
      : (fields.employees ? safeNum(fields.employees.value, BASE_SCENARIO.employees) : BASE_SCENARIO.employees);
    return {
      countyKey: countyVal || BASE_SCENARIO.countyKey,
      investment: fields.investment ? safeNum(fields.investment.value, BASE_SCENARIO.investment) : BASE_SCENARIO.investment,
      employees: Math.max(1, employeesVal),
      wage: fields.wage ? safeNum(fields.wage.value, BASE_SCENARIO.wage) : BASE_SCENARIO.wage,
      land: fields.land ? safeNum(fields.land.value, BASE_SCENARIO.land) : BASE_SCENARIO.land,
      capacity: fields.capacity ? safeNum(fields.capacity.value, BASE_SCENARIO.capacity) : BASE_SCENARIO.capacity
    };
  }

  function forecast(input) {
    const annualPayroll = input.employees * input.wage;
    const revenueBase = (
      input.investment * d.capTurnover * 0.45 +
      input.employees * d.revenuePerEmployee * 0.35 +
      input.capacity * d.revenuePerCapacityUnit * 0.20
    );

    const kwh = (
      input.employees * d.energyIntensityKwhPerEmployee +
      input.capacity * d.energyIntensityKwhPerCapacity +
      input.land * 15000
    );

    const baseRate = key === "construction_green_building"
      ? A.electricityCents.commercial / 100
      : A.electricityCents.industrial / 100;
    const electricityRate = baseRate;

    let revenue = revenueBase;
    let payroll = annualPayroll;
    let propertyTax = input.land * d.baseLandValuePerAcre * A.propertyTaxRate;
    let energyCost = kwh * electricityRate;

    const yearly = [];
    for (let year = 1; year <= 5; year++) {
      if (year > 1) {
        revenue *= 1 + A.revenueGrowth;
        payroll *= 1 + 0.03;
        propertyTax *= 1 + A.taxInflation;
        energyCost *= 1 + A.energyInflation;
      }
      const opProfit = revenue * d.margin;
      const cnit = Math.max(0, opProfit) * A.cnitRate;
      const payrollTax = payroll * A.payrollTaxRate;
      const taxTotal = cnit + payrollTax + propertyTax;
      const netProfit = opProfit - taxTotal - energyCost;

      yearly.push({ year, revenue, opProfit, laborShare: payroll / Math.max(revenue, 1), taxTotal, energyCost, netProfit });
    }

    const totalNet = yearly.reduce((s, r) => s + r.netProfit, 0);
    const totalTax = yearly.reduce((s, r) => s + r.taxTotal, 0);
    const totalEnergy = yearly.reduce((s, r) => s + r.energyCost, 0);
    const avgLaborShare = yearly.reduce((s, r) => s + r.laborShare, 0) / yearly.length;

    const minMonths = d.approvalMonths[0] + (input.land > 10 ? 1 : 0);
    const maxMonths = d.approvalMonths[1] + (input.land > 10 ? 2 : 0) + (input.capacity > 1200 ? 1 : 0);

    const incomeMin = Math.min(...yearly.map(y => y.revenue));
    const incomeMax = Math.max(...yearly.map(y => y.revenue));
    const profitMin = Math.min(...yearly.map(y => y.netProfit));
    const profitMax = Math.max(...yearly.map(y => y.netProfit));

    let breakEvenYear = ">5";
    let cum = 0;
    for (const y of yearly) {
      cum += y.netProfit;
      if (cum >= input.investment) {
        breakEvenYear = y.year;
        break;
      }
    }

    return {
      yearly,
      totalNet,
      totalTax,
      totalEnergy,
      avgLaborShare,
      minMonths,
      maxMonths,
      incomeMin,
      incomeMax,
      profitMin,
      profitMax,
      breakEvenYear,
      electricityRate,
      annualKwh: kwh
    };
  }

  function evaluatePolicies(input) {
    const county = countyProfiles[input.countyKey];
    const inPriorityZone = ["allegheny", "lancaster", "york", "dauphin", "philadelphia"].includes(input.countyKey);
    const isManufacturing = ["advanced_manufacturing", "battery_storage", "life_sciences_manufacturing"].includes(key);
    const hasRAndDSignal = ["advanced_manufacturing", "life_sciences_manufacturing", "battery_storage"].includes(key)
      && (input.wage >= 70000 || input.capacity >= 700);

    const delta = (actual, required, unit) => {
      if (actual >= required) return "Met";
      const gap = required - actual;
      if (unit === "jobs") return `Short by ${gap} jobs`;
      if (unit === "usd") return `Short by ${fmtMoney(gap)}`;
      return `Short by ${gap} ${unit}`;
    };

    const rules = [
      {
        policy: data.policyRules.koz_kiz.name,
        pass: inPriorityZone,
        rule: data.policyRules.koz_kiz.ruleText,
        checks: [
          { label: "Industry scope", hit: true, detail: `${d.label} is typically eligible to screen` },
          { label: "County/location", hit: inPriorityZone, detail: inPriorityZone ? `${county.label} is in an indicative priority geography` : `${county.label} may be outside eligible KOZ/KIZ geography (typical/varies)` },
          { label: "Investment threshold", hit: true, detail: "No fixed statewide minimum in this screening model (typical/varies)" },
          { label: "Jobs threshold", hit: true, detail: "No fixed statewide minimum in this screening model (typical/varies)" },
          { label: "Timing window", hit: true, detail: "Apply before major tax-year events where required (typical/varies)" }
        ],
        deltas: ["County eligibility confirmation required"],
        missingGap: inPriorityZone ? "None (verify designated parcel status)" : "Location ineligible risk: confirm KOZ/KIZ designation",
        apply: {
          steps: [
            "Confirm parcel eligibility with local/DCED contacts (typical/varies).",
            "Compile project narrative, site information, and activity classification.",
            "Submit required forms before applicable deadlines.",
            "Track compliance/annual reporting obligations after approval."
          ],
          reviewTime: "Typical review timing varies by program window and local coordination.",
          docs: ["Parcel/site identifiers", "Business registration records", "Project activity summary", "Tax/compliance attestations (typical/varies)"]
        }
      },
      {
        policy: data.policyRules.mtc.name,
        pass: isManufacturing && input.investment >= 2000000 && input.employees >= 25,
        rule: data.policyRules.mtc.ruleText,
        checks: [
          { label: "Industry scope", hit: isManufacturing, detail: isManufacturing ? "Manufacturing-oriented profile aligned" : "Industry scope may not align with MTC intent" },
          { label: "County/location", hit: true, detail: `${county.label} can be screened; local factors vary` },
          { label: "Investment threshold", hit: input.investment >= 2000000, detail: `${fmtMoney(input.investment)} vs typical ${fmtMoney(2000000)} screen` },
          { label: "Jobs threshold", hit: input.employees >= 25, detail: `${input.employees} vs typical 25+ jobs screen` },
          { label: "Timing window", hit: true, detail: "Program cycle/deadline compliance required (typical/varies)" }
        ],
        deltas: [
          delta(input.investment, 2000000, "usd"),
          delta(input.employees, 25, "jobs")
        ],
        missingGap: (isManufacturing && input.investment >= 2000000 && input.employees >= 25)
          ? "None (subject to program scoring and documentation)"
          : "Increase manufacturing scale and/or job plan; verify annual program cycle",
        apply: {
          steps: [
            "Confirm manufacturing activity mapping and payroll expansion plan.",
            "Prepare investment and job-creation evidence.",
            "Submit MTC application in active filing window.",
            "Maintain records for post-award verification."
          ],
          reviewTime: "Typical review time varies by application volume and documentation completeness.",
          docs: ["Payroll baseline and projections", "Capex schedule", "Hiring plan by period", "Tax/account standing documentation"]
        }
      },
      {
        policy: data.policyRules.rnd_credit.name,
        pass: hasRAndDSignal,
        rule: data.policyRules.rnd_credit.ruleText,
        checks: [
          { label: "Industry scope", hit: ["advanced_manufacturing", "life_sciences_manufacturing", "battery_storage"].includes(key), detail: "R&D intensity generally stronger in this industry set" },
          { label: "County/location", hit: true, detail: `${county.label} may support R&D operations; local ecosystem varies` },
          { label: "Investment threshold", hit: input.investment >= 1000000, detail: `${fmtMoney(input.investment)} vs indicative ${fmtMoney(1000000)} scale check` },
          { label: "Jobs threshold", hit: input.employees >= 10, detail: `${input.employees} vs indicative 10+ technical roles` },
          { label: "Timing window", hit: true, detail: "Annual filing windows and documentation deadlines apply (typical/varies)" }
        ],
        deltas: [
          delta(input.investment, 1000000, "usd"),
          delta(input.employees, 10, "jobs")
        ],
        missingGap: hasRAndDSignal ? "None (subject to qualified R&D definition and documentation)" : "Define qualified R&D activity and documentation process",
        apply: {
          steps: [
            "Document qualified R&D scope, methodology, and cost categories.",
            "Prepare expenditure support and accounting trail.",
            "Submit credit application within the published filing window.",
            "Retain technical evidence for audit/verification."
          ],
          reviewTime: "Typical review time varies; technical documentation depth is a common driver.",
          docs: ["R&D project descriptions", "Qualified expense schedules", "Accounting backup", "Technical records by project"]
        }
      },
      {
        policy: data.policyRules.edge.name,
        pass: input.investment >= 5000000 && input.employees >= 30,
        rule: data.policyRules.edge.ruleText,
        checks: [
          { label: "Industry scope", hit: true, detail: `${d.label} can be screened against relevant EDGE tracks (typical/varies)` },
          { label: "County/location", hit: true, detail: `${county.label} eligible for screening; program rules and scoring vary` },
          { label: "Investment threshold", hit: input.investment >= 5000000, detail: `${fmtMoney(input.investment)} vs indicative ${fmtMoney(5000000)} check` },
          { label: "Jobs threshold", hit: input.employees >= 30, detail: `${input.employees} vs indicative 30+ jobs check` },
          { label: "Timing window", hit: true, detail: "Application period and commitment timing are required (typical/varies)" }
        ],
        deltas: [
          delta(input.investment, 5000000, "usd"),
          delta(input.employees, 30, "jobs")
        ],
        missingGap: (input.investment >= 5000000 && input.employees >= 30)
          ? "None (subject to competitive scoring and compliance terms)"
          : "Strengthen investment and/or jobs commitment profile",
        apply: {
          steps: [
            "Select the appropriate EDGE track based on sector/project profile.",
            "Prepare investment, jobs, and timeline commitments.",
            "Submit application package during active cycle.",
            "Execute post-award reporting and compliance milestones."
          ],
          reviewTime: "Typical review timing varies by track and competitive demand.",
          docs: ["Project pro forma", "Jobs/investment commitment schedule", "Corporate structure and tax records", "Site/control documentation"]
        }
      }
    ];

    return {
      countyLabel: county ? county.label : "Unknown",
      rows: rules,
      passCount: rules.filter(r => r.pass).length
    };
  }

  function renderSnapshot() {
    document.getElementById("industryTitle").textContent = `${d.label} | Pennsylvania`;
    document.getElementById("snapshotPanel").innerHTML = `
      <h2>Industry Snapshot</h2>
      <p class="muted">This page follows a policy-and-business brief style for decision screening. Inputs drive the scenario result; context blocks explain structural opportunities and constraints in Pennsylvania.</p>
      <p class="muted">${d.snapshot}</p>
      <div class="grid cols-2">
        <div class="industry-card">
          <div class="meta-row"><strong>Market Maturity</strong><span>${d.marketMaturity}</span></div>
          <div class="meta-row"><strong>Employment Absorption</strong><span>${d.employmentAbsorption}</span></div>
          <div class="meta-row"><strong>Regulatory Intensity</strong><span>${d.regulatoryIntensity}</span></div>
          <div class="meta-row" style="border-bottom:0;"><strong>Data Confidence</strong><span>${d.confidence}</span></div>
        </div>
        <div class="industry-card">
          <div class="meta-row"><strong>Site Sensitivity Factors</strong><span>${d.siteFactors}</span></div>
          <div class="meta-row"><strong>Environmental Complexity</strong><span>${scoreTag(d.envScore)}</span></div>
          <div class="meta-row"><strong>Competition Pressure</strong><span>${scoreTag(d.competitionScore)}</span></div>
          <div class="meta-row" style="border-bottom:0;"><strong>Profit Margin Benchmark</strong><span>${fmtPct(d.margin)}</span></div>
        </div>
      </div>
    `;
  }

  function renderAnalysis() {
    const input = getInput();
    const county = countyProfiles[input.countyKey];
    const estabs = data.countyIndustryEstablishments[input.countyKey]
      ? data.countyIndustryEstablishments[input.countyKey][key]
      : null;

    const r = forecast(input);
    const policy = evaluatePolicies(input);

    document.getElementById("resultPanel").innerHTML = `
      <h2>Analysis Outcome</h2>
      <div class="kpis">
        <div class="kpi"><div class="v">${fmtMoney(r.totalNet)}</div><div class="l">5-Year Net Profit</div></div>
        <div class="kpi"><div class="v">${fmtPct(r.avgLaborShare)}</div><div class="l">Avg Labor Cost Proportion</div></div>
        <div class="kpi"><div class="v">${fmtMoney(r.totalTax)}</div><div class="l">5-Year Tax Burden</div></div>
        <div class="kpi"><div class="v">${fmtMoney(r.totalEnergy)}</div><div class="l">5-Year Energy Cost</div></div>
      </div>
      <p class="caption"><strong>What:</strong> Top-line scenario metrics for profitability and cost burden over five years. <strong>How computed:</strong> Model formulas combine margin benchmark, tax proxies, labor assumptions, and energy assumptions from current input scenario. <strong>Source:</strong> [C1], [C6], [C7], [C8].</p>
      <div class="grid cols-2">
        <div class="industry-card">
          <h4 style="margin:0 0 6px;">5-Year Revenue & Profit Trend</h4>
          <div style="height:280px;"><canvas id="cashflowChart"></canvas></div>
          <p class="caption"><strong>What:</strong> Year-by-year revenue, operating profit, and net profit trajectory. <strong>How computed:</strong> Revenue base projection with annual growth; profit values derived from margin and cost components. <strong>Source:</strong> [C6], [C7], [C8].</p>
        </div>
        <div class="industry-card">
          <h4 style="margin:0 0 6px;">Cost Structure by Year</h4>
          <div style="height:280px;"><canvas id="costMixChart"></canvas></div>
          <p class="caption"><strong>What:</strong> Stacked annual burden from labor (proxy), tax, and energy costs. <strong>How computed:</strong> Labor share * revenue proxy plus modeled tax and electricity cost lines. <strong>Source:</strong> [C1], [C7], model parameters.</p>
        </div>
      </div>
      <p class="muted" style="margin-top:8px;">County context: ${county.label}, logistics score ${county.logisticsScore}/100, labor availability ${county.laborAvailabilityScore}/100, state benchmark electricity rate ${fmtPctPt(r.electricityRate * 100)} cents/kWh.</p>
      <p class="muted">County electricity differential reference (not applied to base calculation): +${county.electricityAdderCents.toFixed(2)} cents/kWh vs state benchmark.</p>
      <p class="muted">Enterprise reference in selected county for this industry: ${estabs === null ? "suppressed/NA" : estabs.toLocaleString("en-US")} establishments.</p>
    `;
    renderCharts(r);

    document.getElementById("approvalPanel").innerHTML = `
      <h3>Regulatory Approval Process and Timeline</h3>
      <p><strong>Total Approval Time Forecast:</strong> ${r.minMonths}-${r.maxMonths} months</p>
      <ol>
        ${d.process.map(step => `<li>${step}</li>`).join("")}
      </ol>
      <p><strong>Government Websites</strong></p>
      <p>
        ${d.links.map(([label, url]) => `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>`).join(" | ")}
      </p>
      <p class="caption"><strong>What:</strong> Typical sequence and duration range for regulatory pathway planning. <strong>How computed:</strong> Rule-based timing logic from selected facility scenario and model assumptions (typical/varies). <strong>Source:</strong> [C2], [C3], [C4], [C5].</p>
    `;

    document.getElementById("contextPanel").innerHTML = `
      <h3>Industry Context In Pennsylvania</h3>
      <p class="muted">What drives demand, why Pennsylvania has an advantage, and major operating constraints.</p>
      <p>${d.contextPA}</p>
    `;

    document.getElementById("driversPanel").innerHTML = `
      <h3>Cost Drivers and Risk Factors</h3>
      <p>${d.costDriversIntro}</p>
      <ul>
        ${d.costDriversBullets.map(item => `<li>${item}</li>`).join("")}
      </ul>
      <p class="muted">Policy fit signal for this scenario: ${policy.passCount}/4 major policy checks currently pass.</p>
    `;

    const policyPanel = document.getElementById("policyExplainPanel");
    if (policyPanel) {
      policyPanel.innerHTML = `
        <h3>Incentive & Policy Eligibility Explainer</h3>
        <p class="muted">Screening output below is typical and varies by program cycle, county, and project details. This is a planning aid, not a guarantee of approval.</p>
        <div class="task-grid">
          ${policy.rows.map(row => `
            <article class="task-card">
              <h4 style="margin:0 0 6px;">${row.policy}</h4>
              <p class="muted" style="margin:0 0 8px;"><strong>Status:</strong> ${row.pass ? "Potential Match (typical)" : "Gap Identified (typical)"} | ${row.rule}</p>
              <ul class="task-checklist">
                ${row.checks.map(ch => `<li><strong>${ch.label}:</strong> ${ch.hit ? "Hit" : "Unmet"} - ${ch.detail}</li>`).join("")}
              </ul>
              <p class="muted" style="margin-top:8px;"><strong>Numeric Deltas:</strong> ${row.deltas.join(" | ")}</p>
              <p class="muted"><strong>Primary Gap:</strong> ${row.missingGap}</p>
              <details style="margin-top:8px;">
                <summary><strong>How to apply (typical / varies)</strong></summary>
                <ol style="margin-top:8px;">
                  ${row.apply.steps.map(step => `<li>${step}</li>`).join("")}
                </ol>
                <p class="muted"><strong>Typical review time:</strong> ${row.apply.reviewTime}</p>
                <p class="muted"><strong>Required documents (high level):</strong></p>
                <ul>
                  ${row.apply.docs.map(doc => `<li>${doc}</li>`).join("")}
                </ul>
              </details>
              <p class="muted" style="margin-top:8px;"><strong>Common return/denial reasons (typical):</strong> compliance gaps, incomplete documentation, missed filing window, or location/program ineligibility.</p>
            </article>
          `).join("")}
        </div>
      `;
    }

    document.getElementById("interpretPanel").innerHTML = `
      <h3>Interpretation Guide Under The Results</h3>
      <p><strong>Net Profit:</strong> modeled post-tax and post-energy outcome over five years, based on your selected scale and representative margin assumptions.</p>
      <p><strong>Tax Burden:</strong> includes corporate-tax proxy, payroll-linked tax proxy, and property-tax proxy. Incentive eligibility can lower realized burden versus this base estimate.</p>
      <p><strong>Energy Cost:</strong> estimated from Pennsylvania electricity benchmarks and industry energy intensity assumptions. Tariff class and load profile can change this materially.</p>
      <p><strong>Labor Cost Share:</strong> indicates how much projected revenue is consumed by payroll. Compare scenarios by changing one variable at a time.</p>
      <p><strong>Scenario comparison:</strong> if wages rise, labor share and tax burden tend to increase; if efficient scale rises, revenue and operating profit can outpace fixed-cost growth; if electricity price rises, energy-intensive sectors see larger margin compression.</p>
    `;

    document.getElementById("limitsPanel").innerHTML = `
      <h3>Assumptions and Limits</h3>
      <p>This is not investment advice. The model is a simplified screening framework that uses representative rates and benchmark assumptions to support early decision-making.</p>
      <p>It does not model full accounting treatment such as project-specific depreciation schedules, financing structure, debt service, detailed incentive carryforward mechanics, or firm-specific tax elections.</p>
      <p>Use this output as a first-pass planning layer before legal, tax, engineering, and underwriting diligence.</p>
    `;
  }

  function rowsToCsv(rows) {
    return rows.map(r => r.map(val => {
      const s = String(val ?? "");
      return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
    }).join(",")).join("\n");
  }

  function triggerDownload(filename, content, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function buildCountyMetricsRows(input, result) {
    const county = countyProfiles[input.countyKey];
    const countyEst = data.countyIndustryEstablishments[input.countyKey]
      ? data.countyIndustryEstablishments[input.countyKey][key]
      : "NA";

    return [
      ["metric", "value"],
      ["generated_date", new Date().toISOString()],
      ["model_version", data.modelMeta.version],
      ["industry", d.label],
      ["county", county.label],
      ["county_logistics_score", county.logisticsScore],
      ["county_labor_availability_score", county.laborAvailabilityScore],
      ["county_land_cost_index", county.landCostIndex],
      ["county_raw_material_access_score", county.rawMaterialAccessScore],
      ["county_community_opposition_score", county.communityOppositionScore],
      ["county_establishments_for_selected_industry", countyEst === null ? "NA" : countyEst],
      ["state_enterprises_selected_industry", bench.enterprisesPA],
      ["five_year_growth_pct_reference", bench.growth5yPct],
      ["market_concentration_top5_county_share_pct", bench.marketConcentrationTop5CountySharePct === null ? "NA" : bench.marketConcentrationTop5CountySharePct],
      ["pa_state_cnit_rate", A.cnitRate],
      ["effective_electricity_rate_usd_per_kwh", result.electricityRate],
      ["county_electricity_differential_cents_reference", county.electricityAdderCents],
      ["annual_kwh_estimate", result.annualKwh],
      ["five_year_total_tax", result.totalTax],
      ["five_year_total_energy", result.totalEnergy],
      ["five_year_total_net_profit", result.totalNet]
    ];
  }

  function buildPolicyRows(input) {
    const policy = evaluatePolicies(input);
    const rows = [["policy", "pass_fail", "rule", "checks_hit", "checks_unmet", "numeric_deltas", "missing_gap"]];
    for (const r of policy.rows) {
      const hits = r.checks.filter(c => c.hit).map(c => c.label).join("; ");
      const unmet = r.checks.filter(c => !c.hit).map(c => c.label).join("; ");
      rows.push([r.policy, r.pass ? "PASS" : "FAIL", r.rule, hits || "None", unmet || "None", r.deltas.join(" | "), r.missingGap]);
    }
    rows.push(["summary", `${policy.passCount}/${policy.rows.length} pass`, "Typical/varies screening output only", "", "", "", ""]);
    return rows;
  }

  function exportCountyCsv() {
    const input = getInput();
    const r = forecast(input);
    const rows = buildCountyMetricsRows(input, r);
    const county = countyProfiles[input.countyKey].label.replace(/\s+/g, "_").toLowerCase();
    const industrySlug = key;
    triggerDownload(
      `county_key_metrics_${industrySlug}_${county}.csv`,
      rowsToCsv(rows),
      "text/csv;charset=utf-8"
    );
  }

  function exportPolicyCsv() {
    const input = getInput();
    const rows = buildPolicyRows(input);
    const county = countyProfiles[input.countyKey].label.replace(/\s+/g, "_").toLowerCase();
    const industrySlug = key;
    triggerDownload(
      `policy_match_checklist_${industrySlug}_${county}.csv`,
      rowsToCsv(rows),
      "text/csv;charset=utf-8"
    );
  }

  initCountySelect();
  renderSnapshot();
  safeRenderAnalysis();
  safeRenderWizard();

  if (wizardFields.county) {
    wizardFields.county.addEventListener("change", () => {
      if (fields.county) fields.county.value = wizardFields.county.value;
      safeRenderAnalysis();
      safeRenderWizard();
    });
  }
  if (wizardFields.facilityType) wizardFields.facilityType.addEventListener("change", safeRenderWizard);
  if (wizardFields.emissionsWastewater) wizardFields.emissionsWastewater.addEventListener("change", safeRenderWizard);
  if (wizardFields.solidWaste) wizardFields.solidWaste.addEventListener("change", safeRenderWizard);
  if (wizardFields.employees) wizardFields.employees.addEventListener("input", safeRenderWizard);
  const runWizardBtn = document.getElementById("runWizardBtn");
  if (runWizardBtn) runWizardBtn.addEventListener("click", safeRenderWizard);
  document.getElementById("exportCountyCsvBtn").addEventListener("click", exportCountyCsv);
  document.getElementById("exportPolicyCsvBtn").addEventListener("click", exportPolicyCsv);
})();

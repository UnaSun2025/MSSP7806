(function () {
  const data = window.PA_APP_DATA;
  const industries = data.industries;

  const enterpriseRef = {
    advanced_manufacturing: 2140,
    renewable_energy: 28,
    battery_storage: 5,
    life_sciences_manufacturing: 430,
    construction_green_building: 28752
  };

  const growthRef = {
    advanced_manufacturing: -1.23,
    renewable_energy: 2.87,
    battery_storage: 0.4,
    life_sciences_manufacturing: -0.63,
    construction_green_building: 1.26
  };

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function tagForLevel(value) {
    const v = value.toLowerCase();
    if (v.includes("high") || v.includes("stable")) return "t-high";
    if (v.includes("medium") || v.includes("growing")) return "t-mid";
    return "t-good";
  }

  function listFill(id, rows) {
    document.getElementById(id).innerHTML = rows.map(r => `<li>${escapeHtml(r)}</li>`).join("");
  }

  function paragraphFill(id, rows) {
    document.getElementById(id).innerHTML = rows.map(r => `<p>${escapeHtml(r)}</p>`).join("");
  }

  function renderCards() {
    const wrap = document.getElementById("industryCards");
    wrap.innerHTML = Object.entries(industries).map(([key, d]) => `
      <article class="industry-card">
        <h4>${escapeHtml(d.label)}</h4>
        <div class="meta-row"><strong>Market Maturity</strong><span><span class="tag ${tagForLevel(d.marketMaturity)}">${escapeHtml(d.marketMaturity)}</span></span></div>
        <div class="meta-row"><strong>Employment Absorption</strong><span>${escapeHtml(d.employmentAbsorption)}</span></div>
        <div class="meta-row"><strong>Regulatory Intensity</strong><span><span class="tag ${tagForLevel(d.regulatoryIntensity)}">${escapeHtml(d.regulatoryIntensity)}</span></span></div>
        <div class="meta-row"><strong>Site Sensitivity</strong><span>${escapeHtml(d.siteFactors)}</span></div>
        <div class="meta-row" style="border-bottom:0;"><strong>Data Confidence</strong><span><span class="tag t-brand">${escapeHtml(d.confidence)}</span></span></div>
        <a class="btn" href="./industry.html?industry=${encodeURIComponent(key)}">Open Industry Analysis</a>
      </article>
    `).join("");
  }

  function renderBars(containerId, values, pctFormatter) {
    const max = Math.max(...Object.values(values));
    const el = document.getElementById(containerId);
    el.innerHTML = Object.entries(industries).map(([key, d]) => {
      const val = values[key] || 0;
      const width = max > 0 ? (Math.abs(val) / max) * 100 : 0;
      const colorStyle = val < 0 ? "background:linear-gradient(90deg,#b45309,#dc2626);" : "";
      const label = pctFormatter ? pctFormatter(val) : val.toLocaleString("en-US");
      return `
        <div class="bar-row">
          <div class="bar-top"><span>${escapeHtml(d.label)}</span><strong>${escapeHtml(label)}</strong></div>
          <div class="bar-wrap"><div class="bar" style="width:${width.toFixed(2)}%;${colorStyle}"></div></div>
        </div>
      `;
    }).join("");
  }

  function initGuidedRouter() {
    const select = document.getElementById("startQuestion");
    const btn = document.getElementById("routeBtn");
    const hint = document.getElementById("routeHint");
    if (!select || !btn || !hint) return;

    const taskHints = {
      "task-plan": "Next step: complete the Plan checklist, then open an industry profile.",
      "task-register": "Next step: complete entity and tax setup actions before permit filings.",
      "task-permits": "Next step: confirm zoning/permit path with county and municipality contacts.",
      "task-hire-operate": "Next step: define workforce mix and operating controls before launch.",
      "task-incentives": "Next step: screen eligibility and build a conservative incentive scenario."
    };

    btn.addEventListener("click", () => {
      const targetId = select.value;
      if (!targetId) {
        hint.textContent = "Select your immediate need to receive a recommended task.";
        return;
      }
      const target = document.getElementById(targetId);
      if (!target) {
        hint.textContent = "Task section was not found. Refresh and try again.";
        return;
      }
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      hint.textContent = taskHints[targetId] || "Follow the checklist and proceed to the listed start link.";
    });
  }

  listFill("pillarList", data.environment.pillarIndustries);
  listFill("incentiveList", data.environment.incentives);
  listFill("geoList", data.environment.geographicDistribution);
  listFill("howToList", data.environment.howToUseSteps);
  paragraphFill("methodText", data.environment.methodAndAssumptions);
  paragraphFill("policyText", data.environment.policyContext);
  renderCards();
  renderBars("enterpriseBars", enterpriseRef, null);
  renderBars("growthBars", growthRef, v => `${v >= 0 ? "+" : ""}${v.toFixed(2)}%`);
  initGuidedRouter();
})();

window.PA_APP_DATA = {
  assumptions: {
    cnitRate: 0.0749,
    payrollTaxRate: 0.03,
    propertyTaxRate: 0.018,
    taxInflation: 0.025,
    energyInflation: 0.025,
    revenueGrowth: 0.04,
    electricityCents: {
      industrial: 7.87,
      commercial: 11.03,
      total: 12.51,
      sourceYear: 2024
    }
  },
  environment: {
    pillarIndustries: [
      "Advanced manufacturing and precision production",
      "Renewable energy and battery storage",
      "Life sciences manufacturing",
      "Construction and green building development"
    ],
    geographicDistribution: [
      "Southeast corridor (Philadelphia, Montgomery, Bucks, Chester): life sciences and advanced manufacturing clusters",
      "Southwest (Allegheny and surrounding counties): engineering, manufacturing, and construction depth",
      "Central and South-Central belts (Lancaster, York, Dauphin): diversified manufacturing and logistics-linked construction",
      "Targeted sites across KOZ/KIZ geographies: tax-favored development and innovation zones"
    ],
    incentives: [
      "Keystone Opportunity Zones (KOZ)",
      "Keystone Innovation Zones (KIZ)",
      "Manufacturing Tax Credit (MTC)",
      "R&D Tax Credit",
      "PA EDGE tax credits",
      "Sales/use tax exemptions for qualifying manufacturing equipment"
    ],
    howToUseSteps: [
      "Scan the five profile cards to shortlist industries by market maturity, regulatory intensity, and labor mix.",
      "Open an industry page and confirm that the snapshot aligns with your business model and product type.",
      "Input project assumptions: investment, staffing, wage level, land use, and annual capacity.",
      "Generate the five-year result and compare net profit, tax burden, energy cost, and labor share.",
      "Adjust one variable at a time (wages, scale, land, capacity) to see sensitivity before committing to site search.",
      "Use the approval process links to build a real permitting checklist with your legal, engineering, and tax advisors."
    ],
    methodAndAssumptions: [
      "Growth signal and enterprise scale shown on the homepage use Pennsylvania reference indicators (2019-2023 directional growth and 2023 establishment counts) to provide context rather than a full market forecast.",
      "On the industry page, your inputs are translated into a projected revenue base using a weighted structure: capital turnover, revenue per employee, and revenue per capacity unit. Operating profit is estimated from a representative industry margin.",
      "Tax burden combines a Pennsylvania corporate income tax proxy, a payroll-related tax proxy, and a land-linked local property-tax proxy. Energy cost uses Pennsylvania average retail electricity benchmarks (industrial/commercial) and intensity assumptions for each industry.",
      "Outputs are intentionally comparable across scenarios. They are designed for first-pass screening and sequencing decisions, not for audited financial statements or debt underwriting models."
    ],
    policyContext: [
      "Pennsylvania incentive architecture matters most when your project crosses investment, payroll, job creation, or location thresholds. KOZ/KIZ can materially alter site economics in specific geographies, while R&D credit and MTC are often more relevant to operating model and payroll growth over time.",
      "PA EDGE programs may improve project return in strategic sectors, but the practical value depends on application timing, competitive scoring, compliance obligations, and interaction with local packages.",
      "In practice, incentives should be modeled as scenario ranges (base/upside) until eligibility is verified with program administrators and local authorities.",
      "Eligibility, award size, carryforward rules, and approval timelines vary by program, site, and applicant profile; always validate before treating incentives as committed cash flow."
    ]
  },
  modelMeta: {
    version: "PA-Industry-Brief-Model v1.2.0",
    generatedDateISO: "2026-03-01",
    disclaimer: "This planning model is simplified and intended for early-stage screening only; it is not investment, legal, tax, or engineering advice."
  },
  industryBenchmarks: {
    advanced_manufacturing: {
      enterprisesPA: 2140,
      growth5yPct: -1.23,
      marketConcentrationTop5CountySharePct: 38.08,
      concentrationAreas: ["Bucks", "Allegheny", "Montgomery", "Lancaster", "York"],
      transportAdvantageAreas: ["Lehigh Valley freight corridor", "I-76/I-81 junction counties", "Southwest multimodal hubs"],
      rawMaterialDistributionNote: "Metals, fabricated inputs, and electronics subcomponents are broadly sourced through Southeast, Central, and Southwest supply corridors.",
      laborSupplySkilledScore: 78,
      avgWageUSD: 77280,
      unionCoveragePct: 12,
      depApprovalMeanMonths: 9.5,
      envControversyRisk: "Medium",
      communityOppositionRiskScore: 5
    },
    renewable_energy: {
      enterprisesPA: 28,
      growth5yPct: 2.87,
      marketConcentrationTop5CountySharePct: 100,
      concentrationAreas: ["Delaware", "Somerset", "select rural western counties"],
      transportAdvantageAreas: ["I-79/I-80 corridor", "Southeast utility load centers", "South-central interconnection nodes"],
      rawMaterialDistributionNote: "Major equipment is externally sourced; Pennsylvania advantage is in EPC capacity, logistics access, and regional grid adjacency.",
      laborSupplySkilledScore: 72,
      avgWageUSD: 127716,
      unionCoveragePct: 14,
      depApprovalMeanMonths: 11.5,
      envControversyRisk: "Medium-High",
      communityOppositionRiskScore: 6
    },
    battery_storage: {
      enterprisesPA: 5,
      growth5yPct: 0.4,
      marketConcentrationTop5CountySharePct: null,
      concentrationAreas: ["Data suppressed in public county breakout", "project-level siting is distributed"],
      transportAdvantageAreas: ["Southeast logistics belt", "Southwest industrial base", "I-81/I-78 distribution corridors"],
      rawMaterialDistributionNote: "Battery components are import- and interstate-dependent; value capture is often in integration, controls, and deployment services.",
      laborSupplySkilledScore: 74,
      avgWageUSD: 62144,
      unionCoveragePct: 11,
      depApprovalMeanMonths: 10.5,
      envControversyRisk: "High",
      communityOppositionRiskScore: 7
    },
    life_sciences_manufacturing: {
      enterprisesPA: 430,
      growth5yPct: -0.63,
      marketConcentrationTop5CountySharePct: 53.59,
      concentrationAreas: ["Montgomery", "Bucks", "Allegheny", "Philadelphia", "Chester"],
      transportAdvantageAreas: ["Greater Philadelphia airport/cold-chain network", "Southeast interstate corridor", "Pittsburgh research-health network"],
      rawMaterialDistributionNote: "Specialized inputs and packaging are distributed across national suppliers; local advantage is clinical and research adjacency.",
      laborSupplySkilledScore: 83,
      avgWageUSD: 116577,
      unionCoveragePct: 9,
      depApprovalMeanMonths: 12,
      envControversyRisk: "Medium",
      communityOppositionRiskScore: 4
    },
    construction_green_building: {
      enterprisesPA: 28752,
      growth5yPct: 1.26,
      marketConcentrationTop5CountySharePct: 39.48,
      concentrationAreas: ["Allegheny", "Bucks", "Montgomery", "Lancaster", "Philadelphia"],
      transportAdvantageAreas: ["Southeast metro belt", "Southwest urban core", "Central distribution corridors"],
      rawMaterialDistributionNote: "Concrete, steel, lumber, and fixtures move through statewide distributors; schedule risk is tied to trade sequencing more than single-source concentration.",
      laborSupplySkilledScore: 76,
      avgWageUSD: 77438,
      unionCoveragePct: 20,
      depApprovalMeanMonths: 7.5,
      envControversyRisk: "Medium",
      communityOppositionRiskScore: 5
    }
  },
  countyProfiles: {
    allegheny: { label: "Allegheny County", logisticsScore: 82, laborAvailabilityScore: 84, landCostIndex: 1.05, electricityAdderCents: 0.2, rawMaterialAccessScore: 77, communityOppositionScore: 5 },
    bucks: { label: "Bucks County", logisticsScore: 86, laborAvailabilityScore: 82, landCostIndex: 1.22, electricityAdderCents: 0.25, rawMaterialAccessScore: 75, communityOppositionScore: 6 },
    montgomery: { label: "Montgomery County", logisticsScore: 84, laborAvailabilityScore: 88, landCostIndex: 1.28, electricityAdderCents: 0.25, rawMaterialAccessScore: 74, communityOppositionScore: 6 },
    philadelphia: { label: "Philadelphia County", logisticsScore: 90, laborAvailabilityScore: 86, landCostIndex: 1.35, electricityAdderCents: 0.3, rawMaterialAccessScore: 72, communityOppositionScore: 7 },
    chester: { label: "Chester County", logisticsScore: 83, laborAvailabilityScore: 80, landCostIndex: 1.24, electricityAdderCents: 0.25, rawMaterialAccessScore: 73, communityOppositionScore: 5 },
    lancaster: { label: "Lancaster County", logisticsScore: 81, laborAvailabilityScore: 78, landCostIndex: 0.98, electricityAdderCents: 0.15, rawMaterialAccessScore: 80, communityOppositionScore: 4 },
    york: { label: "York County", logisticsScore: 80, laborAvailabilityScore: 77, landCostIndex: 0.94, electricityAdderCents: 0.12, rawMaterialAccessScore: 79, communityOppositionScore: 4 },
    delaware: { label: "Delaware County", logisticsScore: 85, laborAvailabilityScore: 79, landCostIndex: 1.18, electricityAdderCents: 0.25, rawMaterialAccessScore: 71, communityOppositionScore: 6 },
    somerset: { label: "Somerset County", logisticsScore: 68, laborAvailabilityScore: 64, landCostIndex: 0.72, electricityAdderCents: 0.08, rawMaterialAccessScore: 69, communityOppositionScore: 3 },
    dauphin: { label: "Dauphin County", logisticsScore: 79, laborAvailabilityScore: 75, landCostIndex: 0.9, electricityAdderCents: 0.12, rawMaterialAccessScore: 78, communityOppositionScore: 4 }
  },
  countyIndustryEstablishments: {
    allegheny: { advanced_manufacturing: 177, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 40, construction_green_building: 2700 },
    bucks: { advanced_manufacturing: 178, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 50, construction_green_building: 2601 },
    montgomery: { advanced_manufacturing: 169, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 61, construction_green_building: 2461 },
    philadelphia: { advanced_manufacturing: 0, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 33, construction_green_building: 1658 },
    chester: { advanced_manufacturing: 0, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 25, construction_green_building: 0 },
    lancaster: { advanced_manufacturing: 139, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 0, construction_green_building: 1919 },
    york: { advanced_manufacturing: 113, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 0, construction_green_building: 0 },
    delaware: { advanced_manufacturing: 0, renewable_energy: 4, battery_storage: null, life_sciences_manufacturing: 0, construction_green_building: 0 },
    somerset: { advanced_manufacturing: 0, renewable_energy: 4, battery_storage: null, life_sciences_manufacturing: 0, construction_green_building: 0 },
    dauphin: { advanced_manufacturing: 0, renewable_energy: 0, battery_storage: null, life_sciences_manufacturing: 0, construction_green_building: 0 }
  },
  policyRules: {
    koz_kiz: {
      name: "KOZ/KIZ Location Benefit",
      intent: "Reduce state/local tax burden in designated zones.",
      ruleText: "Potentially relevant when site is in eligible zone and project has qualified activity.",
      check: "zone_and_activity"
    },
    mtc: {
      name: "Manufacturing Tax Credit (MTC)",
      intent: "Payroll-linked tax credit for manufacturing job expansion.",
      ruleText: "Illustrative check: manufacturing-oriented project with meaningful payroll growth and capex scale.",
      check: "manufacturing_and_scale"
    },
    rnd_credit: {
      name: "R&D Tax Credit",
      intent: "Credit for qualified research expenditures.",
      ruleText: "Relevant if project includes sustained qualified R&D activity and documentation.",
      check: "rnd_activity"
    },
    edge: {
      name: "PA EDGE Programs",
      intent: "Targeted sectoral support for strategic investment and job creation.",
      ruleText: "Potential match when sector and investment/job profile meet program criteria.",
      check: "sector_and_jobs"
    }
  },
  dataSources: [
    "US Census County Business Patterns (CBP) derived metrics in project dataset (2019-2023)",
    "Pennsylvania Department of Revenue (Corporate Net Income Tax rate references)",
    "Pennsylvania DCED program pages (KOZ/KIZ, MTC, EDGE, incentives)",
    "US EIA Pennsylvania average retail electricity price references (2024)",
    "Damodaran industry benchmark margin dataset (margin.xls)",
    "PA DEP, PA PUC, PA Business One-Stop, and PA Health program links embedded in tool"
  ],
  industries: {
    advanced_manufacturing: {
      label: "Advanced Manufacturing",
      marketMaturity: "Growing",
      employmentAbsorption: "Technical 52% | Semi-skilled 33% | Management 15%",
      regulatoryIntensity: "High",
      siteFactors: "Electricity + Logistics + Technical labor",
      confidence: "High",
      snapshot: "Capital-intensive production with automation and process control. Strong fit where throughput and quality systems matter.",
      contextPA: "Pennsylvania's advanced manufacturing base sits at the intersection of legacy industrial know-how and modern process capability. Demand is driven by aerospace and defense suppliers, industrial machinery replacement cycles, transportation equipment modernization, and domestic reshoring pressure for critical components. Buyers increasingly expect reliability, shorter lead times, and traceable quality, which favors facilities with disciplined process engineering and robust workforce training. Pennsylvania has structural advantages here: deep transportation connectivity to Northeast and Midwest markets, established machining and fabrication talent pools, and a broad supplier ecosystem spanning metals, electronics, tooling, and industrial services. The state also benefits from a concentration of technical schools and engineering programs that support upskilling for automation-heavy production lines. Constraints still matter. Utility reliability and power cost exposure can materially affect economics for energy-intensive lines. Municipal permitting, stormwater obligations, and environmental controls can lengthen pre-operation timelines if site diligence is weak. Competition pressure is not only local; firms are compared against lower-cost regions and imported alternatives. Successful projects typically pair disciplined site screening with phased ramp plans, realistic labor assumptions, and early engagement with DEP and local authorities. Firms that establish supplier redundancy and digital production visibility generally improve resilience during demand swings and procurement disruption. This combination supports faster recovery when customer demand or component pricing changes abruptly.",
      costDriversIntro: "Cost performance in this sector usually depends on line utilization and quality yield as much as headline wages.",
      costDriversBullets: [
        "Labor: technical staffing depth, shift coverage, and training time affect both output and scrap rates.",
        "Energy: high machine loads make electricity price and demand profile meaningful to margin stability.",
        "Permitting: air/waste/stormwater triggers can add front-end design and compliance costs.",
        "Land use: larger footprints improve expansion flexibility but increase carrying and property-tax exposure.",
        "Supply chain: inbound component volatility can drive working-capital stress and schedule risk."
      ],
      margin: 0.15865,
      capTurnover: 0.95,
      revenuePerEmployee: 280000,
      revenuePerCapacityUnit: 9000,
      energyIntensityKwhPerEmployee: 22000,
      energyIntensityKwhPerCapacity: 450,
      baseLandValuePerAcre: 220000,
      envScore: 8,
      competitionScore: 7,
      approvalMonths: [8, 14],
      process: [
        "Business registration and tax account setup",
        "Local zoning, land development, and UCC permits",
        "DEP permits (air/water/waste/stormwater as triggered)",
        "Utility coordination and commissioning",
        "Incentive applications"
      ],
      links: [
        ["PA Business One-Stop", "https://business.pa.gov/"],
        ["PA DEP Business Programs", "https://www.pa.gov/agencies/dep/programs-and-services/business.html"],
        ["PA UCC / L&I", "https://www.pa.gov/agencies/dli/programs-services/labor-management-relations/bureau-of-occupational-and-industrial-safety/uniform-construction-code-home"],
        ["PA DCED Programs", "https://dced.pa.gov/programs/"]
      ]
    },
    renewable_energy: {
      label: "Renewable Energy",
      marketMaturity: "Rising",
      employmentAbsorption: "Technical 47% | Semi-skilled 36% | Management 17%",
      regulatoryIntensity: "Medium",
      siteFactors: "Land use + Interconnection + Logistics",
      confidence: "Medium",
      snapshot: "Project development around renewable generation assets, with dependence on siting, interconnection, and policy timing.",
      contextPA: "Renewable energy in Pennsylvania is shaped by utility procurement, corporate offtake trends, distributed generation economics, and gradual grid modernization needs. Demand comes from organizations seeking cost certainty, emissions targets, and resilience benefits, especially where power exposure is a strategic risk. Pennsylvania's advantage is its market adjacency and infrastructure position: projects can serve dense regional load centers, connect into established transmission corridors, and leverage existing engineering and construction capacity. The state also offers a broad ecosystem of legal, environmental, and technical service providers that can accelerate project structuring. At the same time, constraints are very site-dependent. Interconnection queue timing can be the dominant determinant of schedule. Land-use compatibility, local community acceptance, and environmental review requirements can alter both timeline and capex assumptions. Policy design and procurement pathways can change project bankability from one region to another. Projects that perform well are those that combine robust pre-development diligence with realistic assumptions on interconnection, curtailment risk, and permitting sequence. For entrepreneurs, the opportunity is attractive, but execution discipline around siting, grid access, and financing terms is essential to protect returns. Early alignment between offtake strategy and permitting path typically reduces late-stage redesign risk. Developers that secure community communication and transmission studies early often reduce schedule volatility and financing friction.",
      costDriversIntro: "In renewables, development and interconnection risk often outweigh pure equipment cost optimization.",
      costDriversBullets: [
        "Labor: engineering, field installation, and O&M staffing profiles differ by technology and asset scale.",
        "Energy: operating assets sell or offset electricity, but development-stage facilities still carry construction power costs.",
        "Permitting: environmental and local siting approvals can introduce scenario-dependent timing risk.",
        "Land use: lease structure, access, and geotechnical suitability strongly influence total project cost.",
        "Supply chain: module/equipment lead times and logistics constraints affect commissioning windows."
      ],
      margin: 0.198726,
      capTurnover: 0.72,
      revenuePerEmployee: 320000,
      revenuePerCapacityUnit: 14000,
      energyIntensityKwhPerEmployee: 6000,
      energyIntensityKwhPerCapacity: 120,
      baseLandValuePerAcre: 90000,
      envScore: 7,
      competitionScore: 6,
      approvalMonths: [10, 18],
      process: [
        "Entity setup and project structuring",
        "Local siting and zoning approvals",
        "DEP environmental permits where required",
        "Interconnection and energy-market approvals",
        "Incentive and financing compliance"
      ],
      links: [
        ["PA PUC Electricity", "https://www.puc.pa.gov/electricity/"],
        ["PA DEP", "https://www.pa.gov/agencies/dep/programs-and-services/business.html"],
        ["PA Business One-Stop", "https://business.pa.gov/"],
        ["PA DCED Programs", "https://dced.pa.gov/programs/"]
      ]
    },
    battery_storage: {
      label: "Battery Storage",
      marketMaturity: "Rising",
      employmentAbsorption: "Technical 49% | Semi-skilled 34% | Management 17%",
      regulatoryIntensity: "High",
      siteFactors: "Electricity + Safety code + Land use",
      confidence: "Medium",
      snapshot: "Storage-focused manufacturing/deployment with stricter safety, materials handling, and utility coordination requirements.",
      contextPA: "Battery storage demand is rising as power systems seek flexibility for peak management, renewable integration, and resilience planning. Commercial and utility users increasingly value dispatchable capacity that can reduce demand charges, support reliability, and complement renewable generation profiles. Pennsylvania is positioned to participate because it combines strong industrial capabilities with access to major regional load centers and grid nodes. Existing manufacturing and engineering talent can support both equipment production and deployment services, while proximity to interstate logistics networks improves distribution efficiency. The state's challenge is execution under safety and compliance intensity. Battery projects are sensitive to fire-code interpretation, local siting standards, and hazardous-material management requirements, especially for larger systems or mixed-use sites. Interconnection and operational controls add another technical layer that can affect schedule and commissioning readiness. Entrepreneurs entering this segment benefit from integrated planning: early authority engagement, robust safety design, and conservative assumptions on approval duration. Demand momentum is favorable, but projects are less forgiving when permitting and technical interfaces are treated as late-stage tasks. A disciplined predevelopment approach is often the difference between a fast launch and a prolonged schedule with eroded economics. Developers that standardize safety documentation and commissioning protocols usually shorten approval cycles across multiple sites.",
      costDriversIntro: "Battery economics are highly sensitive to safety design choices and operational integration assumptions.",
      costDriversBullets: [
        "Labor: specialized technicians, commissioning teams, and compliance managers can raise fixed staffing intensity.",
        "Energy: charging strategy and tariff structure influence lifecycle operating cost and margin behavior.",
        "Permitting: fire and environmental reviews can materially shift approval time and pre-opening expense.",
        "Land use: setback requirements and emergency access needs can reduce effective usable area.",
        "Supply chain: cell/module availability and standards compliance are recurring procurement risks."
      ],
      margin: 0.095347,
      capTurnover: 0.88,
      revenuePerEmployee: 300000,
      revenuePerCapacityUnit: 11000,
      energyIntensityKwhPerEmployee: 18000,
      energyIntensityKwhPerCapacity: 320,
      baseLandValuePerAcre: 180000,
      envScore: 8,
      competitionScore: 6,
      approvalMonths: [9, 16],
      process: [
        "Business registration and site entitlement",
        "Fire/UCC and hazardous-material review",
        "DEP permits if construction/discharge/waste triggers apply",
        "Utility or interconnection coordination",
        "Final compliance and operational approvals"
      ],
      links: [
        ["PA DEP", "https://www.pa.gov/agencies/dep/programs-and-services/business.html"],
        ["PA UCC / L&I", "https://www.pa.gov/agencies/dli/programs-services/labor-management-relations/bureau-of-occupational-and-industrial-safety/uniform-construction-code-home"],
        ["PA PUC", "https://www.puc.pa.gov/"],
        ["PA Business One-Stop", "https://business.pa.gov/"]
      ]
    },
    life_sciences_manufacturing: {
      label: "Life Sciences Manufacturing",
      marketMaturity: "Stable",
      employmentAbsorption: "Technical 58% | Semi-skilled 24% | Management 18%",
      regulatoryIntensity: "High",
      siteFactors: "Labor + Compliance infrastructure + Electricity",
      confidence: "High",
      snapshot: "Highly regulated production with quality-system intensity and possible health-product registration obligations.",
      contextPA: "Life sciences manufacturing demand is supported by long-run healthcare utilization, specialty therapeutics growth, and continued emphasis on supply-chain resilience for critical products. Buyers value validated quality systems, traceability, and dependable production continuity more than low-cost positioning alone. Pennsylvania's advantage is a dense ecosystem of research institutions, clinical networks, specialized talent, and contract service providers that can support both early-stage and scaled operations. The state also benefits from proximity to major East Coast markets and logistics channels, reducing lead times for high-value products. However, operating in this segment requires tolerance for regulatory rigor and documentation intensity. Facility design, quality management maturity, and compliance staffing can become decisive cost and schedule drivers before commercial output begins. Local permitting, environmental controls, and product-specific registration pathways can overlap and create sequencing challenges if not managed early. Entrepreneurs with strong technical leadership and structured validation planning are best positioned to capture value. Pennsylvania offers a favorable platform, but execution success depends on integrating site, quality, permitting, and workforce decisions into one coherent launch plan rather than treating them as separate workstreams. Teams that plan validation milestones alongside construction milestones often reduce time-to-market uncertainty. Clear change-control governance during ramp-up also helps protect quality and commercial timelines.",
      costDriversIntro: "In life sciences, quality and compliance infrastructure can dominate early operating economics.",
      costDriversBullets: [
        "Labor: highly skilled technical roles and QA/QC staffing create a higher fixed labor floor.",
        "Energy: controlled environments and process utilities add steady base-load consumption.",
        "Permitting: environmental and product-related compliance can overlap, increasing coordination burden.",
        "Land use: room for validation suites and expansion zones improves long-term operating flexibility.",
        "Supply chain: qualified inputs and cold-chain/controlled logistics can create resilience costs."
      ],
      margin: 0.295397,
      capTurnover: 0.82,
      revenuePerEmployee: 420000,
      revenuePerCapacityUnit: 20000,
      energyIntensityKwhPerEmployee: 16000,
      energyIntensityKwhPerCapacity: 260,
      baseLandValuePerAcre: 260000,
      envScore: 9,
      competitionScore: 8,
      approvalMonths: [11, 20],
      process: [
        "Entity and tax setup",
        "Local zoning/UCC and commissioning pathway",
        "PA Health registration where applicable",
        "DEP permits for operational emissions/discharges",
        "Federal quality overlays (where applicable)"
      ],
      links: [
        ["PA Health Registration", "https://www.pa.gov/services/health/register-drugs-devices-cosmetics.html"],
        ["PA DEP", "https://www.pa.gov/agencies/dep/programs-and-services/business.html"],
        ["PA Business One-Stop", "https://business.pa.gov/"],
        ["PA UCC / L&I", "https://www.pa.gov/agencies/dli/programs-services/labor-management-relations/bureau-of-occupational-and-industrial-safety/uniform-construction-code-home"]
      ]
    },
    construction_green_building: {
      label: "Construction & Green Building Development",
      marketMaturity: "Growing",
      employmentAbsorption: "Technical 31% | Semi-skilled 54% | Management 15%",
      regulatoryIntensity: "Medium",
      siteFactors: "Logistics + Land use + Labor",
      confidence: "High",
      snapshot: "Project-driven industry with sensitivity to labor productivity, schedule control, and permitting cycle time.",
      contextPA: "Construction and green building development in Pennsylvania is supported by ongoing retrofit demand, infrastructure cycles, institutional upgrades, and broader adoption of efficiency-oriented building standards. Demand is often tied to local capital spending and financing conditions, but sustainability requirements are increasingly embedded in owner mandates, which creates durable opportunities for firms with strong execution and compliance capability. Pennsylvania's advantage includes a large installed building base, diversified metro and regional submarkets, and access to established contractor and trade networks. This allows firms to position across new build, renovation, and energy-performance upgrades rather than relying on one segment. Constraints remain significant. Margin pressure can emerge quickly from labor productivity gaps, schedule slippage, and fragmented subcontractor coordination. Permitting and inspection timelines vary by municipality and project type, and site conditions can shift budgets after mobilization. Material availability and price swings still require active procurement discipline. Entrepreneurs can succeed when they treat preconstruction planning, labor strategy, and permitting sequencing as core commercial levers, not just compliance tasks. In Pennsylvania, competitive advantage usually comes from reliability and delivery control rather than price alone. Firms with strong subcontractor integration and early design coordination generally protect margin more consistently across market cycles. Strong owner communication and contingency planning further reduce change-order disputes and delay risk.",
      costDriversIntro: "For construction-led projects, schedule control is often the strongest predictor of realized margin.",
      costDriversBullets: [
        "Labor: crew availability and productivity variance materially affect cost-to-complete.",
        "Energy: project-site power is smaller than industrial sectors but still relevant for equipment and temporary systems.",
        "Permitting: municipal review and inspection cadence can accelerate or compress project cash cycles.",
        "Land use: entitlement complexity and site prep requirements can alter early capex assumptions.",
        "Supply chain: trade sequencing and material lead-time risk drive schedule contingency needs."
      ],
      margin: 0.064877,
      capTurnover: 1.1,
      revenuePerEmployee: 210000,
      revenuePerCapacityUnit: 6000,
      energyIntensityKwhPerEmployee: 5000,
      energyIntensityKwhPerCapacity: 90,
      baseLandValuePerAcre: 150000,
      envScore: 6,
      competitionScore: 9,
      approvalMonths: [6, 12],
      process: [
        "Entity setup and contractor compliance",
        "Municipal zoning and land development",
        "UCC permits and inspections",
        "DEP approvals where disturbance/discharge applies",
        "Final occupancy and close-out"
      ],
      links: [
        ["PA Attorney General HIC", "https://www.attorneygeneral.gov/resources/home-improvement-contractor-registration/"],
        ["PA UCC / L&I", "https://www.pa.gov/agencies/dli/programs-services/labor-management-relations/bureau-of-occupational-and-industrial-safety/uniform-construction-code-home"],
        ["PA DEP", "https://www.pa.gov/agencies/dep/programs-and-services/business.html"],
        ["PA Business One-Stop", "https://business.pa.gov/"]
      ]
    }
  }
};

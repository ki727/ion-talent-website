/**
 * Opportunity data model for the ION Talent Opportunities page.
 *
 * All roles default to "Talent Network" status. ION Talent can promote any
 * individual role to "Live Opportunity" by changing its status field.
 * Salary ranges are labelled "Indicative market range" and represent current
 * market guidance for active and upcoming searches, not confirmed client
 * budgets or guaranteed offers.
 */

export type OpportunityStatus = "Talent Network" | "Live Opportunity" | "Paused"

export type OpportunityFunction =
  | "Finance"
  | "Cybersecurity"
  | "Cloud and Infrastructure"
  | "Data and AI"
  | "Enterprise Technology"
  | "Technology Sales"
  | "Project and Programme Management"
  | "Engineering and Operations"
  | "HR and People"
  | "Legal and Compliance"
  | "Supply Chain and Procurement"
  | "Transformation and Strategy"

export type EmploymentType = "Permanent" | "Contract" | "Executive Search"

export interface Opportunity {
  id: string
  slug: string
  title: string
  status: OpportunityStatus
  function: OpportunityFunction
  /** Single primary city where this role is based. */
  locationLabel: string
  employmentLabel: string
  employmentTypes: EmploymentType[]
  seniority: string
  /** Concise card summary. */
  description: string
  /** Indicative market salary range — market guidance only. */
  salaryRange: string
  /** Sector or discipline shown on card. */
  sector: string
  /** Detailed overview shown in the role panel. */
  overview: string
  /** Key responsibilities. */
  responsibilities: string[]
  /** Candidate requirements. */
  requirements: string[]
  /** Package notes. */
  packageNotes: string
}

export const FUNCTIONS: OpportunityFunction[] = [
  "Finance",
  "Cybersecurity",
  "Cloud and Infrastructure",
  "Data and AI",
  "Enterprise Technology",
  "Technology Sales",
  "Project and Programme Management",
  "Engineering and Operations",
  "HR and People",
  "Legal and Compliance",
  "Supply Chain and Procurement",
  "Transformation and Strategy",
]

export const EMPLOYMENT_TYPES: EmploymentType[] = [
  "Permanent",
  "Contract",
  "Executive Search",
]

export const SENIORITIES: string[] = [
  "Specialist",
  "Senior Specialist",
  "Senior",
  "Manager",
  "Senior Manager",
  "Director",
  "VP / Head of",
  "C-Suite / Executive",
]

export const opportunities: Opportunity[] = [
  // ── Finance ──────────────────────────────────────────────────────────────
  {
    id: "cfo-finance-director",
    slug: "cfo-finance-director",
    title: "CFO / Finance Director",
    status: "Talent Network",
    function: "Finance",
    sector: "Finance",
    locationLabel: "Abu Dhabi",
    employmentLabel: "Permanent · Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "C-Suite / Executive",
    salaryRange: "AED 500,000 – 900,000 per annum",
    description:
      "Senior finance leadership opportunities for CFOs and Finance Directors across high-growth and enterprise organisations in the GCC.",
    overview:
      "ION Talent is building a network of senior finance leaders for current and upcoming CFO and Finance Director mandates across the GCC. Target organisations include listed entities, PE-backed growth companies, sovereign-linked entities and international businesses expanding into the region. Roles span all industry sectors with a concentration in technology, energy, real estate and financial services.",
    responsibilities: [
      "Own the full finance function: reporting, planning, treasury, tax and compliance",
      "Partner with the CEO and board on strategic and commercial decisions",
      "Lead financial transformation, systems modernisation and ERP programmes",
      "Manage investor relations, capital markets and fundraising activity",
      "Build and develop high-performing finance teams across multiple geographies",
    ],
    requirements: [
      "ACA, ACCA, CPA or equivalent professional qualification",
      "Minimum 15 years progressive finance leadership experience",
      "Proven CFO or Finance Director tenure in a comparable organisation",
      "Strong GCC or MENA market exposure highly preferred",
      "Experience operating at board level with external stakeholders",
    ],
    packageNotes:
      "Packages are structured as total annual compensation including base, performance bonus, benefits and allowances. Equity and LTIP components apply for certain executive mandates.",
  },
  {
    id: "financial-controller",
    slug: "financial-controller",
    title: "Financial Controller",
    status: "Talent Network",
    function: "Finance",
    sector: "Finance",
    locationLabel: "London",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Director",
    salaryRange: "AED 280,000 – 480,000 per annum",
    description:
      "Financial control, consolidation and governance leadership roles across multinational and regional businesses in London.",
    overview:
      "ION Talent is building a network of experienced Financial Controllers for current and upcoming opportunities in London. Clients are undergoing growth, transformation and consolidation, and candidates with Big Four backgrounds and in-house controller experience in complex, multi-entity environments are particularly sought after.",
    responsibilities: [
      "Lead month-end close, group consolidation and statutory reporting",
      "Own internal controls, governance and audit relationships",
      "Manage IFRS compliance and external audit processes",
      "Drive finance process improvement and automation",
      "Partner with FP&A and commercial teams on business performance",
    ],
    requirements: [
      "ACA, ACCA, CPA or CMA qualified",
      "8+ years in financial control, preferably with Big Four grounding",
      "Strong IFRS knowledge and multi-entity consolidation experience",
      "ERP proficiency (SAP, Oracle or similar)",
      "GCC experience preferred; MENA market knowledge an advantage",
    ],
    packageNotes:
      "Packages include base salary, annual bonus, housing allowance and medical cover. Total compensation benchmarked against current London market rates.",
  },
  {
    id: "fpa-manager-director",
    slug: "fpa-manager-director",
    title: "FP&A Manager / Director",
    status: "Talent Network",
    function: "Finance",
    sector: "Finance",
    locationLabel: "London",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Director",
    salaryRange: "AED 240,000 – 420,000 per annum",
    description:
      "Commercial finance, planning and senior business partnering roles with high-growth regional and international organisations.",
    overview:
      "ION Talent is active across FP&A and commercial finance mandates for technology companies, real estate businesses and diversified regional conglomerates. Candidates who combine strong financial modelling skills with a commercial mindset and proven executive partnership experience are consistently in demand.",
    responsibilities: [
      "Lead annual planning, rolling forecasts and budget cycles",
      "Build board-quality financial models and scenario analyses",
      "Deliver commercial insights to senior leadership and business units",
      "Manage and develop a team of analysts and business partners",
      "Drive continuous improvement in reporting tools and processes",
    ],
    requirements: [
      "CFA, ACA, ACCA, CPA or CIMA qualified",
      "6+ years in FP&A, commercial finance or business partnering",
      "Advanced financial modelling and Excel or BI tool proficiency",
      "Experience presenting analysis at ExCo or board level",
      "Technology sector or high-growth environment experience preferred",
    ],
    packageNotes:
      "Competitive base, target bonus 15–25%, full expatriate package for international candidates.",
  },
  {
    id: "tax-audit-compliance",
    slug: "tax-audit-compliance",
    title: "Tax, Audit and Financial Compliance",
    status: "Talent Network",
    function: "Finance",
    sector: "Finance",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Senior Manager",
    salaryRange: "AED 200,000 – 360,000 per annum",
    description:
      "VAT, corporate tax, internal audit and financial risk and compliance roles across the GCC as regulatory complexity increases.",
    overview:
      "The introduction of corporate tax in the UAE and evolving tax regimes across Saudi Arabia and Qatar are generating sustained demand for tax, audit and compliance professionals. ION Talent places specialists in in-house roles and advisory-facing positions across financial services, technology and energy clients.",
    responsibilities: [
      "Manage KSA corporate tax compliance, filings and planning",
      "Lead or support internal audit programmes and control frameworks",
      "Own regulatory reporting, VAT and indirect tax obligations",
      "Engage external auditors and tax advisers",
      "Advise on transfer pricing, cross-border structuring and compliance risk",
    ],
    requirements: [
      "CTA, ADIT, ACA or equivalent tax or audit qualification",
      "5+ years in tax, audit or financial compliance in the GCC",
      "Strong knowledge of KSA ZATCA, VAT and corporate tax regulations",
      "Big Four or major advisory firm background preferred",
    ],
    packageNotes:
      "Market-rate packages with full statutory benefits. Roles span Big Four, boutique advisory and in-house positions.",
  },

  // ── Cybersecurity ────────────────────────────────────────────────────────
  {
    id: "head-cybersecurity-ciso",
    slug: "head-cybersecurity-ciso",
    title: "Head of Cybersecurity / CISO",
    status: "Talent Network",
    function: "Cybersecurity",
    sector: "Cybersecurity",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent · Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "VP / Head of",
    salaryRange: "AED 420,000 – 750,000 per annum",
    description:
      "CISO and Head of Cybersecurity leadership roles for organisations investing in security transformation, resilience and governance across the GCC.",
    overview:
      "Demand for senior cybersecurity leadership continues to outpace supply across the GCC. ION Talent is building a network of proven CISOs and Heads of Cybersecurity for financial services, government-linked entities, telcos, data centres and technology businesses at various stages of their security maturity journey.",
    responsibilities: [
      "Define and own the enterprise cybersecurity strategy and roadmap",
      "Build, lead and mentor a high-performing security function",
      "Manage security operations, threat intelligence and incident response",
      "Oversee GRC, regulatory compliance and risk reporting to the board",
      "Drive security architecture across cloud, on-premises and OT environments",
    ],
    requirements: [
      "CISSP, CISM or equivalent senior security qualification",
      "12+ years in cybersecurity, with at least 4 in a senior leadership role",
      "Demonstrated board-level engagement and stakeholder management",
      "Broad technical depth across SOC, architecture, GRC and IAM",
      "Experience in regulated industries or critical national infrastructure preferred",
    ],
    packageNotes:
      "Executive packages include substantial base, performance bonus, housing, schooling and medical. Equity upside available for technology company mandates.",
  },
  {
    id: "cybersecurity-architect",
    slug: "cybersecurity-architect",
    title: "Cybersecurity Architect",
    status: "Talent Network",
    function: "Cybersecurity",
    sector: "Cybersecurity",
    locationLabel: "Amsterdam",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior Specialist",
    salaryRange: "AED 280,000 – 480,000 per annum",
    description:
      "Enterprise and cloud security architecture roles for specialists who can design and implement robust security frameworks at scale.",
    overview:
      "ION Talent is building a network of experienced cybersecurity architects for current and upcoming opportunities in Amsterdam, supporting clients undergoing cloud migration, data centre builds and digital transformation programmes. Both permanent and contract opportunities exist for professionals with deep architecture skills and vendor-neutral design experience.",
    responsibilities: [
      "Design and own security architecture for enterprise and cloud environments",
      "Develop security standards, patterns and reference architectures",
      "Evaluate security tools and technologies against business requirements",
      "Engage with delivery teams to embed security by design",
      "Support third-party risk assessments and vendor security reviews",
    ],
    requirements: [
      "CISSP, SABSA, TOGAF or equivalent architecture certification",
      "8+ years in security roles, minimum 4 in an architecture capacity",
      "Deep expertise across cloud security (AWS, Azure or GCP)",
      "Strong understanding of zero-trust, SASE and micro-segmentation",
      "Experience in large-scale enterprise or public sector programmes preferred",
    ],
    packageNotes:
      "Permanent and fixed-term contract options. Contract rates typically USD 120–180 per day equivalent.",
  },
  {
    id: "grc-information-security-manager",
    slug: "grc-information-security-manager",
    title: "GRC and Information Security Manager",
    status: "Talent Network",
    function: "Cybersecurity",
    sector: "Cybersecurity",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Manager",
    salaryRange: "AED 200,000 – 320,000 per annum",
    description:
      "Governance, risk and compliance professionals to build and manage information security programmes across regulated industries.",
    overview:
      "Regulatory pressure from NCA Saudi and other regional frameworks is creating consistent demand for GRC and information security management professionals. ION Talent is building a network of GRC Managers and Analysts for current and upcoming opportunities in Riyadh, across financial services, government and technology clients.",
    responsibilities: [
      "Own the information security risk register and control framework",
      "Lead ISO 27001, NIST CSF and regulatory compliance programmes",
      "Conduct risk assessments, gap analyses and maturity reviews",
      "Manage security awareness training and phishing simulation",
      "Prepare board and regulatory risk reporting",
    ],
    requirements: [
      "CISM, CRISC, ISO 27001 Lead Auditor or equivalent",
      "5+ years in information security GRC",
      "Practical knowledge of UAE and KSA regulatory frameworks",
      "Strong written communication and executive reporting skills",
    ],
    packageNotes:
      "Competitive package including performance bonus and full medical cover.",
  },

  // ── Cloud and Infrastructure ──────────────────────────────────────────────
  {
    id: "cloud-solutions-architect",
    slug: "cloud-solutions-architect",
    title: "Cloud and Solutions Architect",
    status: "Talent Network",
    function: "Cloud and Infrastructure",
    sector: "Cloud and Infrastructure",
    locationLabel: "Dubai",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior Specialist",
    salaryRange: "AED 300,000 – 520,000 per annum",
    description:
      "Cloud architecture and infrastructure transformation roles across hyperscaler, hybrid and sovereign cloud environments in the GCC.",
    overview:
      "The GCC is experiencing a significant wave of hyperscaler investment, sovereign cloud build-out and enterprise cloud migration. ION Talent places Cloud and Solutions Architects with clients across financial services, government, energy and technology sectors, covering AWS, Azure and GCP workloads.",
    responsibilities: [
      "Lead cloud architecture design and migration strategy",
      "Produce landing zone designs, solution architectures and technical roadmaps",
      "Evaluate and select cloud technologies, platforms and vendors",
      "Guide application teams on cloud-native patterns and best practices",
      "Own architecture governance and technical risk management",
    ],
    requirements: [
      "AWS Solutions Architect Professional, Azure Expert or GCP Professional equivalent",
      "8+ years in infrastructure or cloud architecture roles",
      "Multi-cloud and hybrid cloud design experience",
      "Strong skills in IaC (Terraform, Pulumi or CDK)",
      "Experience with data centre migration or cloud transformation programmes",
    ],
    packageNotes:
      "Packages reflect current cloud architecture supply shortage in the GCC. Contract options available for 6–12 month engagements.",
  },
  {
    id: "data-centre-infrastructure-director",
    slug: "data-centre-infrastructure-director",
    title: "Data Centre Infrastructure Director",
    status: "Talent Network",
    function: "Cloud and Infrastructure",
    sector: "Cloud and Infrastructure",
    locationLabel: "Abu Dhabi",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Director",
    salaryRange: "AED 380,000 – 620,000 per annum",
    description:
      "Senior infrastructure and data centre leadership roles as the GCC invests billions in hyperscale, colocation and sovereign data centre capacity.",
    overview:
      "ION Talent is working with hyperscale operators, national data centre programmes and major colocation providers to source experienced infrastructure and data centre leaders. Demand is concentrated in the UAE, with sovereign and hyperscale investment extending across the broader GCC.",
    responsibilities: [
      "Lead end-to-end delivery of large-scale data centre construction or expansion",
      "Manage critical facilities including power, cooling and physical security",
      "Own vendor, contractor and technical partner relationships",
      "Develop and manage capex budgets and operating cost models",
      "Lead and develop infrastructure operations and engineering teams",
    ],
    requirements: [
      "10+ years in data centre infrastructure, critical facilities or hyperscale delivery",
      "Proven programme leadership for Tier III or Tier IV data centre projects",
      "Deep knowledge of power (UPS, generator, HV), cooling and fire suppression",
      "PMP, CDCP or equivalent certification preferred",
      "International or hyperscale operator experience strongly preferred",
    ],
    packageNotes:
      "Senior packages reflect the scarcity of proven data centre delivery talent in the GCC.",
  },

  // ── Data and AI ───────────────────────────────────────────────────────────
  {
    id: "data-engineering-analytics-ai",
    slug: "data-engineering-analytics-ai",
    title: "Data Engineering and Analytics Lead",
    status: "Talent Network",
    function: "Data and AI",
    sector: "Data and AI",
    locationLabel: "Dubai",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior Manager",
    salaryRange: "AED 320,000 – 540,000 per annum",
    description:
      "Data engineering and analytics leadership roles at the intersection of modern data platforms, BI and AI readiness.",
    overview:
      "ION Talent is placing Data Engineering and Analytics Leads for clients building modern data platforms, lakehouse architectures and AI-ready data infrastructure across the GCC. Roles span technology, financial services, energy and government sectors.",
    responsibilities: [
      "Lead data engineering team across ingestion, transformation and serving layers",
      "Architect lakehouse or warehouse solutions on Databricks, Snowflake or BigQuery",
      "Own data quality, governance and data catalogue standards",
      "Partner with data science and AI teams on feature engineering pipelines",
      "Drive adoption of analytics and self-service BI across the business",
    ],
    requirements: [
      "8+ years in data engineering or analytics, minimum 3 in a lead or manager role",
      "Strong Python, Spark and SQL skills",
      "Hands-on platform experience with Databricks, Snowflake or BigQuery",
      "Experience with dbt, Airflow or equivalent orchestration",
      "Knowledge of data mesh, DataOps and data governance best practices",
    ],
    packageNotes:
      "Packages reflect strong market demand, with strong interest from international candidates.",
  },
  {
    id: "ai-ml-engineering-lead",
    slug: "ai-ml-engineering-lead",
    title: "AI and Machine Learning Engineering Lead",
    status: "Talent Network",
    function: "Data and AI",
    sector: "Data and AI",
    locationLabel: "London",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Senior Manager",
    salaryRange: "AED 380,000 – 640,000 per annum",
    description:
      "AI and machine learning engineering leadership roles for specialists building production ML systems and LLM-powered applications.",
    overview:
      "ION Talent is building a network of AI and ML engineering leaders for clients deploying production machine learning systems, generative AI products and decision intelligence platforms. Demand is high across financial services, technology platforms, government AI initiatives and energy analytics.",
    responsibilities: [
      "Lead teams designing, training and deploying production ML and LLM systems",
      "Own MLOps infrastructure, model lifecycle management and observability",
      "Define AI engineering standards, reusable components and evaluation frameworks",
      "Collaborate with product, data and business teams on AI use cases",
      "Contribute to responsible AI governance and risk frameworks",
    ],
    requirements: [
      "7+ years in machine learning or AI engineering, minimum 2 in a leadership role",
      "Strong Python, PyTorch or TensorFlow skills",
      "Experience deploying models at scale on cloud infrastructure",
      "Familiarity with LLM fine-tuning, RAG pipelines and prompt engineering",
      "MSc or PhD in Computer Science, Statistics or related field preferred",
    ],
    packageNotes:
      "Highly competitive packages reflecting AI engineering talent scarcity. Equity available for growth-stage technology company mandates.",
  },

  // ── Enterprise Technology ─────────────────────────────────────────────────
  {
    id: "sap-programme-director",
    slug: "sap-programme-director",
    title: "SAP Programme Director",
    status: "Talent Network",
    function: "Enterprise Technology",
    sector: "Enterprise Technology / ERP",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Director",
    salaryRange: "AED 420,000 – 680,000 per annum",
    description:
      "SAP S/4HANA transformation and programme leadership roles for large-scale enterprise implementations across government and energy clients.",
    overview:
      "Saudi Arabia's Vision 2030 transformation agenda is driving a significant pipeline of SAP S/4HANA and enterprise technology programmes. ION Talent is placing SAP Programme Directors and Delivery Leads for national entities, energy companies and sovereign wealth fund portfolio businesses.",
    responsibilities: [
      "Lead end-to-end SAP S/4HANA or Oracle ERP transformation programmes",
      "Manage SI relationships, programme governance and executive reporting",
      "Own scope, budget, schedule and risk across complex multi-workstream programmes",
      "Drive business change management and user adoption",
      "Build and lead high-performing programme delivery teams",
    ],
    requirements: [
      "15+ years in enterprise technology, minimum 5 delivering SAP or Oracle programmes",
      "Proven track record leading programmes exceeding AED 50M in value",
      "PMP, Prince2 or SAP Activate certified",
      "GCC market experience strongly preferred",
      "Arabic language skills an advantage for Saudi Arabia mandates",
    ],
    packageNotes:
      "Packages reflect high programme complexity and KSA market premiums. Contract day rates available for interim mandates.",
  },
  {
    id: "oracle-erp-lead",
    slug: "oracle-erp-lead",
    title: "Oracle ERP and Cloud Lead",
    status: "Talent Network",
    function: "Enterprise Technology",
    sector: "Enterprise Technology / ERP",
    locationLabel: "Dubai",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior Specialist",
    salaryRange: "AED 320,000 – 520,000 per annum",
    description:
      "Oracle Fusion, EBS and Cloud implementation and architecture roles for regional and multinational enterprise clients.",
    overview:
      "ION Talent places Oracle ERP specialists — from solution architects and functional leads to programme managers — across clients running transformations on Oracle Fusion Cloud, EBS and Oracle SCM. Demand is consistent across financial services, manufacturing, real estate and government sectors.",
    responsibilities: [
      "Lead Oracle Fusion or EBS implementation workstreams",
      "Configure and extend Oracle modules including Finance, SCM and HCM",
      "Own solution design, blueprint, data migration and cutover",
      "Manage client relationships and functional team delivery",
    ],
    requirements: [
      "8+ years in Oracle ERP implementation or architecture",
      "Hands-on experience with Oracle Fusion Cloud preferred",
      "Oracle Cloud certification in at least one functional module",
      "GCC project experience advantageous",
    ],
    packageNotes:
      "Permanent and contract options. Strong contract market for Oracle resources on active implementations.",
  },

  // ── Technology Sales ───────────────────────────────────────────────────────
  {
    id: "enterprise-saas-sales-director",
    slug: "enterprise-saas-sales-director",
    title: "Enterprise SaaS Sales Director",
    status: "Talent Network",
    function: "Technology Sales",
    sector: "Technology Sales",
    locationLabel: "Dubai",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Director",
    salaryRange: "AED 350,000 – 600,000 OTE per annum",
    description:
      "Enterprise software sales leadership roles for high-growth SaaS vendors scaling commercial operations across the GCC.",
    overview:
      "ION Talent works with a growing number of enterprise SaaS, cloud and cybersecurity vendors building out their GCC sales organisations. We place Sales Directors and VP Sales candidates who can operate at the C-suite level, manage complex multi-stakeholder deals and build regional teams from the ground up.",
    responsibilities: [
      "Own regional new business revenue targets for enterprise software or cloud products",
      "Develop and execute territory and account strategies for the UAE market",
      "Manage full enterprise sales cycles from prospecting to close",
      "Build and lead a high-performing regional sales team",
      "Represent the company at CxO level and at regional industry events",
    ],
    requirements: [
      "8+ years in enterprise software sales, minimum 3 at Director or VP level",
      "Consistent track record of achieving or exceeding annual revenue targets",
      "Experience selling complex SaaS, cloud infrastructure or cybersecurity solutions",
      "Existing GCC executive network across target verticals",
      "Arabic language skills highly advantageous",
    ],
    packageNotes:
      "Base plus uncapped commission OTE. Equity or warrants available for VP-level roles with early-stage vendors.",
  },
  {
    id: "presales-solutions-consultant",
    slug: "presales-solutions-consultant",
    title: "Pre-Sales Solutions Consultant",
    status: "Talent Network",
    function: "Technology Sales",
    sector: "Technology Sales",
    locationLabel: "London",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Senior Specialist",
    salaryRange: "AED 240,000 – 420,000 OTE per annum",
    description:
      "Pre-sales and solutions consulting roles bridging technical capability and commercial value for enterprise technology vendors.",
    overview:
      "Enterprise technology vendors across cloud, cybersecurity, data and SaaS are competing hard for experienced pre-sales talent. ION Talent is building a network of Pre-Sales Consultants and Solutions Architects for current and upcoming opportunities in London, combining deep technical knowledge with strong commercial awareness and executive communication skills.",
    responsibilities: [
      "Lead technical discovery, demonstrations and proof-of-concept engagements",
      "Produce proposals, RFP responses and technical architecture documents",
      "Act as the technical bridge between sales and delivery teams",
      "Build reusable demo assets and solution accelerators",
      "Provide feedback to product teams on regional market requirements",
    ],
    requirements: [
      "5+ years in pre-sales, solutions consulting or technical sales support",
      "Expertise in at least one of: cloud, cybersecurity, data or enterprise SaaS",
      "Excellent written and verbal communication skills at executive level",
      "Relevant vendor or platform certifications preferred",
    ],
    packageNotes: "Competitive base plus sales bonus. Full expatriate package for international candidates.",
  },

  // ── Project and Programme Management ──────────────────────────────────────
  {
    id: "technology-programme-director",
    slug: "technology-programme-director",
    title: "Technology Programme Director",
    status: "Talent Network",
    function: "Project and Programme Management",
    sector: "Programme Delivery",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Director",
    salaryRange: "AED 420,000 – 700,000 per annum",
    description:
      "Digital transformation and technology programme leadership for large-scale GCC delivery programmes spanning enterprise technology, cloud and operational change.",
    overview:
      "ION Talent places Technology Programme Directors across the GCC for national transformation initiatives, large IT delivery portfolios and complex multi-vendor programmes. Clients include government entities, sovereign wealth funds, utilities, banks and multinational organisations.",
    responsibilities: [
      "Lead delivery of complex multi-workstream technology transformation programmes",
      "Own programme governance, reporting, risk and issue management",
      "Manage vendor, SI and partner relationships at a senior level",
      "Drive organisational change management and stakeholder engagement",
      "Report directly to CIO, CEO or executive programme boards",
    ],
    requirements: [
      "15+ years in technology delivery, minimum 5 as a Programme Director",
      "Proven track record of delivering programmes over AED 100M in total value",
      "PMP, MSP or Prince2 Practitioner certification",
      "Strong GCC or MENA delivery experience preferred",
    ],
    packageNotes:
      "Senior packages reflect programme complexity and GCC demand. Long-term contract options available.",
  },
  {
    id: "pmo-lead",
    slug: "pmo-lead",
    title: "PMO Lead / Head of PMO",
    status: "Talent Network",
    function: "Project and Programme Management",
    sector: "Programme Delivery",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Senior Manager",
    salaryRange: "AED 280,000 – 460,000 per annum",
    description:
      "PMO establishment and leadership roles for organisations building or maturing their project and portfolio management capabilities.",
    overview:
      "ION Talent is placing PMO Leads and Heads of PMO across technology, government and financial services clients in the GCC. Candidates who can establish PMO functions from scratch, implement PPM tooling and drive delivery governance are particularly sought after.",
    responsibilities: [
      "Establish and lead the enterprise or divisional PMO function",
      "Define project methodologies, standards, templates and governance frameworks",
      "Implement and manage PPM tools (ServiceNow, Planview, Jira or equivalent)",
      "Produce portfolio dashboards, resource reporting and executive status updates",
      "Coach project managers and build internal delivery capability",
    ],
    requirements: [
      "8+ years in programme management or PMO leadership",
      "PMP, Prince2 or CAPM certified",
      "Experience establishing or maturing a PMO in a comparable organisation",
      "Strong stakeholder management and executive communication skills",
    ],
    packageNotes: "Market-rate permanent packages with full GCC benefits.",
  },

  // ── Engineering and Operations ─────────────────────────────────────────────
  {
    id: "oil-gas-operations-director",
    slug: "oil-gas-operations-director",
    title: "Oil and Gas Operations Director",
    status: "Talent Network",
    function: "Engineering and Operations",
    sector: "Energy and Oil and Gas",
    locationLabel: "Dammam",
    employmentLabel: "Permanent · Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "C-Suite / Executive",
    salaryRange: "USD 200,000 – 350,000 per annum",
    description:
      "Senior operations and engineering leadership for upstream, midstream and downstream oil and gas clients across the Arabian Peninsula.",
    overview:
      "ION Talent partners with NOCs, IOCs and oilfield services companies across Saudi Arabia to place experienced operations and engineering directors. Candidates with Arabian Gulf, deepwater or large-scale refinery experience are consistently in demand.",
    responsibilities: [
      "Oversee upstream, midstream or downstream operations and production targets",
      "Lead HSE performance, operational integrity and asset management",
      "Drive capital project execution and operational efficiency programmes",
      "Manage large multi-discipline engineering and operations teams",
      "Engage with government bodies, joint venture partners and regulators",
    ],
    requirements: [
      "Engineering degree (Petroleum, Chemical, Mechanical or equivalent)",
      "20+ years in oil and gas operations, minimum 5 at Director level",
      "Proven track record in a senior operations role with an NOC or major IOC",
      "GCC or MENA operational experience strongly preferred",
    ],
    packageNotes:
      "Executive compensation including base, bonus, housing, schooling, flights and medical. USD packages for senior international mandates.",
  },
  {
    id: "engineering-project-manager",
    slug: "engineering-project-manager",
    title: "Engineering Project Manager",
    status: "Talent Network",
    function: "Engineering and Operations",
    sector: "Engineering and Infrastructure",
    locationLabel: "Abu Dhabi",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior Manager",
    salaryRange: "AED 280,000 – 480,000 per annum",
    description:
      "Engineering project management roles across energy, infrastructure and industrial sectors in the UAE.",
    overview:
      "ION Talent places experienced Engineering Project Managers for clients delivering capital infrastructure, utilities, energy and industrial projects across the GCC. Demand is strong for candidates with EPCM experience and familiarity with GCC project delivery environments.",
    responsibilities: [
      "Manage engineering projects from feasibility through to commissioning",
      "Own project scope, cost, schedule, risk and quality",
      "Manage engineering contractors, vendors and site teams",
      "Produce project reporting for clients and senior stakeholders",
      "Ensure HSE compliance and site safety standards",
    ],
    requirements: [
      "Engineering degree plus PMP or Prince2 certification",
      "8+ years engineering project management experience",
      "EPCM or EPC background preferred",
      "GCC site and project delivery experience an advantage",
    ],
    packageNotes: "Packages include site allowances and project-completion incentives.",
  },

  // ── Supply Chain and Procurement ──────────────────────────────────────────
  {
    id: "supply-chain-director",
    slug: "supply-chain-director",
    title: "Supply Chain Director",
    status: "Talent Network",
    function: "Supply Chain and Procurement",
    sector: "Supply Chain and Logistics",
    locationLabel: "Dammam",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Director",
    salaryRange: "AED 380,000 – 620,000 per annum",
    description:
      "Senior supply chain and logistics leadership roles for retail, FMCG, industrial and healthcare clients across the GCC.",
    overview:
      "ION Talent places Supply Chain Directors for clients optimising regional supply chains, implementing digital supply chain platforms and building resilience across distribution, procurement and inventory management functions.",
    responsibilities: [
      "Lead end-to-end supply chain strategy across procurement, logistics and distribution",
      "Own inventory optimisation, demand planning and S&OP processes",
      "Drive supply chain digitalisation and technology adoption",
      "Manage supplier relationships and strategic sourcing",
      "Build and develop supply chain teams across multiple markets",
    ],
    requirements: [
      "CIPS, APICS CSCP or equivalent supply chain qualification",
      "12+ years in supply chain leadership",
      "Proven regional supply chain transformation experience",
      "ERP and supply chain platform experience (SAP SCM, Oracle SCM or equivalent)",
      "GCC market knowledge preferred",
    ],
    packageNotes: "Competitive packages benchmarked to GCC supply chain market rates.",
  },

  // ── HR and People ──────────────────────────────────────────────────────────
  {
    id: "chro-hr-director",
    slug: "chro-hr-director",
    title: "CHRO / HR Director",
    status: "Talent Network",
    function: "HR and People",
    sector: "HR and People",
    locationLabel: "Dubai",
    employmentLabel: "Permanent · Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "C-Suite / Executive",
    salaryRange: "AED 480,000 – 780,000 per annum",
    description:
      "Chief People Officer and HR Director roles for technology-led and high-growth organisations building modern people functions.",
    overview:
      "ION Talent places CHROs and HR Directors for technology companies, PE-backed businesses and diversified regional groups investing in people, culture and talent capability. Candidates with experience in talent acquisition transformation, organisational design and HR technology adoption are in particularly high demand.",
    responsibilities: [
      "Define and deliver the people strategy aligned to business growth",
      "Lead talent acquisition, L&D, total rewards and people operations",
      "Drive HR digitalisation and HRIS modernisation",
      "Own culture, engagement and organisational design",
      "Partner at board and ExCo level on workforce planning",
    ],
    requirements: [
      "CIPD Level 7, SHRM-SCP or equivalent HR qualification",
      "15+ years in HR leadership, minimum 5 at Director or CHRO level",
      "Technology company or high-growth environment experience preferred",
      "Experience leading HR transformation and HRIS implementation",
    ],
    packageNotes: "Executive packages. Equity available for technology sector CHRO mandates.",
  },

  // ── Legal and Compliance ───────────────────────────────────────────────────
  {
    id: "general-counsel",
    slug: "general-counsel",
    title: "General Counsel / Head of Legal",
    status: "Talent Network",
    function: "Legal and Compliance",
    sector: "Legal and Compliance",
    locationLabel: "Dubai",
    employmentLabel: "Permanent · Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "C-Suite / Executive",
    salaryRange: "AED 500,000 – 850,000 per annum",
    description:
      "General Counsel and Head of Legal roles for regional businesses requiring senior in-house legal leadership with strong commercial focus.",
    overview:
      "ION Talent places General Counsel and Senior Legal Counsel for clients across financial services, technology, energy and real estate in the GCC. Candidates with dual GCC and international legal qualification and strong M&A, regulatory or commercial contracts experience are consistently sought.",
    responsibilities: [
      "Provide legal advice across commercial, corporate and regulatory matters",
      "Lead M&A, JV, financing and major contract negotiations",
      "Build and manage in-house legal teams",
      "Liaise with external counsel and regulatory bodies",
      "Advise the board on governance, compliance and legal risk",
    ],
    requirements: [
      "Qualified solicitor, barrister or equivalent in relevant jurisdiction",
      "12+ years post-qualification experience including in-house exposure",
      "Strong M&A, corporate or commercial contracts background",
      "GCC legal experience or UAE/KSA regulatory knowledge preferred",
    ],
    packageNotes: "Executive packages. Total compensation reflects current GCC legal market premiums.",
  },

  // ── Transformation and Strategy ───────────────────────────────────────────
  {
    id: "chief-digital-officer",
    slug: "chief-digital-officer",
    title: "Chief Digital Officer / Head of Digital",
    status: "Talent Network",
    function: "Transformation and Strategy",
    sector: "Digital Transformation",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent · Executive Search",
    employmentTypes: ["Permanent", "Executive Search"],
    seniority: "C-Suite / Executive",
    salaryRange: "AED 600,000 – 1,000,000 per annum",
    description:
      "CDO and Head of Digital roles for organisations accelerating digital transformation, platform modernisation and AI adoption.",
    overview:
      "ION Talent is sourcing Chief Digital Officers and senior digital leaders for clients in financial services, government, healthcare and retail who are investing heavily in digital transformation, customer experience and AI-enabled services across the GCC.",
    responsibilities: [
      "Define and own the digital transformation strategy and roadmap",
      "Lead digital product development, platform modernisation and CX initiatives",
      "Identify and scale AI and automation opportunities across the enterprise",
      "Build and lead cross-functional digital and innovation teams",
      "Partner with technology, marketing and operations to deliver business impact",
    ],
    requirements: [
      "15+ years across technology, digital product and transformation",
      "Proven track record leading enterprise-scale digital transformation",
      "Strong executive presence and board-level communication",
      "P&L accountability for digital business units preferred",
      "GCC or emerging market experience highly valued",
    ],
    packageNotes:
      "Executive packages with significant performance upside. Equity or co-investment available for senior digital mandates.",
  },
  {
    id: "transformation-programme-lead",
    slug: "transformation-programme-lead",
    title: "Business Transformation Programme Lead",
    status: "Talent Network",
    function: "Transformation and Strategy",
    sector: "Transformation and Change",
    locationLabel: "Riyadh",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Director",
    salaryRange: "AED 380,000 – 620,000 per annum",
    description:
      "Business transformation and operating model change leadership for organisations undergoing restructuring, growth or technology-driven change.",
    overview:
      "ION Talent places Business Transformation leaders for clients undertaking operating model redesign, post-merger integration, finance transformation and digitally-led organisational change. Strategy consulting alumni with in-house transformation experience are consistently in demand.",
    responsibilities: [
      "Lead complex business transformation programmes across functions and geographies",
      "Define target operating models and transformation roadmaps",
      "Drive change management, stakeholder engagement and communication",
      "Manage programme delivery governance, risk and executive reporting",
      "Build transformation office capability and coach internal change leads",
    ],
    requirements: [
      "12+ years in transformation, strategy consulting or large-scale change delivery",
      "Big Four, MBB or Tier 1 strategy consulting background preferred",
      "Strong operating model design and change management capability",
      "MBA or equivalent advanced degree preferred",
    ],
    packageNotes: "Senior packages. Day-rate contract options for defined transformation engagements.",
  },

  // ── Additional specialist roles ────────────────────────────────────────────
  {
    id: "head-of-talent-acquisition",
    slug: "head-of-talent-acquisition",
    title: "Head of Talent Acquisition",
    status: "Talent Network",
    function: "HR and People",
    sector: "HR and People",
    locationLabel: "Dubai",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "VP / Head of",
    salaryRange: "AED 320,000 – 520,000 per annum",
    description:
      "Talent acquisition leadership roles for fast-growing technology and regional businesses building best-in-class hiring capability.",
    overview:
      "ION Talent places Heads of Talent Acquisition for clients undergoing rapid headcount growth, RPO transformation and hiring infrastructure build. Technology companies, PE-backed businesses and regional conglomerates are active across this market.",
    responsibilities: [
      "Own end-to-end talent acquisition strategy and delivery",
      "Build and manage in-house TA teams across technology and business functions",
      "Implement ATS, employer branding and candidate experience programmes",
      "Partner with HRBPs and business leaders on workforce planning",
      "Lead Emiratisation, Saudisation and localisation hiring programmes",
    ],
    requirements: [
      "8+ years in talent acquisition, minimum 3 leading a TA function",
      "Experience building high-volume and specialist hiring programmes",
      "Strong knowledge of GCC labour markets and localisation requirements",
      "ATS implementation and TA technology experience",
    ],
    packageNotes: "Packages reflect current UAE market demand.",
  },
  {
    id: "treasury-corporate-finance",
    slug: "treasury-corporate-finance",
    title: "Treasury and Corporate Finance",
    status: "Talent Network",
    function: "Finance",
    sector: "Finance",
    locationLabel: "Dubai",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "Senior Manager",
    salaryRange: "AED 240,000 – 400,000 per annum",
    description:
      "Treasury, funding and corporate finance roles for banks, corporates and sovereign entities across the UAE.",
    overview:
      "ION Talent places treasury and corporate finance professionals across UAE-based banks, sovereign entities and large corporates. Demand is strongest for candidates with liquidity management, capital markets and FX risk experience.",
    responsibilities: [
      "Manage liquidity, funding and cash management operations",
      "Execute FX hedging, interest rate and commodity risk strategies",
      "Support debt capital markets activity and investor relations",
      "Oversee bank relationship management and credit facility management",
    ],
    requirements: [
      "CFA, ACA or ACT (AMCT) qualification preferred",
      "6+ years in treasury or corporate finance",
      "Bloomberg, Murex or Treasury Management System experience",
      "GCC banking or corporate treasury experience an advantage",
    ],
    packageNotes: "Competitive packages. Financial services premium applies for banking-sector roles.",
  },
  {
    id: "devops-platform-engineer",
    slug: "devops-platform-engineer",
    title: "DevOps and Platform Engineer",
    status: "Talent Network",
    function: "Cloud and Infrastructure",
    sector: "Cloud and Infrastructure",
    locationLabel: "London",
    employmentLabel: "Permanent · Contract",
    employmentTypes: ["Permanent", "Contract"],
    seniority: "Senior Specialist",
    salaryRange: "AED 240,000 – 420,000 per annum",
    description:
      "DevOps and platform engineering roles for technology companies and enterprises building cloud-native delivery capability.",
    overview:
      "ION Talent places experienced DevOps and Platform Engineers for clients modernising their software delivery pipeline, implementing GitOps practices and building internal developer platforms.",
    responsibilities: [
      "Design and maintain CI/CD pipelines, IaC and cloud infrastructure",
      "Build and operate Kubernetes-based platform services",
      "Implement security and compliance controls in delivery pipelines",
      "Drive developer experience improvements and inner-loop optimisation",
    ],
    requirements: [
      "5+ years in DevOps, platform or site reliability engineering",
      "Strong Kubernetes, Terraform, Helm and GitOps toolchain experience",
      "Experience with GitHub Actions, GitLab CI or equivalent",
      "Cloud certifications (AWS, Azure or GCP) preferred",
    ],
    packageNotes: "Permanent and contract options, with strong interest from international candidates.",
  },
  {
    id: "head-of-risk-compliance",
    slug: "head-of-risk-compliance",
    title: "Head of Risk and Compliance",
    status: "Talent Network",
    function: "Legal and Compliance",
    sector: "Risk and Compliance",
    locationLabel: "Abu Dhabi",
    employmentLabel: "Permanent",
    employmentTypes: ["Permanent"],
    seniority: "VP / Head of",
    salaryRange: "AED 380,000 – 620,000 per annum",
    description:
      "Enterprise risk and compliance leadership roles for financial services, technology and regulated industry clients in the GCC.",
    overview:
      "ION Talent places Heads of Risk and Compliance for financial services, fintech, insurance and technology clients across the GCC. Candidates with DFSA, ADGM, SAMA or NCA regulatory framework experience are in strongest demand.",
    responsibilities: [
      "Own the enterprise risk management framework and compliance programme",
      "Manage regulatory relationships and filings across relevant jurisdictions",
      "Lead AML, KYC and financial crime compliance functions",
      "Produce board and audit committee risk reporting",
      "Build and develop risk and compliance teams",
    ],
    requirements: [
      "ICA, ACAMS or equivalent risk or compliance qualification",
      "10+ years in risk or compliance, minimum 3 in a leadership role",
      "GCC regulatory framework knowledge (DFSA, ADGM, SAMA, NCA)",
      "Financial services or fintech sector experience preferred",
    ],
    packageNotes:
      "Packages reflect regulatory expertise premium in the GCC financial services market.",
  },
]

/** Every distinct primary city currently in use, derived from the data itself. */
export const LOCATIONS: string[] = Array.from(new Set(opportunities.map((o) => o.locationLabel))).sort()

/*
 * roleType / shareable — deliberately derived from the existing `status`
 * field rather than stored as separate data. `status` already encodes the
 * exact same distinction ("Live Opportunity" is the one and only trigger
 * ION Talent uses to promote a role out of the network pipeline), so a
 * second field would just be one more place for the two to drift out of
 * sync. Every helper a page needs — the badge label, the CTA label, and
 * whether sharing/JobPosting markup is allowed — goes through here so the
 * logic lives in one place instead of being repeated at each call site.
 *
 * Safety default: unless a role's status is explicitly "Live Opportunity",
 * it is treated as a network/pipeline role and is never shareable.
 */

/** True only for a role ION Talent has explicitly promoted to a confirmed, live vacancy. */
export function isLiveVacancy(opportunity: Opportunity): boolean {
  return opportunity.status === "Live Opportunity"
}

/** Only genuine live vacancies may be shared publicly or receive JobPosting structured data. */
export function isShareable(opportunity: Opportunity): boolean {
  return isLiveVacancy(opportunity)
}

/** Badge text shown on cards and role-detail pages. */
export function getRoleTypeLabel(opportunity: Opportunity): string {
  if (opportunity.status === "Live Opportunity") return "Live Vacancy"
  if (opportunity.status === "Paused") return "Paused"
  return "ION Talent Network"
}

/** Primary CTA / submit-button label — matches across the top CTA, sticky CTA and application form. */
export function getApplyCtaLabel(opportunity: Opportunity): string {
  return isLiveVacancy(opportunity) ? "Apply for this Role" : "Submit CV / Register Interest"
}

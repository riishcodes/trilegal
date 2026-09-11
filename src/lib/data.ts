import { Lawyer, Case, JudgmentResult, Task, KnowledgeDocument, LearningPathItem, LegalDraft } from "@/types/legal";

export const DEMO_USER: Lawyer = {
  id: "lawyer-1",
  name: "Arjun Mehra",
  role: "Senior Associate",
  experienceYears: 7,
  practiceAreas: ["Constitutional Law", "Commercial Litigation", "Regulatory Disputes"],
  skills: [
    { name: "Legal Research", score: 90 },
    { name: "Drafting", score: 75 },
    { name: "Regulatory Law", score: 70 },
    { name: "Advanced Advocacy", score: 60 },
    { name: "Constitutional Law", score: 60 },
    { name: "Cross-Examination", score: 52 },
    { name: "Precedent Mapping", score: 88 },
  ],
  workload: 68,
  domainReadiness: 78,
  growthScore: 84,
  email: "arjun.mehra@trilegal-demo.in",
  phone: "+91 22 4007 8000",
  location: "Mumbai (Nariman Point Office)",
  admissions: "Bar Council of Maharashtra & Goa (2019), Advocate-on-Record Eligible",
  avatarBg: "bg-blue-600",
  bio: "Senior Associate specializing in high-stakes regulatory challenges, writ petitions under Article 226/32, and infrastructure sector disputes."
};

export const INITIAL_LAWYERS: Lawyer[] = [
  DEMO_USER,
  {
    id: "lawyer-2",
    name: "Vikramjit Roy",
    role: "Senior Partner",
    experienceYears: 18,
    practiceAreas: ["Constitutional Law", "Appellate Advocacy", "Infrastructure"],
    skills: [
      { name: "Advanced Advocacy", score: 96 },
      { name: "Constitutional Law", score: 95 },
      { name: "Risk Mitigation", score: 94 },
      { name: "Cross-Examination", score: 90 },
    ],
    workload: 85,
    domainReadiness: 96,
    growthScore: 92,
    email: "vikramjit.roy@trilegal-demo.in",
    phone: "+91 11 4163 5000",
    location: "New Delhi (Barakhamba Road)",
    admissions: "Supreme Court Bar Association, Senior Advocate eligible",
    avatarBg: "bg-slate-900",
    bio: "Head of Dispute Resolution practice with 18+ years appearing before the Supreme Court of India and High Courts in benchmark constitutional matters."
  },
  {
    id: "lawyer-3",
    name: "Sneha Kapoor",
    role: "Senior Associate",
    experienceYears: 7,
    practiceAreas: ["Dispute Resolution", "Commercial Arbitration", "Contract Law"],
    skills: [
      { name: "Dispute Strategy", score: 88 },
      { name: "Contract Drafting", score: 86 },
      { name: "Precedent Mapping", score: 85 },
      { name: "Regulatory Law", score: 76 },
    ],
    workload: 62,
    domainReadiness: 84,
    growthScore: 89,
    email: "sneha.kapoor@trilegal-demo.in",
    phone: "+91 22 4007 8021",
    location: "Mumbai",
    admissions: "Bar Council of Delhi (2019)",
    avatarBg: "bg-blue-800",
    bio: "Key member of the Commercial Disputes group, focused on bilateral investment treaty arbitration and municipal writ petitions."
  },
  {
    id: "lawyer-4",
    name: "Karan Sharma",
    role: "Associate",
    experienceYears: 3,
    practiceAreas: ["Legal Research", "Dispute Resolution", "Regulatory Compliance"],
    skills: [
      { name: "Legal Research", score: 85 },
      { name: "Initial Drafting", score: 78 },
      { name: "Document Verification", score: 88 },
      { name: "Precedent Mapping", score: 80 },
    ],
    workload: 45,
    domainReadiness: 72,
    growthScore: 78,
    email: "karan.sharma@trilegal-demo.in",
    phone: "+91 22 4007 8044",
    location: "Mumbai",
    admissions: "Bar Council of Maharashtra & Goa (2023)",
    avatarBg: "bg-blue-700",
    bio: "Associate with strong statutory compilation and multi-database Indian jurisprudence research capabilities."
  },
  {
    id: "lawyer-5",
    name: "Ananya Deshmukh",
    role: "Partner",
    experienceYears: 13,
    practiceAreas: ["Corporate M&A", "Regulatory & Competition", "Private Equity"],
    skills: [
      { name: "Contract Drafting", score: 94 },
      { name: "Negotiation", score: 92 },
      { name: "Regulatory Law", score: 89 },
      { name: "Risk Mitigation", score: 91 },
    ],
    workload: 72,
    domainReadiness: 91,
    growthScore: 88,
    email: "ananya.d@trilegal-demo.in",
    phone: "+91 80 4343 5000",
    location: "Bengaluru",
    admissions: "Bar Council of Karnataka (2013)",
    avatarBg: "bg-slate-800",
    bio: "Corporate partner advising Fortune 500 tech conglomerates and private equity funds on cross-border transactions."
  },
  {
    id: "lawyer-6",
    name: "Rohan Varma",
    role: "Senior Associate",
    experienceYears: 6,
    practiceAreas: ["Insolvency & Bankruptcy (IBC)", "Banking & Finance", "Debt Recovery"],
    skills: [
      { name: "IBC Proceedings", score: 91 },
      { name: "Financial Analysis", score: 84 },
      { name: "Drafting", score: 82 },
      { name: "NCLT Advocacy", score: 79 },
    ],
    workload: 78,
    domainReadiness: 81,
    growthScore: 82,
    email: "rohan.varma@trilegal-demo.in",
    phone: "+91 11 4163 5012",
    location: "New Delhi",
    admissions: "Bar Council of Delhi (2020)",
    avatarBg: "bg-blue-900",
    bio: "Specializes in NCLT/NCLAT corporate insolvency resolution processes and Securitisation matters."
  },
  {
    id: "lawyer-7",
    name: "Pooja Hegde",
    role: "Partner",
    experienceYears: 11,
    practiceAreas: ["Intellectual Property", "Tech Regulations", "Media & Entertainment"],
    skills: [
      { name: "Patent Litigation", score: 90 },
      { name: "IP Valuation", score: 88 },
      { name: "Advocacy", score: 85 },
      { name: "Dispute Strategy", score: 87 },
    ],
    workload: 58,
    domainReadiness: 89,
    growthScore: 87,
    email: "pooja.hegde@trilegal-demo.in",
    phone: "+91 80 4343 5022",
    location: "Bengaluru",
    admissions: "Bar Council of Karnataka (2015)",
    avatarBg: "bg-slate-700",
    bio: "Lead IP counsel recognized by Chambers Asia-Pacific for patent enforcement and trademark portfolio architecture."
  },
  {
    id: "lawyer-8",
    name: "Devendra Singhania",
    role: "Associate",
    experienceYears: 2,
    practiceAreas: ["Commercial Contracts", "General Corporate", "Employment Law"],
    skills: [
      { name: "Contract Review", score: 80 },
      { name: "Legal Research", score: 82 },
      { name: "Initial Drafting", score: 75 },
    ],
    workload: 50,
    domainReadiness: 69,
    growthScore: 76,
    email: "devendra.s@trilegal-demo.in",
    phone: "+91 22 4007 8055",
    location: "Mumbai",
    admissions: "Bar Council of Maharashtra & Goa (2024)",
    avatarBg: "bg-blue-600",
    bio: "Junior corporate associate focusing on employment policies, NDAs, and vendor service contracts."
  },
  {
    id: "lawyer-9",
    name: "Nalini Swaminathan",
    role: "Senior Partner",
    experienceYears: 22,
    practiceAreas: ["Taxation (Direct & Indirect)", "Constitutional Law", "Customs"],
    skills: [
      { name: "High Stakes Tax Litigation", score: 98 },
      { name: "Appellate Advocacy", score: 95 },
      { name: "Statutory Interpretation", score: 97 },
    ],
    workload: 90,
    domainReadiness: 98,
    growthScore: 94,
    email: "nalini.s@trilegal-demo.in",
    phone: "+91 44 2434 5000",
    location: "Chennai",
    admissions: "Bar Council of Tamil Nadu (2004)",
    avatarBg: "bg-slate-900",
    bio: "Senior tax authority frequently briefed in Constitution Bench references and cross-border transfer pricing disputes."
  },
  {
    id: "lawyer-10",
    name: "Aditya Nair",
    role: "Associate",
    experienceYears: 2,
    practiceAreas: ["Arbitration", "Construction Disputes", "Legal Research"],
    skills: [
      { name: "Legal Research", score: 84 },
      { name: "Claim Charting", score: 79 },
      { name: "Precedent Mapping", score: 81 },
    ],
    workload: 40,
    domainReadiness: 68,
    growthScore: 75,
    email: "aditya.nair@trilegal-demo.in",
    phone: "+91 11 4163 5033",
    location: "New Delhi",
    admissions: "Bar Council of Delhi (2024)",
    avatarBg: "bg-blue-800",
    bio: "Dispute associate supporting domestic arbitration proceedings under the UNCITRAL & MCIA frameworks."
  },
  {
    id: "lawyer-11",
    name: "Pallavi Joshi",
    role: "Senior Associate",
    experienceYears: 8,
    practiceAreas: ["Environment Law", "Mining & Energy", "Public Interest Litigation"],
    skills: [
      { name: "NGT Litigation", score: 92 },
      { name: "Environmental Clearance Audits", score: 89 },
      { name: "Advocacy", score: 83 },
    ],
    workload: 65,
    domainReadiness: 85,
    growthScore: 86,
    email: "pallavi.joshi@trilegal-demo.in",
    phone: "+91 11 4163 5045",
    location: "New Delhi",
    admissions: "National Green Tribunal Bar (2018)",
    avatarBg: "bg-blue-700",
    bio: "Senior advocate appearing before the National Green Tribunal and appellate high courts on forest conservation and coastal zone clearances."
  },
  {
    id: "lawyer-12",
    name: "Zeeshan Khan",
    role: "Junior Associate",
    experienceYears: 1,
    practiceAreas: ["Legal Research", "Case Law Digesting", "RTI & Compliance"],
    skills: [
      { name: "Legal Research", score: 88 },
      { name: "Document Verification", score: 84 },
      { name: "Initial Drafting", score: 70 },
    ],
    workload: 35,
    domainReadiness: 62,
    growthScore: 72,
    email: "zeeshan.khan@trilegal-demo.in",
    phone: "+91 22 4007 8060",
    location: "Mumbai",
    admissions: "Bar Council of Maharashtra & Goa (2025)",
    avatarBg: "bg-slate-800",
    bio: "Recent law school honors graduate focused on case law digestion, citation cross-checking, and statutory updates."
  }
];

export const INITIAL_CASES: Case[] = [
  {
    id: "case-1",
    title: "R.K. Developers vs. State of Maharashtra",
    client: "R.K. Infrastructure & Housing Ltd.",
    practiceArea: "Constitutional Law",
    caseType: "Writ Petition (Article 226)",
    court: "High Court of Judicature at Bombay",
    briefDescription: "Constitutional challenge to sudden municipal stop-work notification and unilateral modification of Development Control Regulations (DCR 33(10)) without statutory hearing, inflicting INR 145 Crore development loss.",
    riskLevel: "HIGH",
    riskConfidence: 93,
    riskFactors: [
      { factor: "Constitutional issue involved", impact: "HIGH", detail: "Arbitrary executive action under Article 14 and property deprivation under Article 300A." },
      { factor: "High financial impact", impact: "HIGH", detail: "Disputed development value exceeds INR 145 Crores with continuous demurrage." },
      { factor: "High precedent complexity", impact: "HIGH", detail: "Interprets scope of municipal delegated legislation versus doctrine of legitimate expectation." },
      { factor: "Statutory implications", impact: "HIGH", detail: "Challenges retroactive enforcement under Maharashtra Regional & Town Planning Act (MRTP Act 1966)." },
      { factor: "Reputational implications", impact: "MEDIUM", detail: "Flagship township project with 850 residential allottees awaiting possession." }
    ],
    riskScores: {
      financialValue: 92,
      precedentComplexity: 95,
      statutoryPenalty: 91
    },
    riskExplanation: "This matter involves constitutional interpretation under Articles 14 and 19(1)(g) and may establish benchmark precedent on municipal retrospective notifications. Senior partner oversight (10+ yrs) is strictly recommended per firm protocol.",
    status: "IN PROGRESS",
    assignedTeam: [
      {
        lawyerId: "lawyer-1",
        roleInCase: "Lead Associate",
        matchPercentage: 94,
        matchReason: "Selected because of constitutional litigation track record, Article 226 drafting expertise, and high familiarity with Maharashtra DCR jurisprudence."
      },
      {
        lawyerId: "lawyer-3",
        roleInCase: "Senior Counsel",
        matchPercentage: 88,
        matchReason: "Selected for exceptional municipal dispute strategy and interim relief advocacy before Bombay High Court Division Bench."
      },
      {
        lawyerId: "lawyer-4",
        roleInCase: "Research Associate",
        matchPercentage: 81,
        matchReason: "Selected to assist with statutory compilation of MRTP Act delegated powers and ratio tracking from Supreme Court planning precedents."
      }
    ],
    filedDate: "14 Feb 2026",
    nextHearing: "22 Mar 2026",
    lastUpdated: "Today, 11:20 AM",
    documentsCount: 14,
    briefItemsCount: 4
  },
  {
    id: "case-2",
    title: "Zenith Corp. vs. Nova Infra",
    client: "Zenith EPC Global Ltd.",
    practiceArea: "Arbitration",
    caseType: "Section 9 & 11 Arbitration Petition",
    court: "Delhi High Court (Commercial Division)",
    briefDescription: "Multi-party EPC contract dispute regarding delay liquidated damages and invocation of unconditional bank guarantees amounting to INR 62 Crores.",
    riskLevel: "MEDIUM",
    riskConfidence: 84,
    riskFactors: [
      { factor: "Bank Guarantee invocation", impact: "HIGH", detail: "Irreparable harm test under Section 9 of Arbitration Act." },
      { factor: "Multi-tier dispute escalation clause", impact: "MEDIUM", detail: "Pre-arbitration conciliation conditions in dispute." }
    ],
    riskScores: {
      financialValue: 74,
      precedentComplexity: 68,
      statutoryPenalty: 70
    },
    riskExplanation: "Commercial arbitration with established precedents on encashment of bank guarantees. Requires mid-to-senior associate dispute handling.",
    status: "RESEARCH",
    assignedTeam: [
      {
        lawyerId: "lawyer-3",
        roleInCase: "Senior Counsel",
        matchPercentage: 91,
        matchReason: "Specialist in commercial arbitration and stay of bank guarantees."
      }
    ],
    filedDate: "03 Jan 2026",
    nextHearing: "28 Mar 2026",
    lastUpdated: "Yesterday",
    documentsCount: 9,
    briefItemsCount: 2
  },
  {
    id: "case-3",
    title: "Meera S. vs. Union of India",
    client: "Meera Swaminathan (Petitioner in Person)",
    practiceArea: "Constitutional Law",
    caseType: "Public Interest Litigation (PIL)",
    court: "Supreme Court of India",
    briefDescription: "Challenge to automated biometric surveillance in public transport systems under right to informational privacy recognized in K.S. Puttaswamy judgment.",
    riskLevel: "HIGH",
    riskConfidence: 96,
    riskFactors: [
      { factor: "Constitutional Bench Impact", impact: "HIGH", detail: "Proportionality standard test under Article 21." },
      { factor: "National Policy Effect", impact: "HIGH", detail: "Impacts central digital public infrastructure deployments." }
    ],
    riskScores: {
      financialValue: 85,
      precedentComplexity: 98,
      statutoryPenalty: 92
    },
    riskExplanation: "Supreme Court constitutional challenge invoking Puttaswamy proportionality test. Senior partner leadership is mandatory.",
    status: "DRAFTING",
    assignedTeam: [
      {
        lawyerId: "lawyer-2",
        roleInCase: "Lead Partner",
        matchPercentage: 96,
        matchReason: "18+ years Supreme Court advocacy and benchmark privacy jurisprudence."
      }
    ],
    filedDate: "19 Dec 2025",
    nextHearing: "15 Apr 2026",
    lastUpdated: "3 days ago",
    documentsCount: 21,
    briefItemsCount: 6
  },
  {
    id: "case-4",
    title: "Alpha Tech Pvt. Ltd. vs. Beta LLC",
    client: "Alpha Tech Solutions",
    practiceArea: "IP Litigation",
    caseType: "Commercial Suit for Trademark Infringement",
    court: "Delhi High Court (Intellectual Property Division)",
    briefDescription: "Ex-parte ad-interim injunction against trademark infringement and passing off of AI diagnostic software trademark brand.",
    riskLevel: "MEDIUM",
    riskConfidence: 79,
    riskFactors: [
      { factor: "Market Deception", impact: "MEDIUM", detail: "Deceptive phonetic similarity in consumer market." }
    ],
    riskScores: {
      financialValue: 65,
      precedentComplexity: 72,
      statutoryPenalty: 60
    },
    riskExplanation: "Well-settled trademark passing off principles with established local commissioner search orders.",
    status: "REVIEW",
    assignedTeam: [
      {
        lawyerId: "lawyer-7",
        roleInCase: "Lead Partner",
        matchPercentage: 92,
        matchReason: "Specialist IP litigation partner."
      }
    ],
    filedDate: "10 Jan 2026",
    nextHearing: "04 Apr 2026",
    lastUpdated: "5 days ago",
    documentsCount: 8,
    briefItemsCount: 3
  },
  {
    id: "case-5",
    title: "GreenEarth NGO vs. State of Karnataka",
    client: "GreenEarth Environmental Trust",
    practiceArea: "Environmental Law",
    caseType: "Application under Section 14 NGT Act",
    court: "National Green Tribunal (Southern Zone, Chennai)",
    briefDescription: "Challenging tree felling permission in eco-sensitive Western Ghats buffer corridor without mandatory public consultation.",
    riskLevel: "HIGH",
    riskConfidence: 91,
    riskFactors: [
      { factor: "Precautionary Principle", impact: "HIGH", detail: "Public trust doctrine and environmental impact assessment bypass." }
    ],
    riskScores: {
      financialValue: 88,
      precedentComplexity: 90,
      statutoryPenalty: 94
    },
    riskExplanation: "Substantial question relating to environment under Section 14 of NGT Act. Public scrutiny high.",
    status: "IN PROGRESS",
    assignedTeam: [
      {
        lawyerId: "lawyer-11",
        roleInCase: "Lead Associate",
        matchPercentage: 92,
        matchReason: "Top environmental advocate with NGT Southern Zone track record."
      }
    ],
    filedDate: "02 Feb 2026",
    nextHearing: "11 Apr 2026",
    lastUpdated: "1 week ago",
    documentsCount: 16,
    briefItemsCount: 5
  },
  {
    id: "case-6",
    title: "FinServe Capital vs. Apex Retail",
    client: "FinServe NBFC",
    practiceArea: "Corporate & Insolvency",
    caseType: "Section 7 IBC Application",
    court: "NCLT Mumbai Bench IV",
    briefDescription: "Initiation of Corporate Insolvency Resolution Process for financial debt default of INR 38 Crores under master credit facility.",
    riskLevel: "LOW",
    riskConfidence: 87,
    riskFactors: [
      { factor: "Debt and default established", impact: "LOW", detail: "Bank statements, NeSL record of default registered." }
    ],
    riskScores: {
      financialValue: 45,
      precedentComplexity: 35,
      statutoryPenalty: 40
    },
    riskExplanation: "Routine Section 7 IBC matter with clean NeSL certificate. Junior associate document verification required.",
    status: "REVIEW",
    assignedTeam: [
      {
        lawyerId: "lawyer-6",
        roleInCase: "Lead Associate",
        matchPercentage: 86,
        matchReason: "Experienced in NCLT filings and NeSL default verification."
      }
    ],
    filedDate: "28 Jan 2026",
    nextHearing: "30 Mar 2026",
    lastUpdated: "1 week ago",
    documentsCount: 6,
    briefItemsCount: 1
  },
  {
    id: "case-7",
    title: "Apex Logistics vs. Port Trust Authority",
    client: "Apex Logistics India",
    practiceArea: "Commercial Contracts",
    caseType: "Commercial Dispute",
    court: "Bombay High Court",
    briefDescription: "Contractual claim for reimbursement of dredging tariff surcharges levied retrospectively by port trust concessionaire.",
    riskLevel: "LOW",
    riskConfidence: 82,
    riskFactors: [
      { factor: "Pure contractual interpretation", impact: "LOW", detail: "Concession agreement force majeure and tariff clauses." }
    ],
    riskScores: {
      financialValue: 38,
      precedentComplexity: 30,
      statutoryPenalty: 28
    },
    riskExplanation: "Routine commercial dispute with low regulatory ambiguity.",
    status: "COMPLETED",
    assignedTeam: [
      {
        lawyerId: "lawyer-8",
        roleInCase: "Lead Associate",
        matchPercentage: 83,
        matchReason: "Routine contract review and billing audit specialist."
      }
    ],
    filedDate: "12 Nov 2025",
    nextHearing: "Settled",
    lastUpdated: "2 weeks ago",
    documentsCount: 11,
    briefItemsCount: 2
  },
  {
    id: "case-8",
    title: "Dr. K. Ramanathan vs. Medical Council",
    client: "Dr. K. Ramanathan",
    practiceArea: "Regulatory Law",
    caseType: "Writ Petition (Article 226)",
    court: "Madras High Court",
    briefDescription: "Challenge to suspension of medical practice license issued without affording opportunity of personal hearing (Audi Alteram Partem violation).",
    riskLevel: "MEDIUM",
    riskConfidence: 86,
    riskFactors: [
      { factor: "Natural Justice Violation", impact: "HIGH", detail: "Ex-parte suspension without show cause notice." }
    ],
    riskScores: {
      financialValue: 55,
      precedentComplexity: 72,
      statutoryPenalty: 65
    },
    riskExplanation: "Direct breach of principles of natural justice. Mid-level associate dispute management suitable.",
    status: "IN PROGRESS",
    assignedTeam: [
      {
        lawyerId: "lawyer-1",
        roleInCase: "Lead Associate",
        matchPercentage: 89,
        matchReason: "Strong natural justice and administrative law background."
      }
    ],
    filedDate: "05 Feb 2026",
    nextHearing: "08 Apr 2026",
    lastUpdated: "3 days ago",
    documentsCount: 7,
    briefItemsCount: 2
  }
];

export const INITIAL_RESEARCH_RESULTS: JudgmentResult[] = [
  {
    id: "judg-1",
    title: "Maneka Gandhi vs. Union of India",
    citation: "(1978) 1 SCC 248 : AIR 1978 SC 597",
    court: "Supreme Court of India (7-Judge Bench)",
    year: 1978,
    database: "SCC Online (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Landmark Constitutional Jurisprudence (Public Record)",
    summaryNote: "Established that procedure depriving personal liberty/rights must be 'just, fair and reasonable', striking down arbitrary executive discretion under Article 14 & 21.",
    aiRelevanceExplanation: "Directly applicable to R.K. Developers challenge: Any municipal stop-work order must satisfy substantive fairness, non-arbitrariness, and natural justice under Article 14.",
    practiceArea: "Constitutional Law",
    tags: ["Article 14", "Article 21", "Natural Justice", "Arbitrariness", "Audi Alteram Partem"],
    fullText: `IN THE SUPREME COURT OF INDIA
CIVIL ORIGINAL JURISDICTION
WRIT PETITION NO. 231 OF 1977

Maneka Gandhi ... Petitioner
vs.
Union of India & Anr. ... Respondents

CORAM:
M.H. Beg, C.J., Y.V. Chandrachud, P.N. Bhagwati, V.R. Krishna Iyer, N.L. Untwalia, S. Murtaza Fazal Ali and P.S. Kailasam, JJ.

JUDGMENT (Per P.N. Bhagwati, J.):
1. The petitioner's passport was impounded by the Central Government under Section 10(3)(c) of the Passports Act, 1967 'in public interest' without furnishing any reasons.
2. The fundamental question is whether the statutory power can be exercised arbitrarily without complying with principles of natural justice and audi alteram partem.
3. Held: The principle of reasonableness pervades the entire constitutional scheme. Article 14 strikes at arbitrariness in State action and ensures fairness and equality of treatment. The principle of reasonableness, which logically as well as philosophically, is an essential element of equality or non-arbitrariness, pervades Article 14 like a brooding omnipresence.
4. Any procedure established by law must satisfy the triad test of Articles 14, 19, and 21. Executive action that is arbitrary, lacking reasons, or issued without fair hearing is null and void.`,
    keyTakeaways: [
      "Article 14 strikes at arbitrariness in State executive action and guarantees procedural and substantive fairness.",
      "Principles of natural justice (audi alteram partem) are inherent in every administrative or regulatory statutory action unless expressly excluded.",
      "The doctrine of 'Golden Triangle' connects Articles 14, 19, and 21 into an integrated guarantee against capricious state orders.",
      "An order passed without communicating reasons or without prior notice fails constitutional scrutiny."
    ],
    relevantSections: ["Constitution of India, Article 14", "Constitution of India, Article 19(1)(g)", "Constitution of India, Article 21", "Passports Act 1967, Section 10(3)(c)"],
    importantPrecedents: ["A.K. Gopalan v. State of Madras (1950)", "E.P. Royappa v. State of Tamil Nadu (1974) 4 SCC 3"],
    potentialApplication: "Directly arms petitioner R.K. Developers to argue that Mumbai Municipal Corporation's sudden stop-work memo violates Article 14 by imposing retroactive burdens without affording hearing or reasons."
  },
  {
    id: "judg-2",
    title: "Justice K.S. Puttaswamy (Retd.) vs. Union of India",
    citation: "(2017) 10 SCC 1 : AIR 2017 SC 4120",
    court: "Supreme Court of India (9-Judge Constitution Bench)",
    year: 2017,
    database: "SCC Online (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Landmark Constitutional Jurisprudence (Public Record)",
    summaryNote: "Unanimously affirmed the Fundamental Right to Privacy under Article 21 and crystallized the four-prong Proportionality Test for state regulatory interferences.",
    aiRelevanceExplanation: "Provides the strict proportionality framework used by Indian courts to examine whether state regulatory restrictions pursue a legitimate aim through the least intrusive means.",
    practiceArea: "Constitutional Law",
    tags: ["Article 21", "Proportionality", "Privacy", "Legitimate State Aim", "Constitution Bench"],
    fullText: `IN THE SUPREME COURT OF INDIA
CIVIL ORIGINAL JURISDICTION
WRIT PETITION (CIVIL) NO. 494 OF 2012

Justice K.S. Puttaswamy (Retd.) & Anr. ... Petitioners
vs.
Union of India & Ors. ... Respondents

CORAM:
J.S. Khehar, C.J., J. Chelameswar, S.A. Bobde, R.K. Agrawal, Rohinton F. Nariman, A.M. Sapre, D.Y. Chandrachud, Sanjay Kishan Kaul, S. Abdul Nazeer, JJ.

JUDGMENT:
The right to privacy is protected as an intrinsic part of the right to life and personal liberty under Article 21. Any state restriction on fundamental freedoms must satisfy the 4-part proportionality doctrine: (1) Legitimate State Goal, (2) Rational Nexus, (3) Necessity / Least Restrictive Measure, and (4) Balancing of societal harm vs individual impact.`,
    keyTakeaways: [
      "Any regulatory curb on fundamental rights must satisfy the 4-part Proportionality Test.",
      "Executive convenience is not a valid substitute for constitutional necessity.",
      "State actions cannot arbitrarily nullify accrued citizen rights without showing compelling public urgency.",
      "Judicial review extends to both procedural fairness and proportionate impact."
    ],
    relevantSections: ["Constitution of India, Article 14", "Constitution of India, Article 21", "Doctrine of Proportionality"],
    importantPrecedents: ["Govind v. State of M.P. (1975)", "M.P. Sharma v. Satish Chandra (1954)"],
    potentialApplication: "Can be cited in R.K. Developers to establish that cancelling an approved building plan is disproportionate when minor regulatory compliances could address municipal concerns."
  },
  {
    id: "judg-3",
    title: "E.P. Royappa vs. State of Tamil Nadu",
    citation: "(1974) 4 SCC 3 : AIR 1974 SC 555",
    court: "Supreme Court of India (5-Judge Constitution Bench)",
    year: 1974,
    database: "Manupatra (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Landmark Equality Jurisprudence (Public Record)",
    summaryNote: "First formulated the modern doctrine that 'Equality is antithetic to arbitrariness. In fact, equality and arbitrariness are sworn enemies.'",
    aiRelevanceExplanation: "Fundamental authority in Indian administrative law establishing that any arbitrary exercise of statutory discretion invalidates the impugned state order.",
    practiceArea: "Constitutional Law",
    tags: ["Article 14", "Non-Arbitrariness", "Administrative Discretion", "State Action"],
    fullText: `Supreme Court of India: Per P.N. Bhagwati, J.
Where an act is arbitrary, it is implicit that it is unequal both according to political logic and constitutional law and is therefore violative of Article 14. An arbitrary state action lacks bona fides and cannot be sustained in law.`,
    keyTakeaways: [
      "Arbitrariness is antithetical to Article 14.",
      "State decisions must be founded on intelligible differentia and rational criteria.",
      "Whimsical executive notifications are liable to be quashed under writ jurisdiction."
    ],
    relevantSections: ["Constitution of India, Article 14"],
    importantPrecedents: ["State of W.B. v. Anwar Ali Sarkar (1952)"],
    potentialApplication: "Primary benchmark precedent to prove the municipal authority acted with manifest arbitrariness in singling out petitioner's development scheme."
  },
  {
    id: "judg-4",
    title: "Shayara Bano vs. Union of India",
    citation: "(2017) 9 SCC 1",
    court: "Supreme Court of India (5-Judge Constitution Bench)",
    year: 2017,
    database: "SCC Online (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Landmark Constitutional Jurisprudence (Public Record)",
    summaryNote: "Formalized the 'Manifest Arbitrariness' test as an independent ground to strike down both plenary legislation and delegated executive actions under Article 14.",
    aiRelevanceExplanation: "Provides the modern legal test: An action is manifestly arbitrary if it is done without adequate determining principle, is capriciously unreasoned, or is excessively disproportionate.",
    practiceArea: "Constitutional Law",
    tags: ["Manifest Arbitrariness", "Article 14", "Judicial Review", "Substantive Due Process"],
    fullText: `Per R.F. Nariman, J.:
Manifest arbitrariness must be something done by the legislature or executive capriciously, irrationally and/or without adequate determining principle. It also includes something which is excessive and disproportionate.`,
    keyTakeaways: [
      "Manifest arbitrariness is an independent, robust ground to strike down subordinate legislation and executive notifications.",
      "Absence of determining principle makes a regulatory decree unconstitutional under Article 14.",
      "Substantive due process principles are firmly embedded in Indian constitutional jurisprudence."
    ],
    relevantSections: ["Constitution of India, Article 14", "Article 13"],
    importantPrecedents: ["E.P. Royappa v. State of T.N.", "Sharma Transport v. Govt. of A.P. (2002)"],
    potentialApplication: "Core case authority to plead in paragraph 14 of R.K. Developers Writ Petition to quash the retrospective DCR amendment."
  },
  {
    id: "judg-5",
    title: "Ramana Dayaram Shetty vs. International Airport Authority of India",
    citation: "(1979) 3 SCC 489 : AIR 1979 SC 1628",
    court: "Supreme Court of India",
    year: 1979,
    database: "Indian Kanoon (Public Source)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Administrative Law Landmark (Public Record)",
    summaryNote: "The government cannot act arbitrarily in entering into contracts or issuing regulatory approvals; it is bound by the rules of fair play and its own published standards.",
    aiRelevanceExplanation: "Binds the Municipal Corporation to its previously sanctioned IOD and Commencement Certificate. The State cannot repudiate sanctioned rights on whim.",
    practiceArea: "Constitutional Law",
    tags: ["Article 14", "Government Contracts", "Promissory Estoppel", "Legitimate Expectation"],
    fullText: `It is well settled rule of administrative law that an executive authority must be rigorously held to the standards by which it professes its actions to be judged and it must scrupulously observe those standards on pain of invalidation of an act in violation of them.`,
    keyTakeaways: [
      "The State must act fairly and even-handedly when dealing with commercial and property rights.",
      "Government bodies cannot depart from their own published guidelines to the detriment of citizens.",
      "Article 14 applies with full rigor to commercial permissions and infrastructure licenses."
    ],
    relevantSections: ["Constitution of India, Article 14", "Article 298"],
    importantPrecedents: ["Union of India v. Anglo Afghan Agencies (1968)"],
    potentialApplication: "Asserts that having granted Commencement Certificate up to 14th plinth, the planning authority is estopped from halting construction without compensation."
  },
  {
    id: "judg-6",
    title: "Food Corporation of India vs. Kamdhenu Cattle Feed Industries",
    citation: "(1993) 1 SCC 71",
    court: "Supreme Court of India",
    year: 1993,
    database: "SCC Online (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Administrative Law Benchmark (Public Record)",
    summaryNote: "Doctrine of Legitimate Expectation: The State's discretionary power must be exercised reasonably and consistently with the legitimate expectation of affected parties.",
    aiRelevanceExplanation: "R.K. Developers invested INR 80+ Crores relying on sanctioned municipal approvals, creating an enforceable legitimate expectation that cannot be frustrated arbitrarily.",
    practiceArea: "Constitutional Law",
    tags: ["Legitimate Expectation", "Article 14", "Non-Arbitrariness", "Rule of Law"],
    fullText: `To satisfy the requirement of non-arbitrariness in state action it is necessary, to consider and give due weight to the reasonable or legitimate expectation of the persons likely to be affected by the decision or else that unfairness in the exercise of the power may amount to an abuse or excess of power.`,
    keyTakeaways: [
      "Legitimate expectation is a recognized head of judicial review under Article 14.",
      "Public bodies cannot defeat accrued commercial expectations without overriding public interest.",
      "Duty of fair hearing is mandatory before defeating legitimate expectations."
    ],
    relevantSections: ["Constitution of India, Article 14"],
    importantPrecedents: ["Council of Civil Service Unions v. Minister for the Civil Service (1985) AC 374"],
    potentialApplication: "Ground for writ petition: Unilateral change in development norms breaches developer's legitimate expectation."
  },
  {
    id: "judg-7",
    title: "Indore Development Authority vs. Manoharlal",
    citation: "(2020) 8 SCC 129",
    court: "Supreme Court of India (5-Judge Constitution Bench)",
    year: 2020,
    database: "SCC Online (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Land Acquisition Landmark (Public Record)",
    summaryNote: "Authoritative 5-judge bench interpretation on land acquisition lapse provisions under Section 24(2) of Right to Fair Compensation Act 2013.",
    aiRelevanceExplanation: "High-value precedent regarding municipal land acquisition proceedings and compensation entitlement under urban master planning.",
    practiceArea: "Constitutional Law",
    tags: ["Land Acquisition", "Section 24(2)", "Constitution Bench", "Urban Planning"],
    fullText: `Constitution Bench judgment settling the interpretation of lapsing of acquisition under Section 24 of Act 2013 when possession is taken vs compensation tendered.`,
    keyTakeaways: [
      "Settles conflict regarding physical possession vs deposit of compensation in treasury.",
      "Reaffirms importance of strict statutory adherence in planning acquisitions."
    ],
    relevantSections: ["RFCTLARR Act 2013, Section 24(2)", "Constitution of India, Article 300A"],
    importantPrecedents: ["Pune Municipal Corp v. Harakchand (2014) 3 SCC 183"],
    potentialApplication: "Cited if municipality attempts compulsory land reservation without initiating formal compensation proceedings."
  },
  {
    id: "judg-8",
    title: "Vidya Drolia vs. Durga Trading Corporation",
    citation: "(2021) 2 SCC 1",
    court: "Supreme Court of India (3-Judge Bench)",
    year: 2021,
    database: "SCC Online (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Arbitration Law Landmark (Public Record)",
    summaryNote: "Comprehensive four-fold test for determining non-arbitrability of disputes under Indian Arbitration and Conciliation Act 1996.",
    aiRelevanceExplanation: "Crucial for firm's commercial dispute practice and EPC/infrastructure arbitration petitions.",
    practiceArea: "Arbitration",
    tags: ["Section 11", "Arbitrability", "Section 8", "Four-fold Test"],
    fullText: `Settled the four-fold test for non-arbitrability: (1) actions in rem vs in personam, (2) third party rights, (3) erga omnes sovereign functions, (4) specific non-arbitrable statutes.`,
    keyTakeaways: [
      "Clarified landlord-tenant disputes are arbitrable unless governed by rent control statutes.",
      "Affirmed principle of minimal judicial intervention under Section 11(6A)."
    ],
    relevantSections: ["Arbitration & Conciliation Act 1996, Section 8, 11"],
    importantPrecedents: ["Booz Allen & Hamilton Inc. v. SBI Home Finance (2011) 5 SCC 532"],
    potentialApplication: "Applicable in Zenith Corp vs Nova Infra case regarding pre-arbitration escalation clauses."
  },
  {
    id: "judg-9",
    title: "Swiss Ribbons Pvt. Ltd. vs. Union of India",
    citation: "(2019) 4 SCC 17",
    court: "Supreme Court of India",
    year: 2019,
    database: "Manupatra (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Insolvency Law Benchmark (Public Record)",
    summaryNote: "Upheld constitutional validity of Insolvency and Bankruptcy Code (IBC) 2016 in its entirety, distinguishing financial and operational creditors.",
    aiRelevanceExplanation: "Standard authority relied upon in firm's NCLT and NCLAT insolvency resolution matters.",
    practiceArea: "Corporate",
    tags: ["IBC 2016", "Financial Creditors", "Section 7", "Constitutional Validity"],
    fullText: `Upheld the constitutional validity of the Insolvency and Bankruptcy Code, emphasizing that IBC is beneficial legislation to revive corporate debtors.`,
    keyTakeaways: [
      "Financial creditors are distinct from operational creditors based on capital involvement.",
      "The primary goal of IBC is resolution and value preservation, not liquidation."
    ],
    relevantSections: ["Insolvency and Bankruptcy Code 2016, Section 7, 29A"],
    importantPrecedents: ["Innoventive Industries Ltd. v. ICICI Bank (2018) 1 SCC 407"],
    potentialApplication: "Applicable in firm's FinServe Capital matter."
  },
  {
    id: "judg-10",
    title: "Shreya Singhal vs. Union of India",
    citation: "(2015) 5 SCC 1",
    court: "Supreme Court of India",
    year: 2015,
    database: "SCC Online (Demo)",
    isVerifiedPublicLandmark: true,
    sourceLabel: "Free Speech Landmark (Public Record)",
    summaryNote: "Struck down Section 66A of the Information Technology Act 2000 as unconstitutionally vague and chilling to freedom of speech under Article 19(1)(a).",
    aiRelevanceExplanation: "Foundational precedent on the 'void for vagueness' doctrine in Indian public law: Regulatory directives that lack clear definitions are void.",
    practiceArea: "Constitutional Law",
    tags: ["Article 19(1)(a)", "IT Act", "Vagueness Doctrine", "Chilling Effect"],
    fullText: `Section 66A was cast so widely that it captured speech which could not possibly be categorized as an offence under Article 19(2). A law that creates an offence must clearly state what is prohibited.`,
    keyTakeaways: [
      "The doctrine of vagueness applies to invalidate vague executive or penal orders.",
      "Clear standards are required when restricting constitutionally guaranteed business or speech activities."
    ],
    relevantSections: ["IT Act 2000, Section 66A", "Constitution of India, Article 19(1)(a)"],
    importantPrecedents: ["Romesh Thappar v. State of Madras (1950)"],
    potentialApplication: "Challenges vague municipal building guidelines as void for vagueness."
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: "task-1",
    title: "Draft Writ Petition challenging MRTP retrospective circular",
    caseId: "case-1",
    caseTitle: "R.K. Developers vs. State of Maharashtra",
    assignedToLawyerId: "lawyer-1",
    assignedToName: "Arjun Mehra",
    priority: "URGENT",
    dueDate: "Tomorrow, 5:00 PM",
    status: "IN_PROGRESS",
    practiceArea: "Constitutional Law"
  },
  {
    id: "task-2",
    title: "Extract Maneka Gandhi ratio on arbitrary executive stop-work orders",
    caseId: "case-1",
    caseTitle: "R.K. Developers vs. State of Maharashtra",
    assignedToLawyerId: "lawyer-4",
    assignedToName: "Karan Sharma",
    priority: "HIGH",
    dueDate: "20 Mar 2026",
    status: "IN_PROGRESS",
    practiceArea: "Constitutional Law"
  },
  {
    id: "task-3",
    title: "Compile DCR 33(10) historical gazette notifications (2018-2025)",
    caseId: "case-1",
    caseTitle: "R.K. Developers vs. State of Maharashtra",
    assignedToLawyerId: "lawyer-4",
    assignedToName: "Karan Sharma",
    priority: "MEDIUM",
    dueDate: "22 Mar 2026",
    status: "PENDING",
    practiceArea: "Constitutional Law"
  },
  {
    id: "task-4",
    title: "Senior Partner strategy review with Vikramjit Roy",
    caseId: "case-1",
    caseTitle: "R.K. Developers vs. State of Maharashtra",
    assignedToLawyerId: "lawyer-1",
    assignedToName: "Arjun Mehra",
    priority: "HIGH",
    dueDate: "24 Mar 2026",
    status: "PENDING",
    practiceArea: "Constitutional Law"
  },
  {
    id: "task-5",
    title: "File Section 9 urgent stay petition on Bank Guarantee",
    caseId: "case-2",
    caseTitle: "Zenith Corp. vs. Nova Infra",
    assignedToLawyerId: "lawyer-3",
    assignedToName: "Sneha Kapoor",
    priority: "URGENT",
    dueDate: "21 Mar 2026",
    status: "IN_PROGRESS",
    practiceArea: "Arbitration"
  },
  {
    id: "task-6",
    title: "Draft rejoinder affidavit on Article 21 data protection proportionality",
    caseId: "case-3",
    caseTitle: "Meera S. vs. Union of India",
    assignedToLawyerId: "lawyer-1",
    assignedToName: "Arjun Mehra",
    priority: "HIGH",
    dueDate: "28 Mar 2026",
    status: "PENDING",
    practiceArea: "Constitutional Law"
  },
  {
    id: "task-7",
    title: "Inspect local commissioner inventory report in trademark suit",
    caseId: "case-4",
    caseTitle: "Alpha Tech Pvt. Ltd. vs. Beta LLC",
    assignedToLawyerId: "lawyer-7",
    assignedToName: "Pooja Hegde",
    priority: "MEDIUM",
    dueDate: "25 Mar 2026",
    status: "COMPLETED",
    practiceArea: "IP Litigation"
  },
  {
    id: "task-8",
    title: "Prepare Western Ghats satellite chronology exhibit",
    caseId: "case-5",
    caseTitle: "GreenEarth NGO vs. State of Karnataka",
    assignedToLawyerId: "lawyer-11",
    assignedToName: "Pallavi Joshi",
    priority: "HIGH",
    dueDate: "27 Mar 2026",
    status: "IN_PROGRESS",
    practiceArea: "Environmental Law"
  },
  {
    id: "task-9",
    title: "Verify NeSL electronic certificate of default for NCLT bench",
    caseId: "case-6",
    caseTitle: "FinServe Capital vs. Apex Retail",
    assignedToLawyerId: "lawyer-6",
    assignedToName: "Rohan Varma",
    priority: "LOW",
    dueDate: "29 Mar 2026",
    status: "COMPLETED",
    practiceArea: "Corporate & Insolvency"
  }
];

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: "doc-1",
    title: "Standard Pleadings & Grounds for Article 226 Writ Petitions against Municipal Authorities",
    category: "Internal Precedents",
    practiceArea: "Constitutional Law",
    author: "Vikramjit Roy (Senior Partner)",
    date: "15 Jan 2026",
    matter: "Firm Dispute Practice Guide",
    access: "INTERNAL",
    tags: ["Article 226", "Writ Grounds", "Municipal Law", "Interim Relief"],
    contentExcerpt: "Comprehensive repository of tested grounds challenging municipal stop-work notices under Article 14, including non-application of mind, lack of show-cause notice, and promissory estoppel."
  },
  {
    id: "doc-2",
    title: "Legal Opinion on Retrospective Application of Delegated Urban Planning Regulations",
    category: "Legal Opinions",
    practiceArea: "Constitutional Law",
    author: "Arjun Mehra (Senior Associate)",
    date: "04 Dec 2025",
    matter: "Godrej Urban Development Advisory",
    access: "CONFIDENTIAL",
    tags: ["Retrospectivity", "Delegated Legislation", "MRTP Act", "Vested Rights"],
    contentExcerpt: "Detailed opinion establishing that building sanction rights accrued prior to a circular cannot be extinguished without explicit statutory authorization."
  },
  {
    id: "doc-3",
    title: "Model Arbitration Clause for Cross-Border EPC Contracts with Emergency Arbitrator Provisions",
    category: "Templates",
    practiceArea: "Arbitration",
    author: "Sneha Kapoor",
    date: "12 Nov 2025",
    matter: "Commercial Practice Group",
    access: "INTERNAL",
    tags: ["Arbitration Clause", "SIAC", "Emergency Arbitrator", "Seat vs Venue"],
    contentExcerpt: "Standardized institutional arbitration agreement specifying Mumbai/Delhi seat, English procedural law, and fast-track emergency arbitrator enforcement."
  },
  {
    id: "doc-4",
    title: "Research Memo: Modern Application of Proportionality Standard Post-Puttaswamy",
    category: "Research Memos",
    practiceArea: "Constitutional Law",
    author: "Arjun Mehra",
    date: "18 Oct 2025",
    matter: "Supreme Court Special Reference",
    access: "CONFIDENTIAL",
    tags: ["Proportionality", "Article 21", "Four-Prong Test", "State Interest"],
    contentExcerpt: "Analysis of 42 High Court decisions applying Puttaswamy's least-intrusive-means requirement to economic and licensing regulations."
  },
  {
    id: "doc-5",
    title: "Benchmark Synopsis and List of Dates Format for Bombay High Court Commercial Division",
    category: "Court Filings",
    practiceArea: "Commercial Litigation",
    author: "Litigation Practice Group",
    date: "02 Feb 2026",
    matter: "Standard Court Templates",
    access: "INTERNAL",
    tags: ["List of Dates", "Synopsis", "Bombay HC", "Commercial Courts Act"],
    contentExcerpt: "Court-compliant chronology format, paragraph numbering standards, and annexure indexing approved by Bombay HC Registry."
  }
];

export const INITIAL_LEARNING_PATH: LearningPathItem[] = [
  {
    id: "learn-1",
    title: "Advanced Constitutional Litigation & Bench Advocacy",
    currentSkill: 60,
    targetSkill: 90,
    whyRecommended: "Recommended because you have handled 5 writ petitions this quarter; mastering 5-judge bench doctrine will unlock senior partner co-counsel roles.",
    relatedCases: ["R.K. Developers vs. State of Maharashtra", "Meera S. vs. Union of India"],
    estimatedWeeks: 4,
    modulesCount: 6
  },
  {
    id: "learn-2",
    title: "Recent Developments in Arbitration Law (2025-2026 Amendments)",
    currentSkill: 65,
    targetSkill: 85,
    whyRecommended: "Recommended because you have handled commercial disputes but have limited exposure to recent emergency arbitrator enforcement jurisprudence.",
    relatedCases: ["Zenith Corp. vs. Nova Infra"],
    estimatedWeeks: 3,
    modulesCount: 5
  },
  {
    id: "learn-3",
    title: "Cross-Examination Techniques in Commercial & Regulatory Enquiries",
    currentSkill: 52,
    targetSkill: 80,
    whyRecommended: "Identified gap: Your drafting and research rank in the top 10th percentile, but courtroom oral examination hours are currently below target.",
    relatedCases: ["R.K. Developers vs. State of Maharashtra"],
    estimatedWeeks: 6,
    modulesCount: 8
  },
  {
    id: "learn-4",
    title: "Advanced EPC & Infrastructure Contract Drafting",
    currentSkill: 75,
    targetSkill: 90,
    whyRecommended: "Firm talent demand: Trilegal is expanding its Energy & Infrastructure docket; advanced risk mitigation drafting will accelerate your promotion to Partner.",
    relatedCases: ["Zenith Corp. vs. Nova Infra", "Apex Logistics"],
    estimatedWeeks: 4,
    modulesCount: 6
  }
];

export const INITIAL_DRAFT: LegalDraft = {
  id: "draft-1",
  caseId: "case-1",
  caseTitle: "R.K. Developers vs. State of Maharashtra",
  templateType: "Writ Petition",
  court: "High Court of Judicature at Bombay",
  tone: "Partner-style",
  briefFacts: "The Petitioner, R.K. Developers, was granted Intimation of Disapproval (IOD) and Commencement Certificate for redevelopment of 4.2 acres in suburban Mumbai. After expenditure of INR 145 Crores and construction up to the 14th plinth, Respondent No. 2 issued an ex-parte stop-work notice citing draft changes to DCR 33(10) without hearing.",
  keyLegalIssues: "Whether a sanctioned development permission can be arbitrarily revoked through retrospective executive circulars without notice in violation of Article 14 and principles of natural justice?",
  relevantLaws: "Constitution of India (Articles 14, 19(1)(g), 300A); Maharashtra Regional & Town Planning Act, 1966 (Sections 44, 45, 51).",
  content: `IN THE HIGH COURT OF JUDICATURE AT BOMBAY
ORDINARY ORIGINAL CIVIL JURISDICTION
WRIT PETITION NO. ______ OF 2026

IN THE MATTER OF:
R.K. Developers & Infrastructure Ltd.
Having its registered office at Nariman Point, Mumbai  ... PETITIONER

VERSUS

1. State of Maharashtra
   Through Urban Development Department, Mantralaya
2. Municipal Corporation of Greater Mumbai
   Through the Municipal Commissioner, Fort, Mumbai   ... RESPONDENTS

MEMORANDUM OF WRIT PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA

TO,
THE HON'BLE CHIEF JUSTICE AND COMPANION JUSTICES OF THE HON'BLE HIGH COURT OF BOMBAY

MOST RESPECTFULLY SHOWETH:

1. The Petitioner above-named approaches this Hon'ble Court seeking issuance of a Writ of Certiorari or any other appropriate writ, order, or direction quashing and setting aside the impugned Stop-Work Notice bearing Ref No. MCGM/DP/2026/894 dated 10th February 2026 issued by Respondent No. 2.

2. BRIEF FACTS OF THE CASE:
2.1 That the Petitioner is a reputed infrastructure development enterprise that undertook the composite redevelopment of CTS No. 412/A, measuring approximately 4.2 acres.
2.2 That Respondent No. 2, after scrutinizing all plans and receiving mandatory statutory premiums totaling INR 34.5 Crores, duly issued the Intimation of Disapproval (IOD) and the Commencement Certificate (CC) up to the 14th plinth.
2.3 That relying on the express representation and statutory clearance of the Respondents, the Petitioner mobilized substantial equipment, engaged 420 construction workers, and committed total capital expenditure exceeding INR 145 Crores.
2.4 That abruptly on 10th February 2026, without issuing any show-cause notice or affording even an hour of oral hearing, Respondent No. 2 served the impugned Stop-Work notice referencing an un-notified proposed change to DCR 33(10).

3. GROUNDS:
A. IMPUGNED ORDER VIOLATES ARTICLE 14 AND MANIFEST NON-ARBITRARINESS:
Because the action of Respondent No. 2 is manifestly arbitrary, whimsical, and devoid of any determining principle. As laid down by the Hon'ble Supreme Court in Maneka Gandhi vs. Union of India (1978) 1 SCC 248, equality under Article 14 is antithetical to arbitrariness. The State cannot exercise executive power without adhering to fundamental fairness.

B. VIOLATION OF AUDI ALTERAM PARTEM:
Because no notice or opportunity of being heard was ever afforded to the Petitioner prior to halting a multi-crore infrastructure development.

C. DOCTRINE OF LEGITIMATE EXPECTATION & PROMISSORY ESTOPPEL:
Because having granted statutory permissions and received fees, the Respondents are estopped in law from repudiating accrued development permissions.`,
  lastModified: "Today, 11:45 AM",
  status: "Draft",
  appliedSuggestions: []
};

export interface Lawyer {
  id: string;
  name: string;
  role: "Senior Partner" | "Partner" | "Senior Associate" | "Associate" | "Junior Associate";
  experienceYears: number;
  practiceAreas: string[];
  skills: { name: string; score: number }[]; // 0-100
  workload: number; // 0-100%
  domainReadiness: number; // 0-100%
  growthScore: number;
  email: string;
  phone: string;
  location: string;
  admissions: string;
  avatarBg: string;
  bio: string;
}

export interface Case {
  id: string;
  title: string;
  client: string;
  practiceArea: string;
  caseType: string;
  court: string;
  briefDescription: string;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  riskConfidence: number; // percentage, e.g. 93%
  riskFactors: {
    factor: string;
    impact: "HIGH" | "MEDIUM" | "LOW";
    detail: string;
  }[];
  riskScores: {
    financialValue: number; // score out of 100
    precedentComplexity: number; // score out of 100
    statutoryPenalty: number; // score out of 100
  };
  riskExplanation: string;
  status: "IN PROGRESS" | "RESEARCH" | "DRAFTING" | "REVIEW" | "COMPLETED";
  assignedTeam: {
    lawyerId: string;
    roleInCase: "Lead Partner" | "Senior Counsel" | "Lead Associate" | "Research Associate";
    matchPercentage: number;
    matchReason: string;
  }[];
  filedDate: string;
  nextHearing: string;
  lastUpdated: string;
  documentsCount: number;
  briefItemsCount: number;
}

export interface JudgmentResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: number;
  database: "SCC Online (Demo)" | "Manupatra (Demo)" | "Westlaw (Demo)" | "Indian Kanoon (Public Source)" | "Firm Repository (Confidential)";
  isVerifiedPublicLandmark: boolean; // If true, based on actual published Indian landmark jurisprudence
  sourceLabel: string;
  summaryNote: string;
  aiRelevanceExplanation: string;
  practiceArea: string;
  tags: string[];
  fullText: string;
  keyTakeaways: string[];
  relevantSections: string[];
  importantPrecedents: string[];
  potentialApplication: string;
}

export interface Task {
  id: string;
  title: string;
  caseId: string;
  caseTitle: string;
  assignedToLawyerId: string;
  assignedToName: string;
  priority: "URGENT" | "HIGH" | "MEDIUM" | "LOW";
  dueDate: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  practiceArea: string;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: "Research Memos" | "Past Briefs" | "Legal Opinions" | "Court Filings" | "Templates" | "Internal Precedents";
  practiceArea: string;
  author: string;
  date: string;
  matter: string;
  access: "CONFIDENTIAL" | "INTERNAL" | "PUBLIC";
  tags: string[];
  contentExcerpt: string;
}

export interface LearningPathItem {
  id: string;
  title: string;
  currentSkill: number;
  targetSkill: number;
  whyRecommended: string;
  relatedCases: string[];
  estimatedWeeks: number;
  modulesCount: number;
}

export interface BriefItem {
  id: string;
  caseId: string;
  sourceType: "JUDGMENT" | "KNOWLEDGE" | "STATUTE";
  sourceId: string;
  title: string;
  citation: string;
  court?: string;
  addedAt: string;
  keyNotes: string;
}

export interface LegalDraft {
  id: string;
  caseId?: string;
  caseTitle: string;
  templateType: "Writ Petition" | "Legal Notice" | "Legal Opinion" | "Arbitration Notice" | "Commercial Contract" | "Research Memo" | "Court Filing";
  court: string;
  tone: "Formal" | "Concise" | "Partner-style" | "Detailed" | "Firm Standard";
  briefFacts: string;
  keyLegalIssues: string;
  relevantLaws: string;
  content: string;
  lastModified: string;
  status: "Draft" | "Under Partner Review" | "Finalized";
  appliedSuggestions: string[];
}

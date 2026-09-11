# TRILEGAL AI - Project Context

## Project Overview
**Trilegal AI** is an Enterprise Legal Operating System for Indian law firms. It unifies legal research, AI-powered drafting, case risk analysis, and lawyer talent intelligence (OrbitX engine) into one co-counsel workspace.

**Current Status**: Demo MVP with simulated data and pre-filled credentials.

---

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.2.15 | React framework (App Router) |
| React | 18.3.1 | UI library |
| TypeScript | 5.6.3 | Type safety |
| Tailwind CSS | 3.4.19 | Styling |
| Radix UI | Latest | Primitives (Dialog, Tabs, Select, etc.) |
| Framer Motion | 13.2.0 | Animations |
| Lucide React | 1.45.0 | Icons |
| Sonner | 2.0.8 | Toast notifications |
| cmdk | 1.1.1 | Command palette |
| next-themes | 0.4.6 | Theme management |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── layout.tsx            # Root layout (AppProvider, Toaster, GlobalCommandMenu)
│   ├── globals.css           # Global styles, CSS variables, fonts
│   ├── login/page.tsx        # Login page (demo pre-filled)
│   └── app/
│       ├── layout.tsx        # App layout (Sidebar + TopBar)
│       ├── page.tsx          # Dashboard (main workspace)
│       ├── cases/            # Case management
│       ├── research/         # Legal research
│       ├── drafting/         # AI drafting studio
│       ├── tasks/            # Task assignments
│       ├── orbitx/           # OrbitX analytics & talent
│       ├── knowledge/        # Knowledge vault
│       ├── contacts/         # Contacts
│       └── settings/         # Settings
├── components/
│   ├── Sidebar.tsx           # Main navigation sidebar
│   ├── TopBar.tsx            # Top navigation bar with search
│   ├── GlobalCommandMenu.tsx # Cmd+K command palette
│   └── ui/                   # Radix-based UI components
│       ├── button.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── dialog.tsx
│       ├── tabs.tsx
│       ├── skeleton.tsx
│       ├── progress.tsx
│       ├── sonner.tsx        # Toast wrapper
│       ├── command.tsx       # Command palette primitives
│       ├── AnimatedCounter.tsx
│       └── PageTransition.tsx
├── context/
│   └── AppContext.tsx         # Global state management
├── lib/
│   ├── data.ts               # Demo data (users, cases, judgments, tasks)
│   └── utils.ts              # cn() utility for classnames
└── types/
    └── legal.ts              # TypeScript interfaces
```

---

## Key Configuration

### Path Aliases
- `@/*` maps to `./src/*`

### Environment
- **Demo Mode**: Always `true` - all data is simulated
- **Local Storage**: Used for persistence (cases, briefs, tasks, drafts)

### Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## Design System

### Color Tokens (CSS Variables)
```css
--background: #F6F8FB      /* Page background */
--foreground: #111827       /* Text color */
--primary: #0B132B          /* Navy (buttons, headers) */
--primary-foreground: #FFFFFF
--ring: #2563EB             /* Focus ring (blue) */
--border: #E2E8F0           /* Borders */
--radius: 0.625rem          /* Border radius base */
```

### Trilegal Brand Colors (Tailwind)
```
trilegal-primary: #0B132B   /* Navy */
trilegal-sidebar: #081126   /* Dark sidebar */
trilegal-blue: #2563EB      /* Primary blue */
trilegal-purple: #7C3AED    /* OrbitX/accent */
trilegal-green: #059669     /* Success */
trilegal-amber: #D97706     /* Warning */
trilegal-red: #DC2626       /* Destructive */
trilegal-bg: #F6F8FB        /* Light background */
trilegal-card: #FFFFFF      /* Card background */
trilegal-text: #111827      /* Primary text */
trilegal-muted: #64748B     /* Muted text */
trilegal-border: #E2E8F0    /* Borders */
```

### Typography
- **Primary**: Inter (sans-serif)
- **Serif**: Newsreader (legal documents)
- **Mono**: JetBrains Mono (code)

### Shadows
```css
shadow-subtle: 0 1px 2px 0 rgba(15, 23, 42, 0.04)
shadow-card: 0 1px 3px 0 rgba(11, 19, 43, 0.05), 0 1px 2px -1px rgba(11, 19, 43, 0.04)
shadow-cardHover: 0 8px 20px -4px rgba(11, 19, 43, 0.08), 0 4px 8px -2px rgba(11, 19, 43, 0.03)
shadow-modal: 0 25px 50px -12px rgba(11, 19, 43, 0.18)
```

---

## Core Data Types (src/types/legal.ts)

### Lawyer
```typescript
interface Lawyer {
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
```

### Case
```typescript
interface Case {
  id: string;
  title: string;
  client: string;
  practiceArea: string;
  caseType: string;
  court: string;
  briefDescription: string;
  riskLevel: "HIGH" | "MEDIUM" | "LOW";
  riskConfidence: number; // percentage
  riskFactors: { factor: string; impact: "HIGH" | "MEDIUM" | "LOW"; detail: string; }[];
  riskScores: { financialValue: number; precedentComplexity: number; statutoryPenalty: number; };
  riskExplanation: string;
  status: "IN PROGRESS" | "RESEARCH" | "DRAFTING" | "REVIEW" | "COMPLETED";
  assignedTeam: { lawyerId: string; roleInCase: string; matchPercentage: number; matchReason: string; }[];
  filedDate: string;
  nextHearing: string;
  lastUpdated: string;
  documentsCount: number;
  briefItemsCount: number;
}
```

### JudgmentResult
```typescript
interface JudgmentResult {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: number;
  database: "SCC Online (Demo)" | "Manupatra (Demo)" | "Westlaw (Demo)" | "Indian Kanoon (Public Source)" | "Firm Repository (Confidential)";
  isVerifiedPublicLandmark: boolean;
  practiceArea: string;
  tags: string[];
  fullText: string;
  keyTakeaways: string[];
  relevantSections: string[];
  importantPrecedents: string[];
  potentialApplication: string;
}
```

### Task
```typescript
interface Task {
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
```

### LegalDraft
```typescript
interface LegalDraft {
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
```

---

## State Management (AppContext)

### Global State
- `currentUser: Lawyer` - Logged-in user (Arjun Mehra by default)
- `cases: Case[]` - All cases
- `lawyers: Lawyer[]` - All lawyers
- `researchResults: JudgmentResult[]` - Search results
- `tasks: Task[]` - Task assignments
- `knowledgeDocs: KnowledgeDocument[]` - Knowledge vault
- `learningPaths: LearningPathItem[]` - OrbitX learning
- `briefItems: BriefItem[]` - Active brief citations
- `currentDraft: LegalDraft` - Current draft in editor
- `selectedCaseId: string` - Active case selection
- `isDemoMode: boolean` - Always true

### Key Actions
- `setSelectedCaseId(id)` - Switch active case
- `addCase(data)` - Create new case with auto risk calculation
- `updateCase(id, updates)` - Update case properties
- `addToBrief(item)` - Add citation to brief
- `removeFromBrief(id)` - Remove citation
- `updateTaskStatus(taskId, status)` - Update task status
- `addTask(task)` - Create new task
- `updateDraft(content)` - Update draft content
- `applyAiSuggestionToDraft(title, snippet)` - Apply AI suggestion
- `calculateRisk(data)` - Calculate case risk level
- `getRecommendedTeam(riskLevel, practiceArea)` - Get team recommendations

---

## Demo Data

### Default User
- **Name**: Arjun Mehra
- **Role**: Senior Associate
- **Experience**: 7 years
- **Practice Areas**: Constitutional Law, Commercial Litigation, Regulatory Disputes

### Sample Cases
1. **R.K. Developers vs. State of Maharashtra** - Constitutional Law (HIGH risk, 93% confidence)
2. **Zenith Corp. vs. Nova Infra** - Arbitration (MEDIUM risk)
3. **Meera S. vs. Union of India** - Constitutional Law/PIL (HIGH risk)
4. **Alpha Tech Pvt. Ltd. vs. Beta LLC** - IP Litigation (MEDIUM risk)
5. **GreenEarth NGO vs. State of Karnataka** - Environmental Law (HIGH risk)
6. **FinServe Capital vs. Apex Retail** - Corporate & Insolvency (LOW risk)
7. **Apex Logistics vs. Port Trust Authority** - Commercial Contracts (LOW risk)
8. **Dr. K. Ramanathan vs. Medical Council** - Regulatory Law (MEDIUM risk)

### Sample Judgments
1. Maneka Gandhi vs. Union of India (1978)
2. Justice K.S. Puttaswamy vs. Union of India (2017)
3. E.P. Royappa vs. State of Tamil Nadu (1974)
4. Shayara Bano vs. Union of India (2017)
5. Ramana Dayaram Shetty vs. International Airport Authority (1979)
6. Food Corporation of India vs. Kamdhenu Cattle Feed (1993)
7. Indore Development Authority vs. Manoharlal (2020)
8. Vidya Drolia vs. Durga Trading Corporation (2021)
9. Swiss Ribbons Pvt. Ltd. vs. Union of India (2019)
10. Shreya Singhal vs. Union of India (2015)

---

## UI Patterns

### Layout Structure
- **Landing Page**: Full-width dark theme (`/`)
- **App Layout**: Sidebar (260px) + TopBar + Main content (`/app/*`)
- **Sidebar**: Fixed left, dark navy background (#081126)
- **TopBar**: Sticky, white background, search + notifications + profile

### Component Conventions
- All components are `"use client"` (client-side rendering)
- Use `useApp()` hook to access global state
- Use `cn()` utility for conditional classes
- Use Framer Motion for animations
- Use Radix UI primitives for accessible components

### Command Palette
- Trigger: `Cmd+K` or `Ctrl+K` or `/`
- Features: Quick actions, case search, precedent search, lawyer lookup

---

## Common Tasks

### Adding a New Page
1. Create page in `src/app/app/[feature]/page.tsx`
2. Add navigation item in `Sidebar.tsx`
3. Add route to `GlobalCommandMenu.tsx` if needed

### Adding a New Component
1. Create in `src/components/ui/` for reusable primitives
2. Create in `src/components/` for feature-specific components
3. Use Radix UI primitives when possible

### Modifying State
1. Add type in `src/types/legal.ts`
2. Add initial data in `src/lib/data.ts`
3. Add state and actions in `src/context/AppContext.tsx`

### Styling
- Use Tailwind utility classes
- Use CSS variables for theme colors
- Use `cn()` for conditional classes
- Follow existing patterns in similar components

---

## Important Notes

1. **Demo Mode**: All data is simulated. No real API calls.
2. **Local Storage**: State persists across page reloads via localStorage.
3. **No Authentication**: Login is simulated with a timeout.
4. **Indian Law Focus**: All content is specific to Indian legal system.
5. **OrbitX**: The talent analytics engine is a key differentiator.
6. **Risk Calculation**: Deterministic algorithm based on financial value, precedent complexity, and statutory penalty scores.

---

## Useful Commands

```bash
# Development
npm run dev                    # Start dev server on http://localhost:3000

# Build & Deploy
npm run build                  # Build for production
npm run start                  # Start production server

# Code Quality
npm run lint                   # Run ESLint
npx tsc --noEmit              # Type check

# Dependencies
npm install                    # Install dependencies
npm install [package]          # Add new package
```

---

## File Naming Conventions
- **Components**: PascalCase (`Sidebar.tsx`, `TopBar.tsx`)
- **Pages**: lowercase (`page.tsx`)
- **Utilities**: camelCase (`utils.ts`)
- **Types**: camelCase (`legal.ts`)
- **Styles**: camelCase (`globals.css`)

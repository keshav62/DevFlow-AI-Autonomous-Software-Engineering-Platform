// MOCK DATA for Phase 1 UI Preview
// Strictly separated from real backend health and API responses.
// In Phase 2+, this will be replaced with real TanStack Query hooks.

export const MOCK_STATS = {
  totalRepositories: 14,
  activeWorkflows: 3,
  completedWorkflows: 89,
  failedWorkflows: 2,
};

export const MOCK_RECENT_REPOS = [
  {
    id: 'repo-1',
    name: 'devflow-core-engine',
    fullName: 'devflow-ai/devflow-core-engine',
    defaultBranch: 'main',
    lastWorkflow: '12 mins ago',
    status: 'COMPLETED',
  },
  {
    id: 'repo-2',
    name: 'payment-microservice',
    fullName: 'devflow-ai/payment-microservice',
    defaultBranch: 'main',
    lastWorkflow: '45 mins ago',
    status: 'RUNNING',
  },
  {
    id: 'repo-3',
    name: 'auth-gateway',
    fullName: 'devflow-ai/auth-gateway',
    defaultBranch: 'develop',
    lastWorkflow: '3 hours ago',
    status: 'FAILED',
  },
  {
    id: 'repo-4',
    name: 'docs-site',
    fullName: 'devflow-ai/docs-site',
    defaultBranch: 'main',
    lastWorkflow: '1 day ago',
    status: 'COMPLETED',
  },
];

export const MOCK_RECENT_WORKFLOWS = [
  {
    id: 'wf-01',
    type: 'Automated PR Code Review',
    repository: 'devflow-core-engine',
    status: 'COMPLETED',
    startedAt: '15 mins ago',
  },
  {
    id: 'wf-02',
    type: 'Security Vulnerability Scan',
    repository: 'payment-microservice',
    status: 'RUNNING',
    startedAt: '45 mins ago',
  },
  {
    id: 'wf-03',
    type: 'Test Suite Auto-Generation',
    repository: 'auth-gateway',
    status: 'FAILED',
    startedAt: '3 hours ago',
  },
  {
    id: 'wf-04',
    type: 'Repository Structural Analysis',
    repository: 'docs-site',
    status: 'COMPLETED',
    startedAt: '1 day ago',
  },
];

export const MOCK_AI_AGENTS = [
  {
    id: 'agent-1',
    name: 'Repository Analyzer',
    status: 'idle',
    description: 'Constructs AST and semantic index for repository understanding.',
    phase: 'Phase 3',
  },
  {
    id: 'agent-2',
    name: 'Bug Detection Agent',
    status: 'idle',
    description: 'Identifies logic defects, memory leaks, and concurrency regressions.',
    phase: 'Phase 3',
  },
  {
    id: 'agent-3',
    name: 'Code Generator',
    status: 'idle',
    description: 'Implements features and resolves GitHub issues autonomously.',
    phase: 'Phase 4',
  },
  {
    id: 'agent-4',
    name: 'Automated Test Generator',
    status: 'idle',
    description: 'Synthesizes unit and integration suites with boundary edge cases.',
    phase: 'Phase 4',
  },
  {
    id: 'agent-5',
    name: 'Security & SAST Agent',
    status: 'idle',
    description: 'Scans for CVEs, credential leaks, and injection vulnerabilities.',
    phase: 'Phase 4',
  },
  {
    id: 'agent-6',
    name: 'PR Review & Synthesis',
    status: 'idle',
    description: 'Creates concise GitHub PRs with architectural summaries and diffs.',
    phase: 'Phase 4',
  },
];

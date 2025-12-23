// core GitHub API types
export interface GitHubUser {
  login: string;
  id: number;
  avatar_url: string;
  name: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  stargazers_count: number;
  language: string | null;
  forks_count: number;
  updated_at: string;
  html_url: string;
  created_at: string;
}

// event types for activity tracking
export interface GitHubEvent {
  id: string;
  type: string;
  created_at: string;
  repo: {
    id: number;
    name: string;
  };
  payload: any;
}

// aggregated statistics for the year
export interface YearStats {
  totalCommits: number;
  totalPRs: number;
  totalIssues: number;
  totalReposCreated: number;
  totalStars: number;
  contributionDays: number;
}

// language breakdown with percentages
export interface LanguageBreakdown {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

// productivity insights
export interface ProductivityData {
  mostProductiveDay: string;
  mostProductiveMonth: string;
  longestStreak: number;
  contributionsByDay: Record<string, number>;
  contributionsByMonth: Record<string, number>;
}

// repository highlights
export interface RepoHighlight {
  name: string;
  description: string | null;
  stars: number;
  language: string | null;
  url: string;
  metric: string; // "most_starred", "most_commits", "most_contributors"
}

// main wrapped data structure
export interface GitHubWrappedData {
  user: GitHubUser;
  stats: YearStats;
  languages: LanguageBreakdown[];
  productivity: ProductivityData;
  repositories: RepoHighlight[];
  aiSummary: string;
  year: number;
}

// API response type
export interface WrappedAPIResponse {
  success: boolean;
  data?: GitHubWrappedData;
  error?: string;
}

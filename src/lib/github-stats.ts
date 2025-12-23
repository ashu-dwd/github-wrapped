import type {
  GitHubEvent,
  GitHubRepository,
  YearStats,
  LanguageBreakdown,
  ProductivityData,
  RepoHighlight,
} from "@/types/github-wrapped";

// language colors mapping (GitHub's official colors)
const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  Go: "#00ADD8",
  Rust: "#dea584",
  Ruby: "#701516",
  PHP: "#4F5D95",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
  Swift: "#ffac45",
  Kotlin: "#A97BFF",
  Dart: "#00B4AB",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
};

// calculating total commits from events
export const calculateTotalCommits = (events: GitHubEvent[]): number => {
  return events
    .filter((event) => event.type === "PushEvent")
    .reduce((total, event) => {
      return total + (event.payload?.commits?.length || 0);
    }, 0);
};

// calculating year statistics from events
export const calculateYearStats = (
  events: GitHubEvent[],
  repos: GitHubRepository[],
  year: number
): YearStats => {
  const yearStart = new Date(`${year}-01-01`);
  const yearEnd = new Date(`${year}-12-31`);

  const totalCommits = calculateTotalCommits(events);

  const totalPRs = events.filter(
    (event) => event.type === "PullRequestEvent"
  ).length;

  const totalIssues = events.filter(
    (event) => event.type === "IssuesEvent"
  ).length;

  const totalReposCreated = repos.filter((repo) => {
    const createdDate = new Date(repo.created_at);
    return createdDate >= yearStart && createdDate <= yearEnd;
  }).length;

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  // counting unique days with contributions
  const contributionDates = new Set(
    events.map((event) => event.created_at.split("T")[0])
  );
  const contributionDays = contributionDates.size;

  return {
    totalCommits,
    totalPRs,
    totalIssues,
    totalReposCreated,
    totalStars,
    contributionDays,
  };
};

// aggregating language statistics from repositories
export const getLanguageBreakdown = (
  repos: GitHubRepository[]
): LanguageBreakdown[] => {
  const languageCounts: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  });

  const totalRepos = Object.values(languageCounts).reduce((a, b) => a + b, 0);

  const breakdown = Object.entries(languageCounts)
    .map(([name, count]) => ({
      name,
      count,
      percentage: Math.round((count / totalRepos) * 100),
      color: LANGUAGE_COLORS[name] || "#858585",
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // top 5 languages

  return breakdown;
};

// analyzing productivity patterns (when user is most active)
export const findProductivityPatterns = (
  events: GitHubEvent[]
): ProductivityData => {
  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const contributionsByDay: Record<string, number> = {};
  const contributionsByMonth: Record<string, number> = {};

  events.forEach((event) => {
    const date = new Date(event.created_at);
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];

    contributionsByDay[dayName] = (contributionsByDay[dayName] || 0) + 1;
    contributionsByMonth[monthName] =
      (contributionsByMonth[monthName] || 0) + 1;
  });

  const mostProductiveDay =
    Object.entries(contributionsByDay).sort(([, a], [, b]) => b - a)[0]?.[0] ||
    "Monday";

  const mostProductiveMonth =
    Object.entries(contributionsByMonth).sort(
      ([, a], [, b]) => b - a
    )[0]?.[0] || "January";

  const longestStreak = calculateLongestStreak(events);

  return {
    mostProductiveDay,
    mostProductiveMonth,
    longestStreak,
    contributionsByDay,
    contributionsByMonth,
  };
};

// calculating longest contribution streak
const calculateLongestStreak = (events: GitHubEvent[]): number => {
  // getting unique dates sorted
  const dates = Array.from(
    new Set(events.map((event) => event.created_at.split("T")[0]))
  ).sort();

  if (dates.length === 0) return 0;

  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < dates.length; i++) {
    const prevDate = new Date(dates[i - 1]);
    const currDate = new Date(dates[i]);
    const diffDays = Math.floor(
      (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
};

// getting top repository highlights
export const getTopRepositories = (
  repos: GitHubRepository[],
  events: GitHubEvent[]
): RepoHighlight[] => {
  const highlights: RepoHighlight[] = [];

  // most starred repository
  const mostStarred = [...repos].sort(
    (a, b) => b.stargazers_count - a.stargazers_count
  )[0];
  if (mostStarred) {
    highlights.push({
      name: mostStarred.name,
      description: mostStarred.description,
      stars: mostStarred.stargazers_count,
      language: mostStarred.language,
      url: mostStarred.html_url,
      metric: "most_starred",
    });
  }

  // most active repository (by commits)
  const repoCommits: Record<string, number> = {};
  events
    .filter((event) => event.type === "PushEvent")
    .forEach((event) => {
      const repoName = event.repo.name;
      repoCommits[repoName] =
        (repoCommits[repoName] || 0) + (event.payload?.commits?.length || 0);
    });

  const mostActiveRepoName = Object.entries(repoCommits).sort(
    ([, a], [, b]) => b - a
  )[0]?.[0];
  if (mostActiveRepoName) {
    const repo = repos.find((r) => r.full_name === mostActiveRepoName);
    if (repo) {
      highlights.push({
        name: repo.name,
        description: repo.description,
        stars: repo.stargazers_count,
        language: repo.language,
        url: repo.html_url,
        metric: "most_commits",
      });
    }
  }

  return highlights;
};

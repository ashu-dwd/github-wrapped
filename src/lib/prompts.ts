// system prompt for AI-generated year summaries
export const YEAR_SUMMARY_SYSTEM_PROMPT = `You are a creative writer generating personalized GitHub Wrapped summaries. Your goal is to make developers feel excited about their year of coding.

Guidelines:
- Be fun, casual, and encouraging (like Spotify Wrapped)
- Highlight specific achievements with enthusiasm
- Use emojis sparingly but effectively (max 2-3)
- Keep it concise: 2-3 sentences maximum
- Personalize based on their actual data
- End with an motivational message for next year
- Avoid generic phrases like "great work" or "keep it up"

Tone: Friendly, energetic, and authentic - like a coding buddy celebrating their wins.`;

export const formatUserDataForAI = (data: {
  username: string;
  totalCommits: number;
  totalPRs: number;
  topLanguage: string;
  totalRepos: number;
  longestStreak: number;
  mostProductiveMonth: string;
}): string => {
  return `Generate a personalized GitHub Wrapped summary for ${data.username}:

Stats:
- Total commits: ${data.totalCommits}
- Pull requests: ${data.totalPRs}
- Top language: ${data.topLanguage}
- Repositories created: ${data.totalRepos}
- Longest streak: ${data.longestStreak} days
- Most productive month: ${data.mostProductiveMonth}

Write a 2-3 sentence summary that celebrates their year and motivates them for 2025.`;
};

import axiosInstance from "@/lib/axios";
import { generateGeminiResponse } from "@/lib/gemini";
import {
  calculateYearStats,
  getLanguageBreakdown,
  findProductivityPatterns,
  getTopRepositories,
} from "@/lib/github-stats";
import { formatUserDataForAI, YEAR_SUMMARY_SYSTEM_PROMPT } from "@/lib/prompts";
import type {
  GitHubWrappedData,
  GitHubUser,
  GitHubRepository,
  GitHubEvent,
} from "@/types/github-wrapped";
import { NextResponse } from "next/server";

const CURRENT_YEAR = new Date().getFullYear();

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  console.log("Analyzing GitHub wrapped for:", username);

  if (!username) {
    return NextResponse.json(
      { success: false, error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    // fetching user data
    const { data: userData } = await axiosInstance.get<GitHubUser>(
      `/users/${username}`
    );

    // fetching all user repositories
    const { data: allRepos } = await axiosInstance.get<GitHubRepository[]>(
      `/users/${username}/repos`,
      {
        params: {
          per_page: 100,
          sort: "updated",
        },
      }
    );

    // fetching user events (activity) - GitHub API returns max 300 events
    const events: GitHubEvent[] = [];
    let page = 1;
    const maxPages = 10; // fetch up to 1000 events (10 pages * 100 per page)

    while (page <= maxPages) {
      try {
        const { data: pageEvents } = await axiosInstance.get<GitHubEvent[]>(
          `/users/${username}/events`,
          {
            params: {
              per_page: 100,
              page,
            },
          }
        );

        if (pageEvents.length === 0) break;

        // filtering events from current year
        const yearEvents = pageEvents.filter((event) => {
          const eventYear = new Date(event.created_at).getFullYear();
          return eventYear === CURRENT_YEAR;
        });

        events.push(...yearEvents);

        // stopping if we've gone past the current year
        const oldestEventYear = new Date(
          pageEvents[pageEvents.length - 1].created_at
        ).getFullYear();
        if (oldestEventYear < CURRENT_YEAR) break;

        page++;
      } catch (error) {
        console.error(`Error fetching events page ${page}:`, error);
        break;
      }
    }

    console.log(`Fetched ${events.length} events from ${CURRENT_YEAR}`);

    // calculating statistics
    const stats = calculateYearStats(events, allRepos, CURRENT_YEAR);
    const languages = getLanguageBreakdown(allRepos);
    const productivity = findProductivityPatterns(events);
    const repositories = getTopRepositories(allRepos, events);

    // generating AI summary
    let aiSummary =
      "Your coding journey this year has been amazing! Keep building great things! 🚀";

    try {
      const aiInput = formatUserDataForAI({
        username: userData.login,
        totalCommits: stats.totalCommits,
        totalPRs: stats.totalPRs,
        topLanguage: languages[0]?.name || "code",
        totalRepos: stats.totalReposCreated,
        longestStreak: productivity.longestStreak,
        mostProductiveMonth: productivity.mostProductiveMonth,
      });

      const generatedSummary = await generateGeminiResponse(
        aiInput,
        YEAR_SUMMARY_SYSTEM_PROMPT
      );

      if (generatedSummary) {
        aiSummary = generatedSummary;
      }
    } catch (error) {
      console.error("Error generating AI summary:", error);
      // using fallback summary if AI fails
    }

    const wrappedData: GitHubWrappedData = {
      user: userData,
      stats,
      languages,
      productivity,
      repositories,
      aiSummary,
      year: CURRENT_YEAR,
    };

    return NextResponse.json(
      { success: true, data: wrappedData },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(
      "Error analyzing GitHub data:",
      error.response?.status,
      error.message
    );

    if (error.response?.status === 404) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    if (error.response?.status === 403) {
      return NextResponse.json(
        {
          success: false,
          error: "GitHub API rate limit exceeded. Please try again later.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to analyze GitHub data" },
      { status: 500 }
    );
  }
}

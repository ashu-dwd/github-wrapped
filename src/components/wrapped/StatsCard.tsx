"use client";

import { WrappedCard } from "./WrappedCard";
import { useEffect, useState } from "react";
import {
  Activity,
  GitPullRequest,
  GitCommit,
  FolderGit,
  Star,
} from "lucide-react";
import type { YearStats } from "@/types/github-wrapped";

interface StatsCardProps {
  stats: YearStats;
}

/**
 * Stats card with sharp black and white design
 */
export const StatsCard = ({ stats }: StatsCardProps) => {
  const [animatedStats, setAnimatedStats] = useState({
    commits: 0,
    prs: 0,
    issues: 0,
    repos: 0,
  });

  // animating numbers counting up
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedStats({
        commits: Math.floor(stats.totalCommits * progress),
        prs: Math.floor(stats.totalPRs * progress),
        issues: Math.floor(stats.totalIssues * progress),
        repos: Math.floor(stats.totalReposCreated * progress),
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats({
          commits: stats.totalCommits,
          prs: stats.totalPRs,
          issues: stats.totalIssues,
          repos: stats.totalReposCreated,
        });
      }
    }, interval);

    return () => clearInterval(timer);
  }, [stats]);

  const statItems = [
    {
      icon: GitCommit,
      label: "Commits",
      value: animatedStats.commits,
    },
    {
      icon: GitPullRequest,
      label: "Pull Requests",
      value: animatedStats.prs,
    },
    {
      icon: Activity,
      label: "Issues",
      value: animatedStats.issues,
    },
    {
      icon: FolderGit,
      label: "Repositories",
      value: animatedStats.repos,
    },
  ];

  return (
    <WrappedCard cardName="stats" gradientClass="gradient-stats">
      <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-8">
        <div className="text-center space-y-3 animate-fade-in border-b-4 border-black pb-6">
          <h2 className="text-5xl font-black text-black uppercase tracking-tighter">
            Stats
          </h2>
          <p className="text-black/70 text-lg font-bold uppercase tracking-wide">
            Your Year in Numbers
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
          {statItems.map((item, index) => (
            <div
              key={item.label}
              className="glass-card bg-white/10 backdrop-blur-sm border-2 border-black p-6 hover-lift animate-scale-in border-sharp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center gap-4">
                <item.icon
                  className="w-10 h-10 text-black stroke-current"
                  strokeWidth={2.5}
                />
                <div className="text-center">
                  <p className="text-5xl font-black animate-counter text-black">
                    {item.value.toLocaleString()}
                  </p>
                  <p className="text-xs font-bold text-black/70 mt-2 uppercase tracking-wider">
                    {item.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {stats.contributionDays > 0 && (
          <div className="border-2 border-black px-8 py-3 animate-slide-up border-sharp bg-black">
            <div className="flex items-center gap-3">
              <Star
                className="w-6 h-6 text-white stroke-current"
                fill="white"
              />
              <p className="text-lg font-black text-white uppercase tracking-wide">
                {stats.contributionDays} Days Active
              </p>
            </div>
          </div>
        )}
      </div>
    </WrappedCard>
  );
};

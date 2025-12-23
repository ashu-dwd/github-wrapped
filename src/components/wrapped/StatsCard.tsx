"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { useEffect, useState } from "react";
import {
  Activity,
  GitPullRequest,
  GitCommit,
  FolderGit,
  Star,
  TrendingUp,
} from "lucide-react";
import type { YearStats } from "@/types/github-wrapped";

interface StatsCardProps {
  stats: YearStats;
}

/**
 * Modern stats card with beautiful animations and colorful gradient
 */
export const StatsCard = ({ stats }: StatsCardProps) => {
  const [animatedStats, setAnimatedStats] = useState({
    commits: 0,
    prs: 0,
    issues: 0,
    repos: 0,
  });

  // Modern number counting animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);

      setAnimatedStats({
        commits: Math.floor(stats.totalCommits * easeOutQuart),
        prs: Math.floor(stats.totalPRs * easeOutQuart),
        issues: Math.floor(stats.totalIssues * easeOutQuart),
        repos: Math.floor(stats.totalReposCreated * easeOutQuart),
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
      color: "from-blue-400 to-blue-600",
    },
    {
      icon: GitPullRequest,
      label: "Pull Requests",
      value: animatedStats.prs,
      color: "from-green-400 to-green-600",
    },
    {
      icon: Activity,
      label: "Issues",
      value: animatedStats.issues,
      color: "from-purple-400 to-purple-600",
    },
    {
      icon: FolderGit,
      label: "Repositories",
      value: animatedStats.repos,
      color: "from-orange-400 to-orange-600",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <WrappedCard cardName="stats" gradientClass="gradient-stats" animationDelay={0.2}>
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center gap-8 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Modern header */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <TrendingUp className="w-6 h-6 text-white" />
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Year in Review
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
            Your amazing contribution metrics
          </p>
        </motion.div>

        {/* Stats grid with modern cards */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <motion.div
                className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-20 blur-xl`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.5,
                  ease: "easeInOut",
                }}
              />
              <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-2xl hover:bg-white/20 transition-colors">
                <div className="flex flex-col items-center gap-4">
                  <motion.div
                    className={`p-3 bg-gradient-to-br ${item.color} rounded-xl shadow-lg`}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </motion.div>
                  <div className="text-center">
                    <motion.p 
                      className="text-3xl sm:text-4xl font-bold text-white tabular-nums"
                      key={animatedStats[item.label.toLowerCase() as keyof typeof animatedStats]}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring" as const, stiffness: 200 }}
                    >
                      {item.value.toLocaleString()}
                    </motion.p>
                    <p className="text-xs font-medium text-white/70 mt-1 uppercase tracking-wider">
                      {item.label}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contribution highlight */}
        {stats.contributionDays > 0 && (
          <motion.div
            variants={itemVariants}
            className="w-full max-w-sm"
          >
            <motion.div
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl flex items-center gap-4"
              whileHover={{ scale: 1.02, x: 10 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
            >
              <motion.div
                className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Star className="w-6 h-6 text-white" fill="white" />
              </motion.div>
              <div className="flex-1">
                <p className="text-white/70 text-sm font-medium uppercase tracking-wider">
                  Active Days
                </p>
                <p className="text-2xl font-bold text-white">
                  {stats.contributionDays} days
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </WrappedCard>
  );
};

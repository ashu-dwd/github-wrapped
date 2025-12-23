"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Star, GitFork, Trophy, Sparkles } from "lucide-react";
import type { RepoHighlight } from "@/types/github-wrapped";

interface RepositoriesCardProps {
  repositories: RepoHighlight[];
}

/**
 * Amazing repositories card with beautiful animations and stats
 */
export const RepositoriesCard = ({ repositories }: RepositoriesCardProps) => {
  // Take top repositories
  const topRepos = repositories.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "most_starred":
        return Star;
      case "most_forks":
        return GitFork;
      default:
        return Trophy;
    }
  };

  const getMetricColor = (metric: string) => {
    switch (metric) {
      case "most_starred":
        return "from-yellow-400 to-orange-500";
      case "most_forks":
        return "from-blue-400 to-cyan-500";
      default:
        return "from-purple-400 to-pink-500";
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <WrappedCard cardName="repositories" gradientClass="gradient-repositories" animationDelay={1.2}>
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center gap-6 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Modern header */}
        <motion.div variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }} className="text-center space-y-3">
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Trophy className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">
              Top Repositories
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
            Your most impactful projects
          </p>
        </motion.div>

        {/* Repository cards grid */}
        <div className="w-full max-w-lg space-y-3">
          {topRepos.map((repo, index) => {
            const Icon = getMetricIcon(repo.metric);
            return (
              <motion.div
                key={repo.name}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  x: 10,
                  transition: { type: "spring" as const, stiffness: 400 }
                }}
                className="relative"
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl hover:bg-white/20 transition-all duration-300"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <div className="flex items-center justify-between">
                    {/* Repository info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <motion.div
                          className={`p-2 bg-gradient-to-br ${getMetricColor(repo.metric)} rounded-lg shadow-lg`}
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="w-4 h-4 text-white" strokeWidth={2} />
                        </motion.div>
                        <h3 className="font-bold text-white truncate">
                          {repo.name}
                        </h3>
                      </div>
                      {repo.description && (
                        <p className="text-white/70 text-sm line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 mt-2">
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <Star className="w-3 h-3" />
                          <span>{formatNumber(repo.stars)}</span>
                        </div>
                        {repo.language && (
                          <div className="flex items-center gap-1">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            <span className="text-white/60 text-xs">{repo.language}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  {index === 0 && (
                    <motion.div
                      className="absolute -top-2 -right-2"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-full">
                        <Trophy className="w-4 h-4 text-white" />
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Achievement section */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.8 } }
          }}
          className="w-full max-w-sm"
        >
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
              <div className="text-center">
                <p className="text-white font-bold">
                  {repositories.length} repositories created
                </p>
                <p className="text-white/70 text-sm">
                  Building amazing things!
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};
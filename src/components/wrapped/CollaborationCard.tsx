"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Users, GitPullRequest, MessageSquare, Heart, Zap } from "lucide-react";
import type { YearStats } from "@/types/github-wrapped";

interface CollaborationCardProps {
  stats: YearStats;
}

/**
 * Amazing collaboration card with beautiful animations and network effects
 */
export const CollaborationCard = ({ stats }: CollaborationCardProps) => {
  const collaborationMetrics = [
    {
      icon: GitPullRequest,
      label: "Pull Requests",
      value: stats.totalPRs,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      description: "Merged and created"
    },
    {
      icon: MessageSquare,
      label: "Issues",
      value: stats.totalIssues,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/10",
      description: "Opened and discussed"
    },
    {
      icon: Heart,
      label: "Community Impact",
      value: Math.round(stats.totalStars * 1.5),
      color: "from-pink-400 to-red-500",
      bgColor: "bg-pink-500/10",
      description: "Stars and reactions"
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <WrappedCard cardName="collaboration" gradientClass="gradient-collaboration" animationDelay={1.4}>
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center gap-8 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Modern header */}
        <motion.div variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }} className="text-center space-y-4">
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Users className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">
              Collaboration
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
            Working together makes it better
          </p>
        </motion.div>

        {/* Collaboration metrics */}
        <div className="w-full max-w-lg space-y-4">
          {collaborationMetrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03, 
                  x: 10,
                  transition: { type: "spring" as const, stiffness: 400 }
                }}
              >
                <div className={`${metric.bgColor} backdrop-blur-sm border border-white/20 p-5 rounded-2xl hover:bg-opacity-20 transition-all duration-300`}>
                  <div className="flex items-center gap-4">
                    {/* Animated icon */}
                    <motion.div
                      className={`p-3 bg-gradient-to-br ${metric.color} rounded-xl shadow-lg`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        scale: 1.1,
                      }}
                      transition={{ duration: 0.6, rotate: { duration: 2, repeat: Infinity } }}
                    >
                      <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                    </motion.div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
                        {metric.label}
                      </p>
                      <div className="flex items-center gap-3">
                        <motion.p 
                          className="text-3xl font-bold text-white tabular-nums"
                          key={metric.value}
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: "spring" as const, stiffness: 200 }}
                        >
                          {formatNumber(metric.value)}
                        </motion.p>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                        >
                          <Zap className="w-4 h-4 text-yellow-400" />
                        </motion.div>
                      </div>
                      <p className="text-white/60 text-xs mt-1">
                        {metric.description}
                      </p>
                    </div>
                  </div>

                  {/* Animated background pattern */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl opacity-5"
                    style={{
                      backgroundImage: `radial-gradient(circle at 25% 25%, white 0%, transparent 50%)`,
                    }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Team player badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 1 } }
          }}
          whileHover={{ scale: 1.05 }}
          className="w-full max-w-sm"
        >
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-500 p-1 rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Users className="w-5 h-5 text-white" />
              </motion.div>
              <div className="text-center">
                <span className="text-white font-bold text-sm">
                  Team Player
                </span>
                <p className="text-white/70 text-xs">
                  Open source champion
                </p>
              </div>
              <motion.div
                animate={{ rotate: [0, -360] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                <Users className="w-5 h-5 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Floating network animation */}
        <motion.div
          className="absolute top-10 right-10 opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <div className="relative w-20 h-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-white rounded-full"
                style={{
                  top: `${50 + 30 * Math.cos(i * 60 * Math.PI / 180)}%`,
                  left: `${50 + 30 * Math.sin(i * 60 * Math.PI / 180)}%`,
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};
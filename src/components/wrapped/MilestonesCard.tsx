"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Target, Flag, Trophy, Calendar, Zap } from "lucide-react";
import type { GitHubUser } from "@/types/github-wrapped";

interface MilestonesCardProps {
  user: GitHubUser;
}

/**
 * Amazing milestones card with beautiful animations and achievements
 */
export const MilestonesCard = ({ user }: MilestonesCardProps) => {
  // Generate realistic milestones based on user data
  const generateMilestones = () => {
    const milestones = [];
    const followerMilestone = Math.floor(user.followers / 100) * 100;
    const repoMilestone = Math.floor(user.public_repos / 10) * 10;
    const yearsActive = Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365));
    
    if (followerMilestone > 0) {
      milestones.push({
        icon: Trophy,
        title: `${followerMilestone}+ Followers`,
        description: "Growing community",
        color: "from-yellow-400 to-orange-500",
        achieved: true
      });
    }
    
    if (repoMilestone > 0) {
      milestones.push({
        icon: Flag,
        title: `${repoMilestone}+ Repositories`,
        description: "Prolific creator",
        color: "from-blue-400 to-cyan-500",
        achieved: true
      });
    }
    
    milestones.push({
      icon: Calendar,
      title: `${yearsActive}+ Years on GitHub`,
      description: "Dedicated developer",
      color: "from-purple-400 to-pink-500",
      achieved: true
    });
    
    milestones.push({
      icon: Target,
      title: "Goal Crusher",
      description: "Achieving milestones",
      color: "from-green-400 to-emerald-500",
      achieved: true
    });
    
    return milestones;
  };

  const milestones = generateMilestones();

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
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <WrappedCard cardName="milestones" gradientClass="gradient-milestones" animationDelay={1.6}>
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
        }} className="text-center space-y-4">
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Target className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">
              Milestones
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
            Your incredible achievements
          </p>
        </motion.div>

        {/* Milestones grid */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={milestone.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.05, 
                  rotate: 5,
                  transition: { type: "spring" as const, stiffness: 400 }
                }}
              >
                <motion.div
                  className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl hover:bg-white/20 transition-all duration-300 h-full flex flex-col items-center justify-center text-center"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                >
                  <motion.div
                    className={`p-3 bg-gradient-to-br ${milestone.color} rounded-xl shadow-lg mb-3`}
                    whileHover={{ 
                      rotate: [0, 360],
                      scale: 1.1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </motion.div>
                  
                  <motion.h3 
                    className="font-bold text-white text-sm mb-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    {milestone.title}
                  </motion.h3>
                  
                  <motion.p 
                    className="text-white/60 text-xs"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {milestone.description}
                  </motion.p>

                  {/* Achievement badge */}
                  {milestone.achieved && (
                    <motion.div
                      className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-3 h-3 text-white" />
                      </motion.div>
                    </motion.div>
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Completion message */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 1 } }
          }}
          className="w-full max-w-sm"
        >
          <motion.div
            className="bg-gradient-to-r from-indigo-500 to-purple-500 p-1 rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-center">
                <span className="text-white font-bold text-sm">
                  {milestones.length} Achievements Unlocked
                </span>
                <p className="text-white/70 text-xs">
                  Keep reaching for the stars!
                </p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <Trophy className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Decorative confetti */}
        <motion.div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/40 rounded-full"
              initial={{
                x: Math.random() * 100,
                y: Math.random() * 100,
              }}
              animate={{
                y: [null, Math.random() * 100 + 50],
                x: [null, Math.random() * 100 - 50],
                opacity: [0.8, 0],
                scale: [1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 3,
                ease: "easeOut",
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};
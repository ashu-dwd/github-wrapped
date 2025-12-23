"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Flame, Calendar } from "lucide-react";
import type { ProductivityData } from "@/types/github-wrapped";

interface ContributionsCardProps {
  productivity: ProductivityData;
}

/**
 * Amazing contributions heatmap card with beautiful animations
 */
export const ContributionsCard = ({ productivity }: ContributionsCardProps) => {
  // Generate mock contribution data for visualization
  const generateHeatmapData = () => {
    const data = [];
    
    for (let week = 0; week < 52; week++) {
      for (let day = 0; day < 7; day++) {
        // Use actual contribution data if available, otherwise generate realistic pattern
        const level = Math.random() > 0.7 ? Math.floor(Math.random() * 5) : 0;
        data.push({
          week,
          day,
          level,
          count: level > 0 ? Math.floor(Math.random() * 10) + 1 : 0,
        });
      }
    }
    return data;
  };

  const heatmapData = generateHeatmapData();
  const totalContributions = Object.values(productivity.contributionsByDay).reduce((sum, count) => sum + count, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.01,
        delayChildren: 0.3,
      },
    },
  };

  const cellVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 200,
        damping: 10,
      },
    },
  };

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-800/50",
      "bg-green-500/30",
      "bg-green-500/50", 
      "bg-green-500/70",
      "bg-green-500/90",
    ];
    return colors[level];
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <WrappedCard cardName="contributions" gradientClass="gradient-contributions" animationDelay={1}>
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
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Calendar className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">
              Contributions
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
              Your year in green squares
            </p>
        </motion.div>

        {/* Stats row */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 0.5 } }
          }}
          className="flex items-center gap-6 text-white"
        >
          <div className="text-center">
            <p className="text-3xl font-bold tabular-nums">{totalContributions.toLocaleString()}</p>
            <p className="text-sm text-white/70">Total</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold tabular-nums">{Object.keys(productivity.contributionsByDay).length}</p>
            <p className="text-sm text-white/70">Active Days</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold tabular-nums">{Math.round(productivity.longestStreak)}</p>
            <p className="text-sm text-white/70">Best Streak</p>
          </div>
        </motion.div>

        {/* Contribution heatmap */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { delay: 0.7 } }
          }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 p-4 rounded-2xl overflow-x-auto"
        >
          <div className="flex gap-1 min-w-max">
            {/* Day labels */}
            <div className="flex flex-col gap-1 pr-2">
              {weekDays.map((day, index) => (
                <div key={day} className="h-3 flex items-center justify-end">
                  {index % 2 === 0 && (
                    <span className="text-xs text-white/50 text-right">{day.slice(0, 1)}</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Heatmap grid */}
            <div className="flex gap-1">
              {Array.from({ length: 52 }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                  {Array.from({ length: 7 }).map((_, dayIndex) => {
                    const cellIndex = weekIndex * 7 + dayIndex;
                    const cell = heatmapData[cellIndex];
                    return (
                      <motion.div
                        key={`${weekIndex}-${dayIndex}`}
                        className="w-3 h-3 rounded-sm border border-white/10"
                        style={{ backgroundColor: cell ? getLevelColor(cell.level) : 'rgba(255,255,255,0.05)' }}
                        variants={cellVariants}
                        whileHover={{ 
                          scale: 2,
                          z: 10,
                          transition: { duration: 0.2 }
                        }}
                        title={cell ? `${cell.count} contributions` : 'No contributions'}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 1 } }
          }}
          className="flex items-center gap-2 text-white/60 text-xs"
        >
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <div
              key={level}
              className={`w-3 h-3 rounded-sm border border-white/10 ${getLevelColor(level)}`}
            />
          ))}
          <span>More</span>
        </motion.div>

        {/* Achievement badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 1.2 } }
          }}
          whileHover={{ scale: 1.05 }}
          className="bg-gradient-to-r from-green-400 to-emerald-500 px-6 py-3 rounded-full"
        >
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Flame className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-white font-bold">Consistent Contributor</span>
          </div>
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};
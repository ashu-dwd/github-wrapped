"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Calendar, TrendingUp, Flame, Clock, Zap } from "lucide-react";
import type { ProductivityData } from "@/types/github-wrapped";

interface ProductivityCardProps {
  productivity: ProductivityData;
}

/**
 * Modern productivity card with beautiful animations and colorful gradient
 */
export const ProductivityCard = ({ productivity }: ProductivityCardProps) => {
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
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const productivityItems = [
    {
      icon: Calendar,
      label: "Peak Day",
      value: productivity.mostProductiveDay,
      color: "from-blue-400 to-cyan-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-400/30",
    },
    {
      icon: TrendingUp,
      label: "Peak Month",
      value: productivity.mostProductiveMonth,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-400/30",
    },
    ...(productivity.longestStreak > 0 ? [{
      icon: Flame,
      label: "Longest Streak",
      value: `${productivity.longestStreak} Days`,
      color: "from-orange-400 to-red-500",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-400/30",
    }] : []),
  ];

  return (
    <WrappedCard cardName="productivity" gradientClass="gradient-productivity" animationDelay={0.6}>
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
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Clock className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Productivity
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
            Your coding rhythm and patterns
          </p>
        </motion.div>

        {/* Productivity items */}
        <div className="w-full max-w-lg space-y-4">
          {productivityItems.map((item, index) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                x: 10,
                transition: { type: "spring" as const, stiffness: 400 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`${item.bgColor} backdrop-blur-sm border ${item.borderColor} p-5 rounded-2xl hover:bg-opacity-20 transition-all duration-300`}>
                <div className="flex items-center gap-4">
                  {/* Animated icon */}
                  <motion.div
                    className={`p-3 bg-gradient-to-br ${item.color} rounded-xl shadow-lg`}
                    whileHover={{ 
                      rotate: index === 2 ? [0, 360] : [0, -10, 10, 0],
                      scale: 1.1,
                    }}
                    transition={{ 
                      duration: 0.6,
                      rotate: { duration: index === 2 ? 0.6 : 2, repeat: index === 2 ? 0 : Infinity },
                    }}
                  >
                    <item.icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </motion.div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <p className="text-white/70 text-sm font-medium uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    <motion.p 
                      className="text-2xl sm:text-3xl font-bold text-white"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    >
                      {item.value}
                    </motion.p>
                  </div>

                  {/* Decorative elements */}
                  {index === 2 && (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="w-5 h-5 text-yellow-400" />
                    </motion.div>
                  )}
                </div>

                {/* Animated background pattern */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-10"
                  style={{
                    background: `repeating-linear-gradient(
                      45deg,
                      transparent,
                      transparent 10px,
                      rgba(255, 255, 255, 0.1) 10px,
                      rgba(255, 255, 255, 0.1) 20px
                    )`,
                  }}
                  animate={{ x: [0, 20, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement badge */}
        <motion.div
          variants={itemVariants}
          className="mt-4"
        >
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-pink-500 p-1 rounded-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="bg-black/20 backdrop-blur-sm p-3 rounded-2xl flex items-center justify-center gap-2">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-white font-semibold text-sm">
                Peak Performance Mode
              </span>
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};

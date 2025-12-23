"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Code2, Trophy, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import type { LanguageBreakdown } from "@/types/github-wrapped";

interface LanguagesCardProps {
  languages: LanguageBreakdown[];
}

/**
 * Modern languages card with beautiful animations and colorful gradients
 */
export const LanguagesCard = ({ languages }: LanguagesCardProps) => {
  const [animatedWidths, setAnimatedWidths] = useState<number[]>([]);
  const topLanguages = languages.slice(0, 5);

  useEffect(() => {
    // Animate progress bars after component mounts
    const timer = setTimeout(() => {
      setAnimatedWidths(topLanguages.map(lang => lang.percentage));
    }, 500);
    return () => clearTimeout(timer);
  }, [topLanguages]);

  const languageColors = [
    "from-blue-400 to-cyan-500",
    "from-green-400 to-emerald-500",
    "from-purple-400 to-pink-500",
    "from-orange-400 to-red-500",
    "from-yellow-400 to-amber-500",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
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

  return (
    <WrappedCard cardName="languages" gradientClass="gradient-languages" animationDelay={0.4}>
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
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Code2 className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              Top Languages
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
            Your most used programming languages
          </p>
        </motion.div>

        {/* Language bars with modern design */}
        <div className="w-full max-w-lg space-y-4">
          {topLanguages.map((lang, index) => (
            <motion.div
              key={lang.name}
              variants={itemVariants}
              className="relative"
              whileHover={{ x: 10 }}
              transition={{ type: "spring" as const, stiffness: 300 }}
            >
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl hover:bg-white/20 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-4 h-4 rounded-full bg-gradient-to-br ${languageColors[index]}`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="font-bold text-white text-lg">
                      {lang.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.span 
                      className="text-2xl font-bold text-white tabular-nums"
                      key={animatedWidths[index]}
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ type: "spring" as const, stiffness: 200 }}
                    >
                      {lang.percentage}%
                    </motion.span>
                    {index === 0 && (
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                      >
                        <Trophy className="w-5 h-5 text-yellow-400" />
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Modern progress bar */}
                <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute top-0 left-0 h-full bg-gradient-to-r ${languageColors[index]} rounded-full shadow-lg`}
                    initial={{ width: 0 }}
                    animate={{ width: `${animatedWidths[index] || 0}%` }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.1,
                      type: "spring" as const,
                      stiffness: 50,
                      damping: 10,
                    }}
                  />
                  {/* Animated shine effect */}
                  <motion.div
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{ x: [-100, 200] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5,
                      ease: "easeInOut",
                    }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Top language highlight */}
        {topLanguages.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="w-full max-w-sm"
          >
            <motion.div
              className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1 rounded-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3">
                <Zap className="w-6 h-6 text-white" />
                <p className="text-white font-bold text-lg">
                  #1 {topLanguages[0].name}
                </p>
                <Zap className="w-6 h-6 text-white" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </WrappedCard>
  );
};

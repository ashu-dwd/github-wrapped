"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Sparkles, Brain, Lightbulb } from "lucide-react";
import { useEffect, useState } from "react";

interface AISummaryCardProps {
  summary: string;
  year: number;
}

/**
 * Modern AI summary card with beautiful animations and colorful gradient
 */
export const AISummaryCard = ({ summary, year }: AISummaryCardProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // Modern typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 30;

    const timer = setInterval(() => {
      if (currentIndex < summary.length) {
        setDisplayedText(summary.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [summary]);

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
    hidden: { opacity: 0, y: 20 },
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

  return (
    <WrappedCard
      cardName="ai-summary"
      gradientClass="gradient-ai"
      animationDelay={0.8}
    >
      <motion.div
        className="w-auto h-auto flex flex-col items-center justify-center gap-8 "
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Modern header with animated icons */}
        <motion.div variants={itemVariants} className="text-center space-y-4">
          <motion.div
            className="inline-flex items-center gap-1 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              {year} Story
            </h2>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
          </motion.div>
          <div className="flex items-center justify-center gap-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-5 h-5 text-white/80" />
            </motion.div>
            <p className="text-white/80 text-lg font-medium">
              AI-powered insights
            </p>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              <Brain className="w-5 h-5 text-white/80" />
            </motion.div>
          </div>
        </motion.div>

        {/* AI summary text with modern design */}
        <motion.div variants={itemVariants} className="w-full max-w-lg">
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 sm:p-6 rounded-2xl relative overflow-y-auto max-h-[18vh] min-h-[64px]"
            whileHover={{ scale: 1.02 }}
          >
            {/* Floating decorative elements */}
            <motion.div
              className="absolute top-4 left-4 opacity-20"
              animate={{
                y: [0, -10, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Lightbulb className="w-6 h-6 text-white" />
            </motion.div>

            <motion.div
              className="absolute top-4 right-4 opacity-20"
              animate={{
                y: [0, -10, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 3,
              }}
            >
              <Lightbulb className="w-6 h-6 text-white" />
            </motion.div>

            {/* Summary text */}
            <p className="text-lg sm:text-xl leading-relaxed text-center font-medium text-white relative z-10 break-words whitespace-pre-line overflow-x-hidden">
              {displayedText}
              {isTyping && (
                <motion.span
                  className="inline-block w-1 h-5 bg-gradient-to-b from-white to-transparent ml-1 rounded-full"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </p>

            {/* Animated background pattern */}
            <motion.div
              className="absolute inset-0 opacity-5 rounded-2xl"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 20px,
                  rgba(255, 255, 255, 0.1) 20px,
                  rgba(255, 255, 255, 0.1) 40px
                )`,
              }}
              animate={{ x: [0, 40, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </motion.div>
        </motion.div>

        {/* AI Generated badge */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 px-6 py-3 rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-white font-bold text-sm uppercase tracking-wider">
              AI Generated
            </span>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Completion indicator */}
        {!isTyping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 text-green-400"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-2 h-2 bg-green-400 rounded-full" />
              <span className="text-sm font-medium">Analysis Complete</span>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </WrappedCard>
  );
};

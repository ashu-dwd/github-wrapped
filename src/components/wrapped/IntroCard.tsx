"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles, Trophy, Star } from "lucide-react";
import type { GitHubUser } from "@/types/github-wrapped";

interface IntroCardProps {
  user: GitHubUser;
  year: number;
}

/**
 * Modern opening card with beautiful animations and colorful gradient
 */
export const IntroCard = ({ user, year }: IntroCardProps) => {
  const cardVariants = {
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
    <WrappedCard cardName="intro" gradientClass="gradient-intro" animationDelay={0}>
      <motion.div
        className="flex flex-col items-center justify-center gap-8 h-full relative"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Floating decorative elements */}
        <motion.div
          className="absolute top-8 left-8"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Star className="w-6 h-6 text-white/60" />
        </motion.div>
        
        <motion.div
          className="absolute top-8 right-8"
          animate={{
            rotate: [0, -360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Trophy className="w-6 h-6 text-white/60" />
        </motion.div>

        {/* Avatar with modern animation */}
        <motion.div variants={itemVariants} className="relative">
          <motion.div
            className="absolute -inset-2 bg-white/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <Avatar className="w-32 h-32 sm:w-40 sm:h-40 border-4 border-white shadow-2xl rounded-full relative">
            <AvatarImage 
              src={user.avatar_url} 
              alt={user.name || user.login}
              className="object-cover"
            />
            <AvatarFallback className="text-4xl sm:text-5xl bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
              {user.login.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        {/* User info with staggered animation */}
        <motion.div variants={itemVariants} className="text-center space-y-4 max-w-md">
          <motion.h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring" as const, stiffness: 100 }}
          >
            {user.name || user.login}
          </motion.h1>

          {user.name && user.login !== user.name && (
            <motion.p 
              className="text-lg sm:text-xl text-white/80 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              @{user.login}
            </motion.p>
          )}
        </motion.div>

        {/* Year and title with modern design */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.div
            className="bg-white/10 backdrop-blur-sm border-2 border-white/20 px-8 py-4 rounded-full"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
            transition={{ type: "spring" as const, stiffness: 300 }}
          >
            <p className="text-3xl sm:text-4xl font-bold text-white">
              {year}
            </p>
          </motion.div>
          
          <motion.div
            className="flex items-center justify-center gap-3"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, type: "spring" as const }}
          >
            <Sparkles className="w-6 h-6 text-white" />
            <p className="text-xl sm:text-2xl font-bold text-white uppercase tracking-wider">
              GitHub Wrapped
            </p>
            <Sparkles className="w-6 h-6 text-white" />
          </motion.div>
        </motion.div>

        {/* Swipe hint with modern animation */}
        <motion.div
          variants={itemVariants}
          className="absolute bottom-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <p className="text-white text-sm font-medium">Swipe to explore</p>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.div>
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};

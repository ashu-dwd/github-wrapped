"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { Button } from "@/components/ui/button";
import { Share2, Download, Heart, Trophy, Sparkles } from "lucide-react";
import { useState } from "react";

interface ShareCardProps {
  username: string;
  year: number;
  onDownloadAll: () => void;
}

/**
 * Modern share card with beautiful animations and colorful gradient
 */
export const ShareCard = ({
  username,
  year,
  onDownloadAll,
}: ShareCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      await onDownloadAll();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const url = window.location.href;
      const text = `Check out my GitHub Wrapped ${year}! 🎉\n\n${url}`;

      if (navigator.share) {
        await navigator.share({
          title: `My GitHub Wrapped ${year}`,
          text,
          url,
        });
      } else {
        await navigator.clipboard.writeText(text);
        // Show success feedback
        const button = document.getElementById('share-button');
        if (button) {
          button.textContent = 'Copied!';
          setTimeout(() => {
            button.textContent = 'Share';
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Share failed:", error);
    } finally {
      setTimeout(() => setIsSharing(false), 1000);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
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

  return (
    <WrappedCard cardName="share" gradientClass="gradient-share" showDownload={false} animationDelay={1}>
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center gap-8 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Celebratory header */}
        <motion.div variants={itemVariants} className="text-center space-y-6">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              className="absolute -inset-4 bg-yellow-400/20 rounded-full blur-xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <div className="relative bg-white/10 backdrop-blur-sm px-8 py-4 rounded-2xl border border-white/20">
              <motion.h2 
                className="text-4xl sm:text-5xl font-bold text-white"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 That&apos;s a Wrap! 🎉
              </motion.h2>
              <p className="text-white/80 text-xl font-medium mt-2">
                {year} Complete
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* User info */}
        <motion.div variants={itemVariants}>
          <motion.div
            className="bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full"
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <p className="text-white text-lg font-medium">
              @{username}
            </p>
          </motion.div>
        </motion.div>

        {/* Achievement badges */}
        <motion.div variants={itemVariants} className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg">
              <Trophy className="w-6 h-6 text-white" />
            </div>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-3 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl shadow-lg">
              <Heart className="w-6 h-6 text-white" fill="white" />
            </div>
          </motion.div>
          <motion.div
            whileHover={{ rotate: -360, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-3 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-xl shadow-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </motion.div>
        </motion.div>

        {/* Action buttons */}
        <motion.div variants={itemVariants} className="space-y-4 w-full max-w-sm">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              id="share-button"
              onClick={handleShare}
              disabled={isSharing}
              size="lg"
              className="w-full h-14 text-lg bg-white text-black hover:bg-gray-100 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
            >
              {isSharing ? (
                <motion.div
                  className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Share2 className="w-5 h-5" strokeWidth={2} />
              )}
              {isSharing ? 'Sharing...' : 'Share Your Wrap'}
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleDownloadAll}
              disabled={isDownloading}
              size="lg"
              variant="outline"
              className="w-full h-14 text-lg border-2 border-white text-white hover:bg-white hover:text-black font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3"
            >
              {isDownloading ? (
                <motion.div
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <Download className="w-5 h-5" strokeWidth={2} />
              )}
              {isDownloading ? 'Downloading...' : 'Download All Cards'}
            </Button>
          </motion.div>
        </motion.div>

        {/* Footer message */}
        <motion.div variants={itemVariants} className="text-center">
          <motion.p
            className="text-white/60 text-sm"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Thanks for being an amazing part of the GitHub community! 🚀
          </motion.p>
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};

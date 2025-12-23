"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { downloadCard } from "@/lib/card-export";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WrappedCardProps {
  children: React.ReactNode;
  gradientClass?: string;
  cardName: string;
  showDownload?: boolean;
  className?: string;
  animationDelay?: number;
}

/**
 * Modern base wrapper component for all wrapped cards
 * Provides consistent sizing, gradient backgrounds, animations, and download functionality
 */
export const WrappedCard = ({
  children,
  gradientClass = "gradient-intro",
  cardName,
  showDownload = true,
  className,
  animationDelay = 0,
}: WrappedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsDownloading(true);
    try {
      await downloadCard(cardRef.current, cardName);
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: -15,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        delay: animationDelay,
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      scale: 1.02,
      rotateY: 5,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 300,
        damping: 20,
      },
    },
  };

  const downloadButtonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        type: "spring" as const,
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      rotate: 15,
      transition: {
        duration: 0.2,
        type: "spring" as const,
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <div className="relative group w-full h-full flex items-center justify-center">
      <motion.div
        ref={cardRef}
        className={cn(
          "wrapped-card",
          gradientClass,
          "flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 text-white shadow-2xl border border-white/20",
          className
        )}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated sparkles effect */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Sparkles className="w-4 h-4 text-white/80" />
              </motion.div>
            ))}
          </motion.div>
        )}

        {children}
      </motion.div>

      {showDownload && (
        <motion.div
          className="absolute top-4 right-4"
          variants={downloadButtonVariants}
          initial="hidden"
          animate={isHovered ? "visible" : "hidden"}
          whileHover="hover"
        >
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            size="icon"
            variant="secondary"
            className={cn(
              "bg-white/90 backdrop-blur-sm text-black hover:bg-white border-2 border-white/20 shadow-lg",
              "transition-all duration-200",
              isDownloading && "animate-spin"
            )}
          >
            {isDownloading ? (
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
            ) : (
              <Download className="w-5 h-5 stroke-current" strokeWidth={2.5} />
            )}
          </Button>
        </motion.div>
      )}
    </div>
  );
};

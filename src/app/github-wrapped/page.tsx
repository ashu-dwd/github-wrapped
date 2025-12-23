"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { IntroCard } from "@/components/wrapped/IntroCard";
import { StatsCard } from "@/components/wrapped/StatsCard";
import { LanguagesCard } from "@/components/wrapped/LanguagesCard";
import { ProductivityCard } from "@/components/wrapped/ProductivityCard";
import { AISummaryCard } from "@/components/wrapped/AISummaryCard";
import { ShareCard } from "@/components/wrapped/ShareCard";
import { ContributionsCard } from "@/components/wrapped/ContributionsCard";
import { RepositoriesCard } from "@/components/wrapped/RepositoriesCard";
import { CollaborationCard } from "@/components/wrapped/CollaborationCard";
import { MilestonesCard } from "@/components/wrapped/MilestonesCard";
import { GrowthCard } from "@/components/wrapped/GrowthCard";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Sparkles,
  ArrowUp,
} from "lucide-react";
import { downloadAllCards } from "@/lib/card-export";
import { toast } from "sonner";
import type {
  GitHubWrappedData,
  WrappedAPIResponse,
} from "@/types/github-wrapped";

const WrappedPage = () => {
  const [wrappedData, setWrappedData] = useState<GitHubWrappedData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const searchParams = useSearchParams();
  const router = useRouter();
  const username = searchParams.get("u");

  useEffect(() => {
    const fetchWrappedData = async () => {
      if (!username) {
        setError("No username provided");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `/api/github/analyze?username=${username}`
        );
        const result: WrappedAPIResponse = await response.json();

        if (!result.success || !result.data) {
          setError(result.error || "Failed to load data");
          setIsLoading(false);
          return;
        }

        setWrappedData(result.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching wrapped data:", err);
        setError("Failed to fetch data. Please try again.");
        setIsLoading(false);
      }
    };

    fetchWrappedData();
  }, [username]);

  const handleDownloadAll = async () => {
    const elements = cardRefs.current.filter(
      (ref) => ref !== null
    ) as HTMLElement[];

    if (elements.length === 0) {
      toast.error("No cards available to download");
      return;
    }

    try {
      toast.loading(`Downloading ${elements.length} cards...`, {
        id: "download-all",
      });

      await downloadAllCards(elements);

      toast.success(`Successfully downloaded all ${elements.length} cards!`, {
        id: "download-all",
      });
    } catch (error) {
      console.error("Download failed:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Failed to download cards";

      toast.error(errorMessage, {
        id: "download-all",
        description: "Please try again or download cards individually",
      });
    }
  };

  const totalCards = wrappedData ? 11 : 0; // Updated to include new cards

  const handlePrevious = () => {
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) => Math.min(totalCards - 1, prev + 1));
  };

  const handleCardClick = (index: number) => {
    setCurrentCardIndex(index);
  };

  // keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") router.push("/");
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalCards]);

  // touch swipe support with better gesture handling
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = () => {
    const deltaX = touchStartX.current - touchEndX.current;
    const deltaY = touchStartY.current - touchEndY.current;

    // Only handle horizontal swipes
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        handleNext(); // swipe left
      } else {
        handlePrevious(); // swipe right
      }
    }
  };

  // Scroll to top functionality
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <motion.div
          className="text-center space-y-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, type: "spring" }}
        >
          <motion.div
            className="relative w-24 h-24 mx-auto"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-white/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full" />
            <motion.div
              className="absolute inset-2 flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-4xl font-bold text-white uppercase tracking-wider">
              Loading
            </h1>
            <p className="text-white/70 text-lg font-medium">
              Analyzing your GitHub year...
            </p>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  if (error || !wrappedData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <motion.div
          className="text-center space-y-8 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-4xl">⚠️</span>
          </motion.div>

          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-white uppercase tracking-tight">
              Oops!
            </h2>
            <p className="text-white/80 text-lg font-medium">
              {error || "Something went wrong while fetching your data"}
            </p>
          </div>

          {/* <Button
            onClick={() => router.push("/")}
            className="bg-white text-black hover:bg-gray-200 font-semibold px-8 py-3 rounded-xl transition-all duration-200 transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button> */}
        </motion.div>
      </div>
    );
  }

  const cards = [
    <div
      key="intro"
      ref={(el) => {
        cardRefs.current[0] = el;
      }}
    >
      <IntroCard user={wrappedData.user} year={wrappedData.year} />
    </div>,
    <div
      key="stats"
      ref={(el) => {
        cardRefs.current[1] = el;
      }}
    >
      <StatsCard stats={wrappedData.stats} />
    </div>,
    <div
      key="languages"
      ref={(el) => {
        cardRefs.current[2] = el;
      }}
    >
      <LanguagesCard languages={wrappedData.languages} />
    </div>,
    <div
      key="productivity"
      ref={(el) => {
        cardRefs.current[3] = el;
      }}
    >
      <ProductivityCard productivity={wrappedData.productivity} />
    </div>,
    <div
      key="ai-summary"
      ref={(el) => {
        cardRefs.current[4] = el;
      }}
    >
      <AISummaryCard summary={wrappedData.aiSummary} year={wrappedData.year} />
    </div>,
    <div
      key="contributions"
      ref={(el) => {
        cardRefs.current[5] = el;
      }}
    >
      <ContributionsCard productivity={wrappedData.productivity} />
    </div>,
    <div
      key="repositories"
      ref={(el) => {
        cardRefs.current[6] = el;
      }}
    >
      <RepositoriesCard repositories={wrappedData.repositories} />
    </div>,
    <div
      key="collaboration"
      ref={(el) => {
        cardRefs.current[7] = el;
      }}
    >
      <CollaborationCard stats={wrappedData.stats} />
    </div>,
    <div
      key="milestones"
      ref={(el) => {
        cardRefs.current[8] = el;
      }}
    >
      <MilestonesCard user={wrappedData.user} />
    </div>,
    <div
      key="growth"
      ref={(el) => {
        cardRefs.current[9] = el;
      }}
    >
      <GrowthCard stats={wrappedData.stats} />
    </div>,
    <div
      key="share"
      ref={(el) => {
        cardRefs.current[10] = el;
      }}
    >
      <ShareCard
        username={wrappedData.user.login}
        year={wrappedData.year}
        onDownloadAll={handleDownloadAll}
      />
    </div>,
  ];

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center p-4 relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Modern animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4">
        {/* Card display with modern animations */}
        <div className="flex items-center justify-center mb-8 w-full h-[60vh] sm:h-[65vh] md:h-[70vh] lg:h-[75vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCardIndex}
              className="w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 0.9 }}
              exit={{ opacity: 0, x: -300, scale: 0.8 }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                {cards[currentCardIndex]}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Modern navigation controls */}
        <div className="flex items-center justify-center gap-8 mb-8">
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handlePrevious}
              disabled={currentCardIndex === 0}
              size="icon"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 disabled:opacity-30 w-14 h-14 rounded-full transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </motion.div>

          {/* Modern progress indicators */}
          <div className="flex gap-3 items-center">
            {Array.from({ length: totalCards }).map((_, index) => (
              <motion.button
                key={index}
                onClick={() => handleCardClick(index)}
                className={`progress-dot ${
                  index === currentCardIndex ? "active" : ""
                }`}
                aria-label={`Go to card ${index + 1}`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleNext}
              disabled={currentCardIndex === totalCards - 1}
              size="icon"
              className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 disabled:opacity-30 w-14 h-14 rounded-full transition-all duration-200"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </motion.div>
        </div>

        {/* Modern card counter and controls */}
        <div className="flex flex-col items-center gap-6">
          <motion.div
            className="bg-white/10 backdrop-blur-sm border-2 border-white/20 px-6 py-3 rounded-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-white font-bold text-sm uppercase tracking-wider">
              {currentCardIndex + 1} / {totalCards}
            </p>
          </motion.div>

          {/* <div className="flex gap-4"> */}
          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => router.push("/")}
                variant="ghost"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 px-6 py-3 rounded-full font-medium transition-all duration-200"
              >
                <Home className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </motion.div> */}

          {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={scrollToTop}
                variant="ghost"
                className="bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/20 px-4 py-3 rounded-full font-medium transition-all duration-200"
              >
                <ArrowUp className="w-4 h-4" />
              </Button>
            </motion.div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default WrappedPage;

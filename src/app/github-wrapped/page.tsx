"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { IntroCard } from "@/components/wrapped/IntroCard";
import { StatsCard } from "@/components/wrapped/StatsCard";
import { LanguagesCard } from "@/components/wrapped/LanguagesCard";
import { ProductivityCard } from "@/components/wrapped/ProductivityCard";
import { AISummaryCard } from "@/components/wrapped/AISummaryCard";
import { ShareCard } from "@/components/wrapped/ShareCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
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

  const totalCards = wrappedData ? 6 : 0;

  const handlePrevious = () => {
    setCurrentCardIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentCardIndex((prev) => Math.min(totalCards - 1, prev + 1));
  };

  // keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrevious();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [totalCards]);

  // touch swipe support
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      handleNext(); // swipe left
    }
    if (touchEndX.current - touchStartX.current > 50) {
      handlePrevious(); // swipe right
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <div className="text-center space-y-6 border-4 border-white p-12 border-sharp">
          <div className="w-20 h-20 border-4 border-white border-t-transparent animate-spin mx-auto border-sharp" />
          <p className="text-white text-2xl font-black uppercase tracking-widest">
            Loading
          </p>
          <p className="text-white/70 font-bold uppercase tracking-wide">
            Analyzing Your Year
          </p>
        </div>
      </div>
    );
  }

  if (error || !wrappedData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
        <div className="text-center space-y-6 max-w-md border-4 border-white p-12 border-sharp">
          <h2 className="text-4xl font-black text-white uppercase tracking-tight">
            Error
          </h2>
          <p className="text-white/80 text-lg font-bold uppercase tracking-wide">
            {error || "Something went wrong"}
          </p>
          <Button
            onClick={() => router.push("/")}
            variant="outline"
            className="border-2 border-white text-black hover:bg-gray-300 cursor-pointer hover:text-black font-black uppercase tracking-wide border-sharp"
          >
            <Home className="w-5 h-5 mr-2 stroke-current" strokeWidth={2.5} />
            Go Back
          </Button>
        </div>
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
      key="share"
      ref={(el) => {
        cardRefs.current[5] = el;
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
      {/* Sharp geometric background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-2 bg-white animate-pulse" />
        <div
          className="absolute bottom-0 left-0 right-0 h-2 bg-white animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-0 bottom-0 left-0 w-2 bg-white/50 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 w-2 bg-white/50 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />

        {/* Corner accents */}
        <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white/20" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border-2 border-white/10" />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/5 animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl">
        {/* Card display */}
        <div className="flex items-center justify-center mb-4 w-full h-[65vh] md:h-[75vh]">
          <div className="w-full h-full flex items-center justify-center">
            {cards[currentCardIndex]}
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <Button
            onClick={handlePrevious}
            disabled={currentCardIndex === 0}
            size="icon"
            variant="outline"
            className="bg-black border-2 border-white text-white hover:bg-white hover:text-black disabled:opacity-30 border-sharp w-12 h-12 transition-all"
          >
            <ChevronLeft className="w-8 h-8 stroke-current" strokeWidth={3} />
          </Button>

          {/* Progress rectangles */}
          <div className="flex gap-2">
            {Array.from({ length: totalCards }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentCardIndex(index)}
                className={`progress-dot ${
                  index === currentCardIndex ? "active" : ""
                }`}
                aria-label={`Go to card ${index + 1}`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={currentCardIndex === totalCards - 1}
            size="icon"
            variant="outline"
            className="bg-black border-2 border-white text-white hover:bg-white hover:text-black disabled:opacity-30 border-sharp w-12 h-12 transition-all"
          >
            <ChevronRight className="w-8 h-8 stroke-current" strokeWidth={3} />
          </Button>
        </div>

        {/* Card counter */}
        <div className="flex flex-col items-center gap-6">
          <div className="text-center border-2 border-white inline-block px-6 py-2 mx-auto border-sharp">
            <p className="text-white font-black uppercase tracking-widest text-sm">
              {currentCardIndex + 1} / {totalCards}
            </p>
          </div>

          <Button
            onClick={() => router.push("/")}
            size="sm"
            variant="ghost"
            className="text-white hover:bg-white hover:text-black border-2 border-white font-bold uppercase tracking-wide border-sharp"
          >
            <Home className="w-4 h-4 mr-2 stroke-current" strokeWidth={2.5} />
            Back to Home
          </Button>
        </div>

        {/* Home button */}
      </div>
    </div>
  );
};

export default WrappedPage;

"use client";

import { WrappedCard } from "./WrappedCard";
import { Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

interface AISummaryCardProps {
  summary: string;
  year: number;
}

/**
 * AI summary card with sharp black and white design
 */
export const AISummaryCard = ({ summary, year }: AISummaryCardProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  // typewriter effect
  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 25;

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

  return (
    <WrappedCard cardName="ai-summary" gradientClass="gradient-ai">
      <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-8">
        <div className="text-center space-y-4 animate-fade-in border-b-4 border-white pb-6">
          <div className="flex items-center justify-center gap-4">
            <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
              {year}
            </h2>
            <Sparkles className="w-10 h-10 text-white" strokeWidth={2.5} />
          </div>
          <p className="text-white/70 text-lg font-bold uppercase tracking-wider">
            Your Story
          </p>
        </div>

        <div className="border-4 border-white p-6 md:p-10 border-sharp max-w-md bg-black/20 max-h-[60%] overflow-y-auto scrollbar-hide">
          <p className="text-lg md:text-2xl leading-relaxed text-center font-bold text-white text-high-contrast">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1 h-6 bg-white ml-1 animate-pulse border-sharp" />
            )}
          </p>
        </div>

        <div className="text-center space-y-2 animate-slide-up border-2 border-white px-6 py-3 border-sharp">
          <p className="text-xs font-black text-white uppercase tracking-widest">
            AI Generated
          </p>
        </div>
      </div>
    </WrappedCard>
  );
};

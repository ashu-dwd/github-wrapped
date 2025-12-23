"use client";

import { WrappedCard } from "./WrappedCard";
import { Calendar, TrendingUp, Flame } from "lucide-react";
import type { ProductivityData } from "@/types/github-wrapped";

interface ProductivityCardProps {
  productivity: ProductivityData;
}

/**
 * Productivity card with sharp black and white design
 */
export const ProductivityCard = ({ productivity }: ProductivityCardProps) => {
  return (
    <WrappedCard cardName="productivity" gradientClass="gradient-productivity">
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
        <div className="text-center space-y-3 animate-fade-in border-b-4 border-black pb-6">
          <div className="flex items-center justify-center gap-3">
            <TrendingUp className="w-12 h-12 text-black" strokeWidth={2.5} />
          </div>
          <h2 className="text-5xl font-black text-black uppercase tracking-tighter">
            Rhythm
          </h2>
          <p className="text-black/70 text-lg font-bold uppercase tracking-wide">
            When You Code
          </p>
        </div>

        <div className="w-full max-w-md space-y-5">
          {/* Most Productive Day */}
          <div className="border-2 border-black p-6 border-sharp hover-lift animate-slide-up bg-white">
            <div className="flex items-center gap-5">
              <div className="bg-black p-4 border-sharp">
                <Calendar className="w-10 h-10 text-white" strokeWidth={2.5} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-black/60 uppercase tracking-wider">
                  Peak Day
                </p>
                <p className="text-3xl font-black text-black uppercase tracking-tight mt-1">
                  {productivity.mostProductiveDay}
                </p>
              </div>
            </div>
          </div>

          {/* Most Productive Month */}
          <div
            className="border-2 border-black p-6 border-sharp hover-lift animate-slide-up bg-white"
            style={{ animationDelay: "0.1s" }}
          >
            <div className="flex items-center gap-5">
              <div className="bg-black p-4 border-sharp">
                <TrendingUp
                  className="w-10 h-10 text-white"
                  strokeWidth={2.5}
                />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-black/60 uppercase tracking-wider">
                  Peak Month
                </p>
                <p className="text-3xl font-black text-black uppercase tracking-tight mt-1">
                  {productivity.mostProductiveMonth}
                </p>
              </div>
            </div>
          </div>

          {/* Longest Streak */}
          {productivity.longestStreak > 0 && (
            <div
              className="border-2 border-black p-6 border-sharp hover-lift animate-slide-up bg-black"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-5">
                <div className="bg-white p-4 border-sharp">
                  <Flame className="w-10 h-10 text-black" strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-bold text-white/70 uppercase tracking-wider">
                    Longest Streak
                  </p>
                  <p className="text-3xl font-black text-white uppercase tracking-tight mt-1">
                    {productivity.longestStreak} Days
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </WrappedCard>
  );
};

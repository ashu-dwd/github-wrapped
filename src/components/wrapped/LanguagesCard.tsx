"use client";

import { WrappedCard } from "./WrappedCard";
import { Code2 } from "lucide-react";
import type { LanguageBreakdown } from "@/types/github-wrapped";

interface LanguagesCardProps {
  languages: LanguageBreakdown[];
}

/**
 * Languages card with sharp black and white bars
 */
export const LanguagesCard = ({ languages }: LanguagesCardProps) => {
  const topLanguages = languages.slice(0, 5);

  return (
    <WrappedCard cardName="languages" gradientClass="gradient-languages">
      <div className="w-full h-full flex flex-col items-center justify-center gap-8 p-8">
        <div className="text-center space-y-3 animate-fade-in border-b-4 border-white pb-6">
          <div className="flex items-center justify-center gap-3">
            <Code2 className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
            Languages
          </h2>
          <p className="text-white/70 text-lg font-bold uppercase tracking-wide">
            Top 5
          </p>
        </div>

        <div className="w-full max-w-md space-y-5">
          {topLanguages.map((lang, index) => (
            <div
              key={lang.name}
              className="animate-slide-up border-2 border-white p-4 border-sharp hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-xl text-white uppercase tracking-wide">
                  {lang.name}
                </span>
                <span className="text-3xl font-black text-white">
                  {lang.percentage}%
                </span>
              </div>

              <div className="w-full h-4 bg-white/20 border-2 border-white/40 border-sharp overflow-hidden">
                <div
                  className="h-full bg-white transition-all duration-1000 ease-out border-sharp"
                  style={{
                    width: `${lang.percentage}%`,
                    animationDelay: `${index * 0.1}s`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {topLanguages.length > 0 && (
          <div className="border-2 border-white px-8 py-3 animate-scale-in border-sharp">
            <p className="text-base font-black text-white uppercase tracking-wider">
              #{1} {topLanguages[0].name}
            </p>
          </div>
        )}
      </div>
    </WrappedCard>
  );
};

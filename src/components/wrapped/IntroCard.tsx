"use client";

import { WrappedCard } from "./WrappedCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { GitHubUser } from "@/types/github-wrapped";

interface IntroCardProps {
  user: GitHubUser;
  year: number;
}

/**
 * Opening card with sharp, high-contrast black and white design
 */
export const IntroCard = ({ user, year }: IntroCardProps) => {
  return (
    <WrappedCard cardName="intro" gradientClass="gradient-animated">
      <div className="flex flex-col items-center justify-center gap-10 animate-fade-in">
        <Avatar className="w-40 h-40 border-4 border-white shadow-2xl border-sharp">
          <AvatarImage src={user.avatar_url} alt={user.name || user.login} />
          <AvatarFallback className="text-5xl bg-black text-white border-sharp font-black">
            {user.login.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className="text-center space-y-6 max-w-md">
          <h1 className="text-6xl font-black tracking-tighter animate-slide-up uppercase text-high-contrast">
            {user.name || user.login}
          </h1>

          <div className="space-y-3 border-t-2 border-b-2 border-white py-6">
            <p
              className="text-3xl font-black text-white animate-slide-up uppercase tracking-wider"
              style={{ animationDelay: "0.1s" }}
            >
              {year}
            </p>
            <p
              className="text-xl font-bold text-white/90 animate-slide-up uppercase tracking-widest"
              style={{ animationDelay: "0.2s" }}
            >
              GitHub Wrapped
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce border-2 border-white px-6 py-2 border-sharp">
          <p className=" text-white text-sm font-bold uppercase tracking-wider">
            Swipe →
          </p>
        </div>
      </div>
    </WrappedCard>
  );
};

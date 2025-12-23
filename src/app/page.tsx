"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Github, Sparkles } from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleUserName = () => {
    if (!username.trim()) return;

    setIsLoading(true);
    router.push(`/github-wrapped/?u=${username.trim()}`);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleUserName();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* Sharp geometric background patterns */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1 bg-white animate-pulse" />
        <div
          className="absolute bottom-0 right-0 w-1 h-full bg-white animate-pulse"
          style={{ animationDelay: "0.5s" }}
        />
        <div
          className="absolute top-1/4 left-1/4 w-64 h-64 border-2 border-white/10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-white/5 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <Card className="w-full max-w-md shadow-2xl relative z-10 border-2 border-white bg-black backdrop-blur-md border-sharp">
        <CardHeader className="text-center space-y-6 pb-6 border-b-2 border-white">
          <div className="flex items-center justify-center gap-3 animate-fade-in">
            <Github className="w-12 h-12 text-white" />
          </div>

          <div className="space-y-3 animate-slide-up">
            <CardTitle className="text-5xl font-black text-white tracking-tighter uppercase">
              GitHub
              <br />
              Wrapped
            </CardTitle>
            <CardDescription className="text-white text-base font-medium uppercase tracking-wide">
              {new Date().getFullYear()} Edition
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 pt-6">
          <div
            className="space-y-4 animate-slide-up"
            style={{ animationDelay: "0.1s" }}
          >
            <Input
              placeholder="GITHUB USERNAME"
              className="h-14 text-base bg-white text-black placeholder:text-gray-500 border-2 border-black hover:border-gray-800 focus:border-gray-600 transition-colors border-sharp font-semibold uppercase tracking-wide"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />

            <Button
              className="w-full h-14 text-base bg-white text-black hover:bg-gray-200 border-2 border-white font-black shadow-lg hover-lift border-sharp uppercase tracking-wider transition-all"
              onClick={handleUserName}
              disabled={!username.trim() || isLoading}
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin mr-2 border-sharp" />
                  LOADING...
                </>
              ) : (
                <>SEE YOUR WRAPPED</>
              )}
            </Button>
          </div>

          <div
            className="space-y-3 pt-6 border-t-2 border-white/20 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="border border-white/20 p-3 border-sharp hover:bg-white/5 transition-colors">
                <p className="text-white text-xs font-bold uppercase">
                  AI Summary
                </p>
              </div>
              <div className="border border-white/20 p-3 border-sharp hover:bg-white/5 transition-colors">
                <p className="text-white text-xs font-bold uppercase">Stats</p>
              </div>
              <div className="border border-white/20 p-3 border-sharp hover:bg-white/5 transition-colors">
                <p className="text-white text-xs font-bold uppercase">Share</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

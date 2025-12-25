"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState, useMemo, KeyboardEvent } from "react";
import {
  Github,
  Sparkles,
  Rocket,
  BarChart3,
  Heart,
  Users,
  Zap,
  Code,
} from "lucide-react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const router = useRouter();

  // Generate deterministic values for SSR consistency
  const floatingParticles = useMemo(() => {
    // Use fixed seed-based random for consistent SSR/CSR rendering
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    return [...Array(15)].map((_, i) => {
      const seed1 = i * 1.234 + 0.123;
      const seed2 = i * 5.678 + 0.456;
      const seed3 = i * 9.012 + 0.789;
      const seed4 = i * 2.345 + 0.012;

      return {
        id: i,
        x: seededRandom(seed1) * 100, // percentage
        y: seededRandom(seed2) * 100, // percentage
        duration: 3 + seededRandom(seed3) * 2,
        delay: seededRandom(seed4) * 2,
      };
    });
  }, []);

  const handleGenerateWrapped = async () => {
    if (!username.trim()) return;

    setIsLoading(true);
    // Simulate processing for better UX
    await new Promise((resolve) => setTimeout(resolve, 800));
    router.push(`/github-wrapped/?u=${username.trim()}`);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleGenerateWrapped();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const features = [
    {
      icon: BarChart3,
      title: "Detailed Stats",
      description: "Your year in numbers",
    },
    {
      icon: Sparkles,
      title: "AI Summary",
      description: "Personalized insights",
    },
    {
      icon: Users,
      title: "Collaborations",
      description: "Team contributions",
    },
    {
      icon: Zap,
      title: "Growth Metrics",
      description: "Track your progress",
    },
    {
      icon: Heart,
      title: "Milestones",
      description: "Achievement badges",
    },
    {
      icon: Rocket,
      title: "Share Results",
      description: "Show off your work",
    },
  ];

  return (
    <div
      className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col"
      onMouseMove={handleMouseMove}
    >
      {/* Modern animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Cursor-reactive light */}
        <motion.div
          className="absolute w-80 h-80 rounded-full bg-white/5 blur-3xl -translate-x-1/2 -translate-y-1/2"
          style={{
            left: cursorPosition.x || "50%",
            top: cursorPosition.y || "50%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle orbs */}
        <motion.div
          className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-10 right-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"
          animate={{
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Floating particles */}
        {floatingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 bg-white/25 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [null, -5, null],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Source Code Button - Top Right */}
      <motion.div
        className="absolute top-6 right-6 z-20"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <motion.a
          href="https://github.com/ashu-dwd/github-wrapped" // Update with actual repository URL
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl text-white/90 hover:text-white transition-all duration-300 hover:bg-white/20 hover:border-white/30 hover:shadow-lg hover:shadow-white/20"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="relative"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <Code className="w-4 h-4" strokeWidth={2} />
          </motion.div>
          <span className="text-sm font-medium hidden sm:inline">
            Source Code
          </span>
          <motion.div
            className="w-1 h-1 bg-white/60 rounded-full"
            animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.a>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-8">
        <motion.div
          className="w-full max-w-6xl mx-auto text-center space-y-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          {/* Header with animated logo */}
          <motion.div
            className="space-y-8 flex flex-col items-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.div
              className="inline-flex items-center justify-center gap-4"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <Github className="w-16 h-16 text-white" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                GitHub
                <motion.span
                  className="block bg-gradient-to-r from-white via-neutral-400 to-white bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  Wrapped
                </motion.span>
              </h1>
              <p className="text-xl sm:text-2xl text-white/80 font-medium">
                Discover your {new Date().getFullYear()} GitHub journey
              </p>
            </div>
          </motion.div>

          {/* Input section */}
          <motion.div
            className="w-full max-w-md mx-auto space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="relative">
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-white/40 via-neutral-500/40 to-white/40 rounded-2xl opacity-40 blur-sm"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Input
                placeholder="Enter your GitHub username"
                className="relative h-16 text-lg bg-white/5 backdrop-blur-md text-white placeholder:text-white/50 border border-white/30 focus:border-white transition-all duration-300 rounded-2xl font-semibold px-6"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyPress}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                disabled={isLoading}
              />
              {isFocused && (
                <motion.div
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 text-white/60" />
                  </motion.div>
                </motion.div>
              )}
            </div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="w-full h-16 text-lg bg-white text-black hover:bg-neutral-200 font-bold rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 flex items-center gap-3"
                onClick={handleGenerateWrapped}
                disabled={!username.trim() || isLoading}
              >
                {isLoading ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Generating Your Wrapped...
                  </>
                ) : (
                  <>
                    <motion.div
                      animate={{ x: [0, 6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Rocket className="w-5 h-5 text-black" />
                    </motion.div>
                    Generate My Wrapped
                  </>
                )}
              </Button>
            </motion.div>
          </motion.div>

          {/* Features grid */}
          <motion.div
            className="w-full max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center hover:bg-white/10 transition-all duration-300 overflow-hidden"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(255,255,255,0.15)",
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                >
                  <motion.div
                    className="flex flex-col items-center gap-2 sm:gap-3 min-h-0"
                    whileHover={{ y: -2 }}
                  >
                    <motion.div
                      className={`p-2 sm:p-3 bg-gradient-to-br ${
                        index % 2 === 0
                          ? "from-white to-neutral-500"
                          : "from-neutral-700 to-black"
                      } rounded-lg sm:rounded-xl shadow-lg flex-shrink-0`}
                      whileHover={{
                        rotate: [0, 10, -10, 0],
                        scale: 1.1,
                        transition: { duration: 0.6 },
                      }}
                    >
                      <feature.icon
                        className="w-5 h-5 sm:w-6 sm:h-6 text-white"
                        strokeWidth={2}
                      />
                    </motion.div>
                    <div className="flex flex-col gap-1 min-w-0 w-full">
                      <h3 className="text-white font-semibold text-xs sm:text-sm mb-0 sm:mb-1 break-words">
                        {feature.title}
                      </h3>
                      <p className="text-white/60 text-[10px] sm:text-xs break-words leading-tight">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

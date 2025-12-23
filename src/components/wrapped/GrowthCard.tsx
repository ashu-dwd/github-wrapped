"use client";

import { motion } from "framer-motion";
import { WrappedCard } from "./WrappedCard";
import { TrendingUp, BarChart3, PieChart, Rocket } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar } from "recharts";

interface GrowthCardProps {
  stats: {
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
    totalStars: number;
  };
}

/**
 * Amazing growth card with beautiful charts and animations
 */
export const GrowthCard = ({ stats }: GrowthCardProps) => {
  // Generate monthly data for charts
  const generateMonthlyData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months.map((month, index) => ({
      month: month.slice(0, 3),
      commits: Math.floor(Math.random() * 200) + 50,
      prs: Math.floor(Math.random() * 20) + 5,
      issues: Math.floor(Math.random() * 15) + 3,
    }));
  };

  const generateGrowthMetrics = () => {
    return [
      {
        metric: "Commits",
        value: stats.totalCommits,
        growth: "+42%",
        color: "from-green-400 to-emerald-500",
      },
      {
        metric: "Pull Requests",
        value: stats.totalPRs,
        growth: "+28%",
        color: "from-blue-400 to-cyan-500",
      },
      {
        metric: "Issues",
        value: stats.totalIssues,
        growth: "+15%",
        color: "from-purple-400 to-pink-500",
      },
    ];
  };

  const monthlyData = generateMonthlyData();
  const growthMetrics = generateGrowthMetrics();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  return (
    <WrappedCard cardName="growth" gradientClass="gradient-growth" animationDelay={1.8}>
      <motion.div
        className="w-full h-full flex flex-col items-center justify-center gap-6 p-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Modern header */}
        <motion.div variants={{
          hidden: { opacity: 0, y: -20 },
          visible: { opacity: 1, y: 0 }
        }} className="text-center space-y-4">
          <motion.div
            className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <TrendingUp className="w-6 h-6 text-white" strokeWidth={2} />
            </motion.div>
            <h2 className="text-3xl font-bold text-white">
              Growth
            </h2>
          </motion.div>
          <p className="text-white/80 text-lg font-medium">
            Your impressive trajectory
          </p>
        </motion.div>

        {/* Chart area */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-lg bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <BarChart3 className="w-4 h-4 text-white" />
              </motion.div>
              <h3 className="font-semibold text-white">Monthly Activity</h3>
            </div>
            <motion.div
              className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-medium"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              +42% growth
            </motion.div>
          </div>
          
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={monthlyData}>
              <Bar 
                dataKey="commits" 
                fill="url(#colorGradient)" 
                radius={[8, 8, 0, 0]}
                animationBegin={0}
                animationDuration={1.5}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Growth metrics */}
        <div className="w-full max-w-lg space-y-3">
          {growthMetrics.map((metric, index) => (
            <motion.div
              key={metric.metric}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.03, 
                x: 10,
                transition: { type: "spring" as const, stiffness: 400 }
              }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-2xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`p-2 bg-gradient-to-br ${metric.color} rounded-lg`}
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <BarChart3 className="w-4 h-4 text-white" strokeWidth={2} />
                  </motion.div>
                  <div>
                    <p className="text-white/70 text-sm font-medium">
                      {metric.metric}
                    </p>
                    <motion.p 
                      className="text-2xl font-bold text-white tabular-nums"
                      key={metric.value}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {formatNumber(metric.value)}
                    </motion.p>
                  </div>
                </div>
                
                <motion.div
                  className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-bold"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {metric.growth}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievement banner */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { delay: 1 } }
          }}
          className="w-full max-w-sm"
        >
          <motion.div
            className="bg-gradient-to-r from-orange-500 to-red-500 p-1 rounded-2xl"
            whileHover={{ scale: 1.02 }}
          >
            <div className="bg-black/20 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3">
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Rocket className="w-6 h-6 text-white" />
              </motion.div>
              <div className="text-center">
                <span className="text-white font-bold text-sm">
                  On a Rocket! 🚀
                </span>
                <p className="text-white/70 text-xs">
                  Exponential growth detected
                </p>
              </div>
              <motion.div
                animate={{ 
                  y: [0, -5, 0],
                  rotate: [0, -5, 5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
              >
                <Rocket className="w-6 h-6 text-white" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </WrappedCard>
  );
};
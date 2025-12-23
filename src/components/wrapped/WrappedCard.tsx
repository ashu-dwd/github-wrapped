"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { downloadCard } from "@/lib/card-export";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface WrappedCardProps {
  children: React.ReactNode;
  gradientClass?: string;
  cardName: string;
  showDownload?: boolean;
  className?: string;
}

/**
 * Base wrapper component for all wrapped cards
 * Provides consistent sizing, gradient backgrounds, and download functionality
 */
export const WrappedCard = ({
  children,
  gradientClass = "gradient-navy",
  cardName,
  showDownload = true,
  className,
}: WrappedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

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

  return (
    <div className="relative group">
      <Card
        ref={cardRef}
        className={cn(
          "wrapped-card",
          gradientClass,
          "flex flex-col items-center justify-center p-8 text-white shadow-2xl border-4 border-white/20 border-sharp",
          className
        )}
      >
        {children}
      </Card>

      {showDownload && (
        <Button
          onClick={handleDownload}
          disabled={isDownloading}
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover-lift border-2 border-black bg-white text-black hover:bg-gray-200 border-sharp"
        >
          <Download className="w-5 h-5 stroke-current" strokeWidth={2.5} />
        </Button>
      )}
    </div>
  );
};

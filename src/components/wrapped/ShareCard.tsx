"use client";

import { WrappedCard } from "./WrappedCard";
import { Button } from "@/components/ui/button";
import { Share2, Download } from "lucide-react";
import { useState } from "react";

interface ShareCardProps {
  username: string;
  year: number;
  onDownloadAll: () => void;
}

/**
 * Share card with sharp black and white design
 */
export const ShareCard = ({
  username,
  year,
  onDownloadAll,
}: ShareCardProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAll = async () => {
    setIsDownloading(true);
    try {
      onDownloadAll();
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const text = `Check out my GitHub Wrapped ${year}!\n\n${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `My GitHub Wrapped ${year}`,
          text,
          url,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      navigator.clipboard.writeText(text);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <WrappedCard
      cardName="share"
      gradientClass="gradient-share"
      showDownload={false}
    >
      <div className="w-full h-full flex flex-col items-center justify-center gap-10 p-8">
        <div className="text-center space-y-6 animate-fade-in border-b-4 border-t-4 border-black py-8">
          <h2 className="text-6xl font-black text-black uppercase tracking-tighter">
            That's
          </h2>
          <h2 className="text-6xl font-black text-black uppercase tracking-tighter">
            A Wrap
          </h2>
          <p className="text-black text-xl font-bold uppercase tracking-widest mt-4">
            {year}
          </p>
        </div>

        <div className="text-center space-y-3 border-2 border-black p-6 border-sharp">
          <p className="text-black/80 text-lg font-bold uppercase tracking-wide">
            @{username}
          </p>
        </div>

        <div className="space-y-4 w-full max-w-sm animate-slide-up">
          <Button
            onClick={handleShare}
            size="lg"
            className="w-full h-16 text-lg bg-black text-white hover:bg-gray-800 hover-lift border-2 border-black font-black uppercase tracking-widest border-sharp"
          >
            <Share2 className="w-6 h-6 mr-3 stroke-current" strokeWidth={2.5} />
            Share
          </Button>

          <Button
            onClick={handleDownloadAll}
            disabled={isDownloading}
            size="lg"
            variant="outline"
            className="w-full h-16 text-lg border-4 border-black text-black hover:bg-black hover:text-white hover-lift font-black uppercase tracking-widest border-sharp"
          >
            <Download
              className="w-6 h-6 mr-3 stroke-current"
              strokeWidth={2.5}
            />
            {isDownloading ? "Downloading..." : "Download All"}
          </Button>
        </div>
      </div>
    </WrappedCard>
  );
};

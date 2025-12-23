"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  const handleUserName = () => {
    router.push(`/github-wrapped/?u=${username}`);
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-bold">
            GitHub Wrapped 🚀
          </CardTitle>
          <CardDescription>
            Generate a fun, shareable summary of your GitHub activity.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Input
            placeholder="Enter your GitHub username"
            className="h-11"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Button className="w-full h-11 text-base" onClick={handleUserName}>
            Get Started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

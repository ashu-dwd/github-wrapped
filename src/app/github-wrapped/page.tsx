"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [githubWrappedData, setGithubWrappedData] = useState(null);

  const searchParams = useSearchParams();
  const username = searchParams.get("u");

  useEffect(() => {
    const fetchGithubWrappedData = async () => {
      const response = await fetch(`/api/github?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setGithubWrappedData(data);
    };
    fetchGithubWrappedData();
  }, [username]);

  return (
    <div>
      GitHub Wrapped {username}
      <br />
      {githubWrappedData ? JSON.stringify(githubWrappedData) : "Loading..."}
    </div>
  );
};

export default Page;

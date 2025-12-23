import axiosInstance from "@/lib/axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  console.log("username:", username);

  if (!username) {
    return NextResponse.json(
      { error: "Username is required" },
      { status: 400 }
    );
  }

  try {
    const { data: userData } = await axiosInstance.get(`/users/${username}`);
    const userRepos = await getRepos(username);

    return NextResponse.json({ userData, userRepos }, { status: 200 });
  } catch (error: any) {
    console.log("Error fetching data", error.response?.status);

    if (error.response?.status === 404) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const getRepos = async (username: string) => {
  try {
    const userData = await axiosInstance.get(`/users/${username}/repos`);
    return userData.data;
  } catch (error: any) {
    console.log("Error fetching data", error.response?.status);
    return error.response?.data;
  }
};

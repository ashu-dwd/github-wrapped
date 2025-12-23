import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.GEMINI_API_KEY,
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
});

export const generateGeminiResponse = async (
  userGithubData: string,
  SYSTEM_PROMPT: string
) => {
  // console.log("userGithubData", userGithubData);
  // console.log("SYSTEM_PROMPT", SYSTEM_PROMPT);
  const response = await openai.chat.completions.create({
    model: "gemini-2.5-flash",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: userGithubData,
      },
    ],
  });

  console.log(response.choices[0].message.content);

  return response.choices[0].message.content;
};

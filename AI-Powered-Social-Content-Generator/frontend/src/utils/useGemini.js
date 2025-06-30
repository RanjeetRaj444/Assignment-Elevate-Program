import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_REACT_APP_GEMINI_API_KEY
);

export async function generatePlatformPost(topic, platform) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
Write a ${
    platform === "LinkedIn" ? "professional" : "engaging"
  } ${platform} post for the topic: "${topic}".
Keep it ${
    platform === "Twitter" ? "under 280 characters" : "concise and impactful"
  }.
Return only the post content. Do not add hashtags unless appropriate for the platform.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const output = response.text().trim();

    return output.replace(/^"|"$/g, "");
  } catch (error) {
    console.error("Error generating post:", error);
    return "Something went wrong. Please try again.";
  }
}

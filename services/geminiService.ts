
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSkillMentorResponse(skill: string, query: string) {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are the SkillSpace Senior Technical Mentor specializing in ${skill}. 
      Your goal is to provide elite-level, clear, and perfectly formatted technical advice.
      
      RULES:
      1. Use CLEAR HEADINGS (##) for different sections.
      2. Use BULLET POINTS for lists.
      3. Wrap all code in triple backticks with the language name (e.g., \`\`\`cpp).
      4. Use **bold** for key terms.
      5. Keep explanations high-density but easy to skim.
      6. If asked for a solution, explain the LOGIC first, then provide the CODE.
      
      User Question: "${query}"`,
      config: {
        temperature: 0.6,
        topP: 0.9,
      }
    });
    return response.text || "I'm having trouble connecting to my knowledge base. Try again shortly!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error while thinking. Let's try that again.";
  }
}

export async function validateUserCode(challenge: string, code: string, language: string = 'C++') {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a multi-language Logic Validator for SkillSpace.
      Current Language: ${language}
      Challenge Description: "${challenge}"
      User's Code:
      \`\`\`${language.toLowerCase()}
      ${code}
      \`\`\`
      
      TASK: 
      1. Analyze the logic of the code specifically for the ${language} syntax and paradigms.
      2. If it solves the problem described, even if minor formatting differs, start with "PASS".
      3. If there is a major logical error or it does not address the challenge in ${language}, start with "FAIL".
      4. If FAIL, provide a 1-sentence explanation of the error.
      
      Response Format: 
      [PASS/FAIL]: [Explanation]`,
      config: {
        temperature: 0.1,
      }
    });
    return response.text;
  } catch (error) {
    return "FAIL: System error during validation.";
  }
}

export async function generateDevToolAction(tool: 'terminal' | 'testing' | 'regex', input: string) {
  const prompts = {
    terminal: `Convert the following natural language request into a concise shell command (bash/zsh). Output ONLY the command in a code block, then a one-sentence explanation. Request: ${input}`,
    testing: `Generate a comprehensive set of Unit Tests for the following code snippet. Use the most appropriate framework (e.g., Jest for JS, PyTest for Python). Code: ${input}`,
    regex: `Generate and explain a Regular Expression for the following requirement: ${input}`
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompts[tool],
      config: { temperature: 0.2 }
    });
    return response.text;
  } catch (error) {
    return "Tooling system failure. Ensure your input is valid code or instruction.";
  }
}

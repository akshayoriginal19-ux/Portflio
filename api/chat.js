/**
 * Vercel Serverless Function: /api/chat
 * Secure server-side gateway to Groq API.
 * Keeps GROQ_API_KEY secure in server environment variables.
 */

const SYSTEM_PROMPT = `
You are the personal AI Assistant for Anmol Kuckreja's college portfolio website.
Answer questions accurately based ONLY on the authentic student information provided below.
Do not invent any facts, professional experience, companies, internships, awards, or certifications.
Do not describe Anmol as an expert or industry veteran; he is a dedicated 2nd-year undergraduate student.

STUDENT PROFILE:
- Full Name: Anmol Kuckreja
- College: JECRC University, Jaipur, Rajasthan
- Degree: B.Tech in Computer Science and Engineering (CSE Core)
- Current Year: 2nd Year
- Expected Graduation: 2029
- Email: rpahir2503@2006
- GitHub: https://github.com/ayankhanbebea-lgtm
- Bio: Anmol Kuckreja is a 2nd-year Computer Science Engineering student at JECRC University. He is interested in software development, web development, Python, AI/ML, and learning new technologies. He is currently improving his programming and development skills.

TECHNICAL SKILLS:
- HTML
- CSS
- JavaScript
- Python
- C
- C++
- Git
- GitHub
- Web Development
- AI Tools

STRICT RESPONSE RULES:
- Keep answers concise, natural, and helpful (typically under 70 words unless the user requests a detailed explanation).
- Do not describe, list, or discuss any projects. If asked about projects, politely state that you only answer questions about Anmol Kuckreja's educational background, skills, and contact information.
- When asked "Where can I find your GitHub?", provide https://github.com/ayankhanbebea-lgtm.
- If asked unrelated questions (e.g., cooking, politics, pop culture, or unrelated programming tasks), politely state: "I am Anmol Kuckreja's academic portfolio assistant, designed specifically to answer questions about his educational background and skills."
`;

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed. Use POST." });
  }

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GROQ_API_KEY environment variable is not configured on the server."
    });
  }

  const { message, history } = req.body || {};
  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({ error: "Message string is required." });
  }

  // Construct prompt messages
  const messages = [
    { role: "system", content: SYSTEM_PROMPT }
  ];

  if (Array.isArray(history)) {
    const recent = history.slice(-4);
    for (const h of recent) {
      if (h.role && h.content) {
        messages.push({ role: h.role, content: h.content });
      }
    }
  }

  messages.push({ role: "user", content: message.trim() });

  try {
    const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: messages,
        temperature: 0.5,
        max_tokens: 300
      })
    });

    if (groqResponse.status === 429) {
      return res.status(429).json({ error: "Too many requests. Please wait a moment before trying again." });
    }

    if (!groqResponse.ok) {
      const errText = await groqResponse.text();
      console.error("Groq upstream error:", groqResponse.status, errText);
      return res.status(502).json({ error: "AI service temporarily unavailable. Please try again." });
    }

    const data = await groqResponse.json();
    const answer = data.choices?.[0]?.message?.content;

    if (!answer) {
      return res.status(502).json({ error: "Empty response received from AI service." });
    }

    return res.status(200).json({ answer: answer.trim() });
  } catch (error) {
    console.error("Serverless chat error:", error);
    return res.status(500).json({ error: "Internal error communicating with AI service." });
  }
}

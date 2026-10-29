/**
 * Anmol Kuckreja - AI Chatbot Client
 * Communicates with /api/chat (Vercel Serverless Function).
 * Contains fallback answers for offline / static previews.
 */

document.addEventListener("DOMContentLoaded", () => {
  const chatMessages = document.getElementById("chatMessages");
  const userInput = document.getElementById("userInput");
  const sendButton = document.getElementById("sendButton");
  const chatStatus = document.getElementById("chatStatus");
  const clearChatBtn = document.getElementById("clearChatBtn");
  const suggestions = document.querySelectorAll(".sugg-chip");

  const conversationHistory = [];

  function appendMessage(role, text) {
    const bubble = document.createElement("div");
    bubble.className = `chat-message ${role === "user" ? "chat-user" : "chat-assistant"}`;
    bubble.textContent = text;
    chatMessages.appendChild(bubble);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Authentic fallback response generator for static or offline previews
  function getLocalFallback(query) {
    const q = query.toLowerCase().trim();

    if (q.includes("who are you") || q.includes("introduce") || q.includes("about you")) {
      return "I'm Anmol Kuckreja's AI portfolio assistant. Anmol is a 2nd-year B.Tech CSE (Core) student at JECRC University, Jaipur, focused on software engineering, web development, Python, and practical AI tools.";
    }
    if (q.includes("where do you study") || q.includes("college") || q.includes("university") || q.includes("education")) {
      return "Anmol Kuckreja studies at JECRC University in Jaipur, pursuing his B.Tech in Computer Science and Engineering (CSE Core), currently in his 2nd year with an expected graduation in 2029.";
    }
    if (q.includes("skill") || q.includes("technologies") || q.includes("stack")) {
      return "Anmol Kuckreja's skills include HTML, CSS, JavaScript, Python, C, C++, Git, GitHub, Web Development, and AI Tools.";
    }
    if (
      q.includes("project") ||
      q.includes("krishidhenu") ||
      q.includes("arrive") ||
      q.includes("pdfai") ||
      q.includes("traffic escape") ||
      q.includes("quiz") ||
      q.includes("reading list")
    ) {
      return "I only answer questions about Anmol Kuckreja's educational background, skills, and contact information, not about specific projects.";
    }
    if (q.includes("github") || q.includes("repo") || q.includes("where is your github")) {
      return "You can find Anmol Kuckreja's GitHub profile here: https://github.com/ayankhanbebea-lgtm";
    }
    if (q.includes("email") || q.includes("contact")) {
      return "You can reach Anmol Kuckreja directly by email at rpahir2503@2006 or connect via his GitHub profile: https://github.com/ayankhanbebea-lgtm";
    }

    // Default guardrail response
    return "I am Anmol Kuckreja's academic portfolio assistant, designed specifically to answer questions about his educational background and skills. How can I help you?";
  }

  async function sendMessage(text) {
    const question = (text || userInput.value || "").trim();
    if (!question) return;

    appendMessage("user", question);
    userInput.value = "";
    userInput.disabled = true;
    sendButton.disabled = true;
    chatStatus.textContent = "AI is thinking...";

    conversationHistory.push({ role: "user", content: question });

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: question,
          history: conversationHistory
        })
      });

      if (response.ok) {
        const data = await response.json();
        const answer = data.answer || "Thank you for asking!";
        appendMessage("assistant", answer);
        conversationHistory.push({ role: "assistant", content: answer });
      } else {
        // If serverless endpoint is unavailable (e.g. static preview or local static server)
        const errJson = await response.json().catch(() => ({}));
        if (errJson.error && errJson.error.includes("GROQ_API_KEY")) {
          appendMessage("assistant", `[Server Notice]: ${errJson.error}\n\n${getLocalFallback(question)}`);
        } else {
          const fallback = getLocalFallback(question);
          appendMessage("assistant", fallback);
          conversationHistory.push({ role: "assistant", content: fallback });
        }
      }
    } catch (err) {
      console.warn("API request fallback:", err.message);
      const fallback = getLocalFallback(question);
      appendMessage("assistant", fallback);
      conversationHistory.push({ role: "assistant", content: fallback });
    } finally {
      userInput.disabled = false;
      sendButton.disabled = false;
      chatStatus.textContent = "";
      userInput.focus();
    }
  }

  if (sendButton) {
    sendButton.addEventListener("click", () => sendMessage());
  }

  if (userInput) {
    userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    });
  }

  // Clickable suggested question chips
  suggestions.forEach(chip => {
    chip.addEventListener("click", () => {
      const q = chip.textContent.trim();
      userInput.value = q;
      sendMessage(q);
    });
  });

  // Clear chat button
  if (clearChatBtn) {
    clearChatBtn.addEventListener("click", () => {
      chatMessages.innerHTML = `
        <div class="chat-message chat-assistant">
          Chat cleared. Ask me anything about Anmol Kuckreja's background or skills!
        </div>
      `;
      conversationHistory.length = 0;
      chatStatus.textContent = "";
    });
  }
});

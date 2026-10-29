# Personal Portfolio Website with API-Based Chatbot Integration

An individual practical **Internal Assessment** project developed for the Computer Science & Engineering curriculum at JECRC University by **Akshay sharma**.

- **Author**: Akshay sharma
- **College**: JECRC University, Jaipur, Rajasthan
- **Degree**: B.Tech in Computer Science and Engineering (CSE Core)
- **Current Year**: 2nd Year
- **Expected Graduation**: 2029
- **Email**: [akshayoriginal19@gmail.com](mailto:akshayoriginal19@gmail.com)
- **GitHub Profile**: [ttps://github.com/akshayoriginal19-ux](ttps://github.com/akshayoriginal19-ux)
- **Live Deployed Portfolio (Vercel)**: [https://portflio-steel-tau.vercel.app/](https://portflio-steel-tau.vercel.app/)
- **Live Deployed Portfolio (GitHub Pages)**: [https://github.com/akshayoriginal19-ux](https://github.com/akshayoriginal19-ux)

---

## 1. Project Overview
This repository contains a personalized, responsive portfolio website showcasing five coursework projects completed during the semester. The website incorporates modern UI/UX design, mobile responsiveness, a persistent light/dark mode toggle, an interactive project search and filter engine, and a secure API-based chatbot integrated with Groq.

---


## 3. Implemented Features

### A. Dynamic Project Search & Filter (Task 3)
- Visitors can search projects in real time by **project name** or **technology** (e.g., `Python`, `Quiz`, `Book`).
- Category filter buttons (`All`, `Python`, `Web Development`, `AI Tools`) allow instant domain filtering.
- A dynamic counter updates live based on the entered search term (*"Showing 5 of 5 projects"*).

### B. Light & Dark Mode Toggle (Task 3)
- Smooth toggle switch in the sticky header accessible on both desktop and mobile devices.
- Automatically respects system preferences (`prefers-color-scheme`) and persists user preference across sessions using `localStorage`.

### C. Secure AI Chatbot Integration (Task 6)
- Allows visitors to ask questions about Anmol's academic background at JECRC University, his skills, and coursework projects.
- **Strict Security Architecture**: Secret API keys are **never** bundled into frontend client JavaScript or committed to GitHub.
- Communicates with `/api/chat`, a secure **Vercel Serverless Function** reading `process.env.GROQ_API_KEY`.
- Includes suggested question chips for quick testing (*"Who are you?"*, *"Where do you study?"*, *"What are your skills?"*, *"What projects have you completed?"*, *"Tell me about your Python Programs Collection"*, *"What was fixed in the Bug Fixing Using Cursor AI project?"*).
- Includes graceful client fallback handling for local static demonstrations.

---

## 4. Technologies Used
- **Frontend**: Semantic HTML5, CSS3 (Custom CSS variables, Grid, Flexbox, media queries), Vanilla JavaScript (ES6+).
- **Backend / Serverless**: Node.js Serverless Function (`api/chat.js`) on Vercel.
- **AI API**: Groq API (`openai/gpt-oss-20b`) with role-based system prompts.
- **Typography**: Google Fonts (`Bricolage Grotesque` and `IBM Plex Sans`).
- **DevOps & Hosting**: Git, GitHub, Vercel CLI, GitHub Pages.

---

## 5. Local Setup Instructions

### Step 1: Clone the Repository
```bash
git clone https://github.com/akshayoriginal19-ux/quiz1
```

### Step 2: Running Frontend Locally
To view the frontend pages and interactive filters:
```bash
npx serve .
# Or using Python:
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000) in your web browser.

### Step 3: Running with Local Vercel Serverless Function (Optional)
To test the live Groq backend server locally:
```bash
# Add your GROQ_API_KEY to .env.local (this file is ignored by git)
echo GROQ_API_KEY=your_groq_api_key_here > .env.local

# Run Vercel development server
npx vercel dev
```

---

## 6. Vercel Deployment & Environment Variables

When deploying this project to Vercel:

1. **Import the repository** into Vercel from GitHub (`https://github.com/akshayoriginal19-ux/quiz1`).
2. **Add Environment Variable**:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Your private Groq API key (`gsk_...`)
3. **Deploy**: Vercel automatically deploys both the static assets and the serverless `/api/chat` route.

---

## 7. Author Information
- **Akshay sharma** (2nd Year B.Tech CSE Core)
- Department of Computer Science & Engineering, JECRC University, Jaipur
- Email: [akshayoriginal19@gmail.com](mailto:akshayorigianl19@gmail.com)
- GitHub: [https://github.com/akshayoriginal19-ux](https://github.com/akshayoriginal19-ux)

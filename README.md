# PathFlow — Modern Learning, Exam & Career Operating System

[![React](https://img.shields.io/badge/Frontend-React%2018-blue.svg?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Bundler-Vite%205-purple.svg?logo=vite)](https://vitejs.dev/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black.svg?logo=vercel)](https://vercel.com/)
[![Theme](https://img.shields.io/badge/Theme-Light%20%7C%20Dark%20Mode-yellow.svg)](#-light--dark-theme-feature)
[![Bundle Size](https://img.shields.io/badge/Bundle-~77KB%20gzipped-brightgreen.svg)](#-architecture--lightweight-bundle)

**PathFlow** is an ultra-lightweight, high-performance **React.js Single Page Application (SPA)** designed for managing **Target Exams (with Subject Weightages)**, **Software Projects & Future Ideas**, and **Courses & Skillsets**. 

It features full **Light & Dark mode**, a fully dynamic interactive calendar with real-time date navigation, dynamic metric calculations, and responsive layouts across mobile, tablet, and desktop screens. It is pre-configured for **instant deployment on Vercel**.

---

## 🌓 Light & Dark Theme Feature

PathFlow includes first-class support for both Light and Dark themes:
- **Instant Header Toggle**: A Moon/Sun toggle button directly in the top header bar.
- **Settings Theme Selector**: Visual theme preview cards in the Workspace Settings view.
- **Persistent Preference**: Automatically saves your preference (`light` or `dark`) to `localStorage`.
- **Custom Tuned Palettes**:
  - **Light Mode**: Figma pastel aesthetic (`#F4F5F9` background, `#FFFFFF` cards, `#6C5DD3` primary purple).
  - **Dark Mode**: Sleek OLED/dark surface (`#0E0F1A` background, `#181928` cards, `#7F70F1` primary purple).

---

## 📅 Dynamic Calendar & Real-Time Date Features

- **Live System Dates**: No hardcoded 2021 mockups. Displays real dynamic dates (e.g. today's date formatted).
- **Interactive Month Navigation**: Working `<` and `>` buttons in both the header and the mini calendar card to navigate between previous and upcoming months.
- **Accurate Monthly Grids**: Computes real weekdays, start day offset, days in month, and trailing padding for any year/month.
- **Today & Selected Highlighting**: Highlights today's date and active selected day.
- **Milestone & Exam Indicators**: Dots underneath days that have scheduled milestones or exam deadlines.

---

## 🎯 The Three Core Pillars

### 1. Target Exams & Real-Time Competitive Hub (`ExamsView`)
- **4 Major Strategic Categories**:
  - **PSU (Public Sector Undertakings)**: ISRO ICRB, BARC OCES/DGFS, DRDO, ONGC, IOCL, NTPC, BEL, BHEL.
  - **Technical & Research**: GATE CS/DA, AWS Solutions Architect, LeetCode Global Challenges, Codeforces.
  - **Non Technical Govt**: UPSC Civil Services Examination (Prelims/Mains), SSC CGL, Banking PO (IBPS/SBI), Railways RRB.
  - **Offcampus Recruitment Drives**: TCS National Qualifier Test (NQT Ninja & Digital), Infosys HackWithInfy, Amazon WOW, Google Summer of Code.
- **Open-Source Real-Time API Stream**:
  - Live client-side connection with open-source competitive coding feeds (`kontests.net`) and verified national recruitment feeds.
  - Active Radar Pulse indicator with real-time status and 1-click **"Sync Live Feeds"** refresh.
  - 1-click **"+ Track in My Exams"** to import any live notification into your personal target tracking workspace.
- **Comprehensive Examination Blueprint Modal**:
  - **Registration $\rightarrow$ Exam Day Stepper**: Clear timeline showing registration start, closing deadline, and exam date with countdowns.
  - **Exam Pattern & Mode Specifications**: Mode (Online CBT / Offline OMR), Duration (e.g. 180 Mins), Total Questions, and Negative Marking (e.g. -0.33 per wrong answer).
  - **Cutoff Benchmark vs Target Score Meter**: Visual comparative safety buffer showing qualifying cutoff against your target goal.
  - **Marks Distribution & Subject Weightages**: Individual syllabus subjects with weightage percentages, completion progress, and direct portal links.
- **Dual View Layout Switcher**:
  - **Grid Cards View**: Visual cards with status tags, registration countdowns, pattern chips, score buffers, and quick action buttons.
  - **Comparative Matrix Table**: Dense high-level overview table comparing all exams across categories, deadlines, durations, and marks.

### 2. Software Projects & Future Ideas Lab (`ProjectsView`)
- **Dual-Track Workflow**:
  - **Active Portfolio Builds** (`current`): Projects currently in active development, polishing, or deployed.
  - **Future Ideas Incubator** (`future_idea`): Backlog for novel project concepts, architecture ideas, and exploratory tech stacks.
- **Domain & Difficulty Tagging**: Full Stack, AI/ML, Cloud & DevOps, Mobile, Systems, Blockchain, etc.
- **Tech Stack Badges**: Visual tag pills (e.g. `React`, `Node.js`, `Docker`, `Python`, `PostgreSQL`).
- **Showcase Links & Notes**: Store GitHub repository links, live deployment URLs, key features, and core learning takeaways.

### 3. Courses & Skillset Matrix (`CoursesView`)
- **Skill Proficiency Matrix**:
  - Track programming languages, frameworks, databases, and DevOps tools with percentage progress bars.
  - Proficiency levels: Beginner, Intermediate, Advanced, Expert.
- **Course & Certification Tracker**:
  - Manage courses across Coursera, Udemy, YouTube, edX, MIT OCW, freeCodeCamp, etc.
  - Track completion progress (0–100%), platform badges, instructor, verified certificate URLs, and key takeaways.

---

## ⚡ Architecture & Lightweight Bundle

- **Core Framework**: React 18 + Vite 5 (ultra-fast build and hot module replacement).
- **Icons**: Lucide React + custom inline SVG illustrations.
- **State Management**: Reactive state persisted in `localStorage` with rich default demo seed data.
- **Celebration Effects**: `canvas-confetti` animations triggered on milestone completion.
- **Production Bundle Size**:
  - Total compressed size: **~77 KB (gzip)**
  - Zero heavy charting libraries: SVG-powered spline line charts and concentric rings for maximum speed and zero dependencies.

---

## ☁️ Deployment on Vercel

The project is pre-configured with `vercel.json` for one-click deployment on **Vercel**:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Option A: Deploy via Vercel Web Dashboard (Recommended)

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete dynamic calendar, dark mode, and vercel deployment"
   git push origin main
   ```
2. Log in to [vercel.com](https://vercel.com) and click **Add New...** $\rightarrow$ **Project**.
3. Select your repository and click **Import**.
4. Vercel automatically detects **Vite** as the framework.
5. Click **Deploy**. Your app will build and deploy globally in seconds!

### Option B: Deploy via Vercel CLI

```bash
npm install -g vercel
vercel
# For production deployment:
vercel --prod
```

---

## 💻 Local Setup & Development

### Prerequisites
- Node.js 18+ (tested on Node 20.11)
- npm or pnpm

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rohan00kumar/TaskMangement.git
   cd TaskMangement
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:3000`.

4. **Build for production:**
   ```bash
   npm run build
   ```
   The production-ready assets will be generated in `dist/`.

---

## 📄 License

This project is open-source under the MIT License.

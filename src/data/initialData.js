import { getRelativeDate } from '../utils/dateUtils';

// Correlated future storage seed data for PathFlow
export const initialData = {
  user: {
    name: "Rohan Kumar",
    role: "Full Stack Builder & Student",
    brandName: "PathFlow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80"
  },

  // Upcoming Focus Sessions & Milestones
  upcomingTimeline: [
    {
      id: "ev-1",
      title: "Data Structures: Graph & Trees Practice",
      time: "10:00 AM",
      assignees: "Self Focus",
      accent: "blue",
      category: "Exam Prep",
      tag: "GATE CS",
      completed: true
    },
    {
      id: "ev-2",
      title: "Full-Stack SaaS Architecture Review",
      time: "11:30 AM",
      assignees: "Self Focus",
      accent: "coral",
      category: "Project Build",
      tag: "React & Vite",
      completed: false
    },
    {
      id: "ev-3",
      title: "Operating Systems: Process Synchronization",
      time: "02:00 PM",
      assignees: "Self Focus",
      accent: "cyan",
      category: "Core CS",
      tag: "Computer Science",
      completed: false
    },
    {
      id: "ev-4",
      title: "Docker & Kubernetes Container Networking",
      time: "04:30 PM",
      assignees: "Self Focus",
      accent: "green",
      category: "Course",
      tag: "DevOps & Cloud",
      completed: false
    }
  ],

  // =========================================================================
  // PILLAR 1: TARGET EXAMS & CATEGORIZED SUBJECT WEIGHTAGES
  // Dates are fully correlated with today's real date (Live now + Future targets)
  // =========================================================================
  exams: [
    {
      id: "exam-isro-2027",
      title: "ISRO Scientist / Engineer 'SC' (ICRB Recruitment)",
      category: "PSU",
      organization: "Indian Space Research Organisation",
      examType: "Central PSU Direct Recruitment",
      registrationStart: getRelativeDate(-8), // Registration opened 8 days ago
      registrationEnd: getRelativeDate(18),   // Closes in 18 days (LIVE NOW!)
      examDate: getRelativeDate(75),          // Exam in 75 days
      totalMarks: 100,
      cutoffMarks: 68.0,
      targetMarks: 85.0,
      status: "registering",
      priority: "high",
      websiteUrl: "https://www.isro.gov.in/careers",
      youtubeUrl: "https://www.youtube.com/results?search_query=isro+scientist+sc+exam+preparation+strategy",
      examPattern: {
        mode: "Online CBT (Computer Based)",
        duration: "120 Mins (2 Hours)",
        totalQuestions: "80 MCQs",
        negativeMarking: "-0.33 marks per wrong answer"
      },
      marksDistribution: "Core Discipline (80 Marks), Aptitude & Reasoning (20 Marks)",
      syllabusSummary: "Computer Organization, Discrete Math, Data Structures, Algorithms, OS, Networks, DBMS, Compilers.",
      subjects: [
        { id: "isro-s1", name: "Computer Organization & Architecture", category: "Core Technical Discipline", weightage: 20, status: "in_progress" },
        { id: "isro-s2", name: "Data Structures & Algorithms", category: "Core Technical Discipline", weightage: 25, status: "completed" },
        { id: "isro-s3", name: "Operating Systems & Concurrency", category: "Core Technical Discipline", weightage: 20, status: "in_progress" },
        { id: "isro-s4", name: "Databases & Computer Networks", category: "Core Technical Discipline", weightage: 15, status: "to_study" },
        { id: "isro-s5", name: "General Aptitude & Logical Reasoning", category: "General Aptitude & Reasoning", weightage: 20, status: "completed" }
      ]
    },
    {
      id: "exam-tcs-nqt-2027",
      title: "TCS National Qualifier Test (NQT Ninja & Digital Cadre)",
      category: "Offcampus",
      organization: "Tata Consultancy Services (TCS iON)",
      examType: "National Industry Off-Campus Hiring Drive",
      registrationStart: getRelativeDate(-5), // Registration opened 5 days ago
      registrationEnd: getRelativeDate(22),   // Closes in 22 days (LIVE NOW!)
      examDate: getRelativeDate(60),          // Exam in 60 days
      totalMarks: 100,
      cutoffMarks: 65.0,
      targetMarks: 88.0,
      status: "registering",
      priority: "high",
      websiteUrl: "https://learning.tcsionhub.in/hub/national-qualifier-test",
      youtubeUrl: "https://www.youtube.com/results?search_query=tcs+nqt+2026+preparation+coding+questions",
      examPattern: {
        mode: "Online Proctored / TCS iON Center",
        duration: "165 Mins",
        totalQuestions: "82 Questions (Cognitive + 2 Coding)",
        negativeMarking: "No negative marking"
      },
      marksDistribution: "Advanced Hands-on Coding (35%), Numerical (25%), Reasoning (25%), Verbal (15%)",
      syllabusSummary: "Advanced Hands-on Coding (Python/Java/C++), Quantitative Aptitude, Logical Reasoning, Verbal Ability.",
      subjects: [
        { id: "tcs-s1", name: "Advanced Algorithmic Coding (2 Problems)", category: "Advanced Coding & Development", weightage: 35, status: "completed" },
        { id: "tcs-s2", name: "Numerical & Quantitative Aptitude", category: "Cognitive & Analytical Foundations", weightage: 25, status: "in_progress" },
        { id: "tcs-s3", name: "Logical & Inductive Reasoning", category: "Cognitive & Analytical Foundations", weightage: 25, status: "completed" },
        { id: "tcs-s4", name: "Verbal Ability & Professional Communication", category: "Cognitive & Analytical Foundations", weightage: 15, status: "completed" }
      ]
    },
    {
      id: "exam-gate-2027",
      title: "GATE Computer Science & Information Technology (GATE CS)",
      category: "Technical",
      organization: "IIT / IISc National Coordination Board",
      examType: "National Competitive Exam & PSU Direct Gateway",
      registrationStart: getRelativeDate(20), // Opens in 20 days
      registrationEnd: getRelativeDate(55),   // Closes in 55 days (Upcoming)
      examDate: getRelativeDate(110),         // Scheduled in 110 days
      totalMarks: 100,
      cutoffMarks: 32.5,
      targetMarks: 75.0,
      status: "in_preparation",
      priority: "high",
      websiteUrl: "https://gate2026.iit.ac.in",
      youtubeUrl: "https://www.youtube.com/results?search_query=gate+computer+science+complete+preparation+roadmap",
      examPattern: {
        mode: "Online CBT (3 Hours)",
        duration: "180 Mins",
        totalQuestions: "65 Questions (MCQ, MSQ, NAT)",
        negativeMarking: "-0.33 for 1-mark, -0.66 for 2-mark MCQs"
      },
      marksDistribution: "Core CS (70 Marks), Engg Math & Discrete (15 Marks), General Aptitude (15 Marks)",
      syllabusSummary: "Algorithms, Data Structures, Operating Systems, DBMS, Computer Networks, Theory of Computation, Compilers, Architecture, Discrete Math.",
      subjects: [
        { id: "sub-1", name: "Data Structures & Algorithms", category: "Core Computer Science", weightage: 16, status: "completed" },
        { id: "sub-2", name: "Operating Systems & Concurrency", category: "Core Computer Science", weightage: 12, status: "in_progress" },
        { id: "sub-3", name: "Theory of Computation & Compiler Design", category: "Core Computer Science", weightage: 12, status: "to_study" },
        { id: "sub-4", name: "Computer Networks & Protocol Design", category: "Core Computer Science", weightage: 10, status: "in_progress" },
        { id: "sub-5", name: "Databases (DBMS & SQL Optimization)", category: "Core Computer Science", weightage: 10, status: "completed" },
        { id: "sub-6", name: "Computer Organization & Architecture", category: "Core Computer Science", weightage: 10, status: "to_study" },
        { id: "sub-7", name: "Discrete Mathematics & Combinatorics", category: "Engineering Mathematics", weightage: 10, status: "revision" },
        { id: "sub-8", name: "Linear Algebra & Probability", category: "Engineering Mathematics", weightage: 5, status: "completed" },
        { id: "sub-9", name: "General Aptitude & Logical Reasoning", category: "General Aptitude", weightage: 15, status: "completed" }
      ]
    },
    {
      id: "exam-ssc-cgl-2027",
      title: "SSC Combined Graduate Level (CGL Tier-I)",
      category: "Non Technical",
      organization: "Staff Selection Commission (Govt of India)",
      examType: "Central Govt Group B & C Officer Recruitment",
      registrationStart: getRelativeDate(-10), // Opened 10 days ago
      registrationEnd: getRelativeDate(14),   // Closes in 14 days (LIVE NOW!)
      examDate: getRelativeDate(85),          // Exam in 85 days
      totalMarks: 200,
      cutoffMarks: 135.0,
      targetMarks: 165.0,
      status: "registering",
      priority: "medium",
      websiteUrl: "https://ssc.gov.in",
      youtubeUrl: "https://www.youtube.com/results?search_query=ssc+cgl+2026+preparation+strategy+syllabus",
      examPattern: {
        mode: "Online CBT (Objective MCQ)",
        duration: "60 Mins",
        totalQuestions: "100 MCQs (4 Sections x 25 Qs)",
        negativeMarking: "-0.50 marks per incorrect response"
      },
      marksDistribution: "Quantitative (50M), Reasoning (50M), English (50M), General Awareness (50M)",
      syllabusSummary: "Arithmetic, Advanced Math (Geometry, Algebra, Trigonometry), Reasoning, English Grammar, Static GK.",
      subjects: [
        { id: "ssc-s1", name: "Quantitative Aptitude & Advanced Math", category: "Mathematical & Numerical Skills", weightage: 25, status: "in_progress" },
        { id: "ssc-s2", name: "General Intelligence & Analytical Reasoning", category: "Logical Reasoning", weightage: 25, status: "completed" },
        { id: "ssc-s3", name: "English Comprehension & Grammar", category: "Language Proficiency", weightage: 25, status: "completed" },
        { id: "ssc-s4", name: "General Awareness & Static GK", category: "General Awareness", weightage: 25, status: "to_study" }
      ]
    },
    {
      id: "exam-infy-hack-2027",
      title: "Infosys HackWithInfy & Specialist Programmer Hiring",
      category: "Offcampus",
      organization: "Infosys Limited",
      examType: "National Hackathon & High-Package Campus Drive",
      registrationStart: getRelativeDate(-3), // Opened 3 days ago
      registrationEnd: getRelativeDate(25),   // Closes in 25 days (LIVE NOW!)
      examDate: getRelativeDate(68),          // Round 1 in 68 days
      totalMarks: 100,
      cutoffMarks: 60.0,
      targetMarks: 90.0,
      status: "registering",
      priority: "high",
      websiteUrl: "https://www.infosys.com/careers",
      youtubeUrl: "https://www.youtube.com/results?search_query=hackwithinfy+preparation+coding+questions",
      examPattern: {
        mode: "Online Competitive Coding Sandbox",
        duration: "180 Mins",
        totalQuestions: "3 Hard Algorithmic Problems",
        negativeMarking: "Testcase partial evaluation"
      },
      marksDistribution: "Data Structures & Trees (35%), Dynamic Programming (40%), Graph Algorithms (25%)",
      syllabusSummary: "Dynamic Programming, Trees, Graphs, Segment Trees, Bit Manipulation, String Algorithms.",
      subjects: [
        { id: "infy-s1", name: "Dynamic Programming & Optimization", category: "Advanced Data Structures & Algorithms", weightage: 40, status: "in_progress" },
        { id: "infy-s2", name: "Graph Theory & Network Flows", category: "Advanced Data Structures & Algorithms", weightage: 35, status: "to_study" },
        { id: "infy-s3", name: "Trees, Tries & String Matching", category: "Advanced Data Structures & Algorithms", weightage: 25, status: "completed" }
      ]
    }
  ],

  // =========================================================================
  // PILLAR 2: PROJECTS & FUTURE IDEAS
  // =========================================================================
  projects: [
    {
      id: "proj-1",
      title: "AI Autonomous Coding Assistant",
      projectType: "current",
      domain: "AI / ML & Full Stack",
      difficulty: "Advanced",
      status: "in_progress",
      techStack: "Python, FastAPI, React, Vite, Claude API, Docker",
      githubUrl: "https://github.com/rohan/ai-assistant",
      liveUrl: "https://ai-assistant.vercel.app",
      keyFeatures: "Multi-agent tool orchestration, AST search, streaming token responses.",
      learningOutcomes: "Agentic workflow patterns, context window budgeting, async Python WSGI."
    },
    {
      id: "proj-2",
      title: "Cloud Microservices Task Orchestrator",
      projectType: "current",
      domain: "Cloud & DevOps",
      difficulty: "Advanced",
      status: "completed",
      techStack: "Go, Docker, Kubernetes, gRPC, Redis, PostgreSQL",
      githubUrl: "https://github.com/rohan/micro-orch",
      liveUrl: "",
      keyFeatures: "Distributed worker pool, idempotent job queuing, Prometheus metrics export.",
      learningOutcomes: "Concurrency models, distributed locking, Helm deployment pipelines."
    },
    {
      id: "proj-3",
      title: "Modern SaaS Analytics Dashboard",
      projectType: "current",
      domain: "Full Stack",
      difficulty: "Intermediate",
      status: "deployed",
      techStack: "React, CSS Variables, SVG Charts, Node.js, Vercel",
      githubUrl: "https://github.com/rohan/saas-dashboard",
      liveUrl: "https://saas-dash.vercel.app",
      keyFeatures: "Pixel-perfect reproduction, fluid responsive layout, SVG charts.",
      learningOutcomes: "Advanced CSS Grid, custom SVG spline rendering, localStorage hydration."
    },
    {
      id: "proj-4",
      title: "Decentralized Academic Credential Verifier",
      projectType: "future_idea",
      domain: "Blockchain / Web3",
      difficulty: "Advanced",
      status: "ideation",
      techStack: "Solidity, Ethereum, IPFS, Next.js, Ethers.js",
      githubUrl: "",
      liveUrl: "",
      keyFeatures: "Zero-knowledge proof tamper verification of university diplomas and exam marks.",
      learningOutcomes: "Smart contract security, gas optimization, IPFS content addressing."
    },
    {
      id: "proj-5",
      title: "Edge Realtime Workout Pose Estimator",
      projectType: "future_idea",
      domain: "AI / Computer Vision",
      difficulty: "Intermediate",
      status: "ideation",
      techStack: "TensorFlow.js, MediaPipe, React, WebRTC",
      githubUrl: "",
      liveUrl: "",
      keyFeatures: "Live video landmark detection, repetition counter, real-time posture feedback.",
      learningOutcomes: "WebGL shaders in browser, mobile hardware acceleration."
    }
  ],

  // =========================================================================
  // PILLAR 3: COURSES & SKILLSETS
  // =========================================================================
  courses: [
    {
      id: "course-1",
      title: "Machine Learning Specialization",
      platform: "Coursera",
      instructor: "Andrew Ng / DeepLearning.AI",
      category: "AI & Data Science",
      status: "in_progress",
      certificateUrl: "https://coursera.org/verify/ML-ANDREW-NG",
      keyLearnings: "Supervised learning, neural networks, cost functions, gradient descent optimization."
    },
    {
      id: "course-2",
      title: "Full Stack Web Development with React & Node",
      platform: "freeCodeCamp",
      instructor: "freeCodeCamp Curriculum",
      category: "Web Development",
      status: "completed",
      certificateUrl: "https://freecodecamp.org/certification/user/react",
      keyLearnings: "RESTful architecture, React hooks, state management, full production deployment."
    },
    {
      id: "course-3",
      title: "Docker & Kubernetes: The Practical Guide",
      platform: "Udemy",
      instructor: "Maximilian Schwarzmüller",
      category: "Cloud & DevOps",
      status: "in_progress",
      certificateUrl: "",
      keyLearnings: "Multi-stage Dockerfiles, Docker Compose networking, K8s Pods, Services, Deployments."
    },
    {
      id: "course-4",
      title: "Distributed Systems & System Design",
      platform: "MIT OCW / YouTube",
      instructor: "Robert Morris (MIT 6.824)",
      category: "Core CS",
      status: "in_progress",
      certificateUrl: "",
      keyLearnings: "MapReduce, Raft consensus algorithm, fault tolerance, replication strategies."
    }
  ],

  skills: [
    { id: "sk-1", name: "Python", category: "Language", proficiency: "Expert" },
    { id: "sk-2", name: "React.js / JavaScript", category: "Framework", proficiency: "Expert" },
    { id: "sk-3", name: "Algorithms & Data Structures", category: "Core CS", proficiency: "Advanced" },
    { id: "sk-4", name: "PostgreSQL & Database Design", category: "Database", proficiency: "Advanced" },
    { id: "sk-5", name: "Docker & Containerization", category: "DevOps & Cloud", proficiency: "Advanced" },
    { id: "sk-6", name: "Kubernetes & Orchestration", category: "DevOps & Cloud", proficiency: "Intermediate" },
    { id: "sk-7", name: "FastAPI / Node.js Backends", category: "Framework", proficiency: "Advanced" },
    { id: "sk-8", name: "Linux System Administration", category: "Tool", proficiency: "Advanced" }
  ]
};

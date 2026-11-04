// Default storage seed data for PathFlow
export const initialData = {
  user: {
    name: "Rohan Kumar",
    role: "Full Stack Builder & Student",
    brandName: "PathFlow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80"
  },

  // 6-Month Work History Chart (Task Activity Trend)
  workChart: {
    period: "6 Month",
    months: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    values: [35, 48, 42, 60, 72, 58],
    tooltipIndex: 4, // Oct/Nov highlight
    label: "Tasks",
    granularity: "Weekly"
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
      title: "Full-Stack SaaS Landing Page Design",
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
  // PILLAR 1: TARGET EXAMS & SUBJECT WEIGHTAGES
  // =========================================================================
  exams: [
    {
      id: "exam-isro-2026",
      title: "ISRO Scientist / Engineer 'SC' (ICRB)",
      category: "PSU",
      organization: "Indian Space Research Organisation",
      examType: "Central PSU Direct Recruitment",
      examDate: "2026-05-18",
      registrationStart: "2026-03-01",
      registrationEnd: "2026-03-24",
      totalMarks: 100,
      cutoffMarks: 68.0,
      targetMarks: 85.0,
      status: "in_preparation",
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
        { id: "isro-s1", name: "Core Technical Computer Science", weightage: 80, status: "in_progress" },
        { id: "isro-s2", name: "General Aptitude & Reasoning", weightage: 20, status: "completed" }
      ]
    },
    {
      id: "exam-gate-2027",
      title: "GATE Computer Science & IT (GATE CS 2027)",
      category: "Technical",
      organization: "IIT / IISc National Coordination Board",
      examType: "National Competitive Exam & PSU Gateway",
      examDate: "2027-02-13",
      registrationStart: "2026-08-25",
      registrationEnd: "2026-10-05",
      totalMarks: 100,
      cutoffMarks: 32.5,
      targetMarks: 75.0,
      status: "in_preparation",
      priority: "high",
      websiteUrl: "https://gate2026.iit.ac.in",
      youtubeUrl: "https://www.youtube.com/results?search_query=gate+computer+science+complete+preparation+roadmap",
      examPattern: {
        mode: "Online CBT",
        duration: "180 Mins (3 Hours)",
        totalQuestions: "65 Questions (MCQ, MSQ, NAT)",
        negativeMarking: "-0.33 for 1-mark, -0.66 for 2-mark MCQs"
      },
      marksDistribution: "Core CS (70 Marks), Engg Math & Discrete (15 Marks), General Aptitude (15 Marks)",
      syllabusSummary: "Algorithms, Data Structures, Operating Systems, DBMS, Computer Networks, Theory of Computation, Compilers, Architecture, Discrete Math.",
      subjects: [
        { id: "sub-1", name: "Data Structures & Algorithms", weightage: 16, status: "completed" },
        { id: "sub-2", name: "Computer Networks & Security", weightage: 10, status: "in_progress" },
        { id: "sub-3", name: "Operating Systems & Concurrency", weightage: 10, status: "in_progress" },
        { id: "sub-4", name: "Theory of Computation & Compilers", weightage: 12, status: "to_study" },
        { id: "sub-5", name: "Engineering Mathematics & Discrete", weightage: 28, status: "revision" },
        { id: "sub-6", name: "Databases (DBMS & SQL)", weightage: 10, status: "completed" },
        { id: "sub-7", name: "General Aptitude & Reasoning", weightage: 14, status: "completed" }
      ]
    },
    {
      id: "exam-tcs-nqt",
      title: "TCS National Qualifier Test (NQT Ninja & Digital)",
      category: "Offcampus",
      organization: "Tata Consultancy Services (TCS iON)",
      examType: "National Industry Off-Campus Hiring",
      examDate: "2026-05-02",
      registrationStart: "2026-03-10",
      registrationEnd: "2026-04-15",
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
      marksDistribution: "Advanced Coding (35%), Numerical (25%), Reasoning (25%), Verbal (15%)",
      syllabusSummary: "Advanced Hands-on Coding (Python/Java/C++), Quantitative Aptitude, Logical Reasoning, Verbal Ability.",
      subjects: [
        { id: "tcs-s1", name: "Advanced Hands-on Coding (2 Algorithmic Problems)", weightage: 35, status: "completed" },
        { id: "tcs-s2", name: "Numerical & Quantitative Aptitude", weightage: 25, status: "in_progress" },
        { id: "tcs-s3", name: "Logical & Inductive Reasoning", weightage: 25, status: "completed" },
        { id: "tcs-s4", name: "Verbal Ability & Communication", weightage: 15, status: "completed" }
      ]
    },
    {
      id: "exam-ssc-cgl-2026",
      title: "SSC Combined Graduate Level (CGL Tier-I)",
      category: "Non Technical",
      organization: "Staff Selection Commission (Govt of India)",
      examType: "Central Govt Group B & C Recruitment",
      examDate: "2026-09-15",
      registrationStart: "2026-06-11",
      registrationEnd: "2026-07-10",
      totalMarks: 200,
      cutoffMarks: 135.0,
      targetMarks: 165.0,
      status: "in_preparation",
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
        { id: "ssc-s1", name: "Quantitative Aptitude & Advanced Math", weightage: 25, status: "in_progress" },
        { id: "ssc-s2", name: "General Intelligence & Reasoning", weightage: 25, status: "completed" },
        { id: "ssc-s3", name: "English Comprehension & Grammar", weightage: 25, status: "completed" },
        { id: "ssc-s4", name: "General Awareness & Static GK", weightage: 25, status: "to_study" }
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
      progress: 85,
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
      progress: 100,
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
      progress: 70,
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
      progress: 50,
      status: "in_progress",
      certificateUrl: "",
      keyLearnings: "MapReduce, Raft consensus algorithm, fault tolerance, replication strategies."
    }
  ],

  skills: [
    { id: "sk-1", name: "Python", category: "Language", proficiency: "Expert", levelPercent: 92 },
    { id: "sk-2", name: "React.js / JavaScript", category: "Framework", proficiency: "Expert", levelPercent: 90 },
    { id: "sk-3", name: "Algorithms & Data Structures", category: "Core CS", proficiency: "Advanced", levelPercent: 88 },
    { id: "sk-4", name: "PostgreSQL & Database Design", category: "Database", proficiency: "Advanced", levelPercent: 85 },
    { id: "sk-5", name: "Docker & Containerization", category: "DevOps & Cloud", proficiency: "Advanced", levelPercent: 80 },
    { id: "sk-6", name: "Kubernetes & Orchestration", category: "DevOps & Cloud", proficiency: "Intermediate", levelPercent: 70 },
    { id: "sk-7", name: "FastAPI / Node.js Backends", category: "Framework", proficiency: "Advanced", levelPercent: 86 },
    { id: "sk-8", name: "Linux System Administration", category: "Tool", proficiency: "Advanced", levelPercent: 82 }
  ]
};

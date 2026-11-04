// Open-Source Standard Syllabus & Subjects Database
// Automatically populates official subject names, weightage allocations, and syllabus scopes

export const OPEN_SYLLABUS_PRESETS = [
  {
    id: "gate-cs",
    name: "GATE Computer Science & Information Technology (CS/IT)",
    category: "Technical",
    organization: "IIT / IISc GATE Committee",
    examPattern: {
      mode: "Online CBT",
      duration: "180 Mins",
      totalQuestions: "65 Questions (MCQ, MSQ, NAT)",
      negativeMarking: "-0.33 for 1-mark, -0.66 for 2-mark MCQs"
    },
    totalMarks: 100,
    cutoffMarks: 28.5,
    targetMarks: 75.0,
    marksDistribution: "Core CS (70 Marks), Engg Math & Discrete (15 Marks), General Aptitude (15 Marks)",
    syllabusSummary: "Engineering Math, Discrete Math, Digital Logic, Computer Architecture, Data Structures, Algorithms, Theory of Computation, Compiler Design, OS, DBMS, Computer Networks.",
    subjects: [
      { id: "gcs-1", name: "Data Structures & Algorithms", category: "Core Computer Science", weightage: 16, status: "in_progress" },
      { id: "gcs-2", name: "Operating Systems & System Software", category: "Core Computer Science", weightage: 12, status: "in_progress" },
      { id: "gcs-3", name: "Computer Networks & Security", category: "Core Computer Science", weightage: 11, status: "to_study" },
      { id: "gcs-4", name: "Database Management Systems (DBMS)", category: "Core Computer Science", weightage: 10, status: "completed" },
      { id: "gcs-5", name: "Theory of Computation & Automata", category: "Core Computer Science", weightage: 9, status: "to_study" },
      { id: "gcs-6", name: "Compiler Design & Syntax Analysis", category: "Core Computer Science", weightage: 6, status: "to_study" },
      { id: "gcs-7", name: "Computer Organization & Architecture", category: "Core Computer Science", weightage: 8, status: "in_progress" },
      { id: "gcs-8", name: "Discrete Mathematics & Linear Algebra", category: "Engineering Mathematics", weightage: 13, status: "completed" },
      { id: "gcs-9", name: "General Aptitude & Verbal Reasoning", category: "General Aptitude", weightage: 15, status: "completed" }
    ]
  },
  {
    id: "gate-da",
    name: "GATE Data Science & Artificial Intelligence (DA)",
    category: "Technical",
    organization: "IIT / IISc GATE Committee",
    examPattern: {
      mode: "Online CBT",
      duration: "180 Mins",
      totalQuestions: "65 Questions",
      negativeMarking: "-0.33 for 1-mark, -0.66 for 2-mark MCQs"
    },
    totalMarks: 100,
    cutoffMarks: 32.0,
    targetMarks: 78.0,
    marksDistribution: "Machine Learning & AI (40 Marks), Math & Stats (30 Marks), Programming & DB (15 Marks), GA (15 Marks)",
    syllabusSummary: "Probability & Statistics, Linear Algebra, Calculus, Python Programming, Data Structures, DBMS, Machine Learning, Artificial Intelligence.",
    subjects: [
      { id: "gda-1", name: "Machine Learning (Supervised & Unsupervised)", category: "Machine Learning & AI", weightage: 22, status: "in_progress" },
      { id: "gda-2", name: "Artificial Intelligence (Search, Logic, Reasoning)", category: "Machine Learning & AI", weightage: 18, status: "in_progress" },
      { id: "gda-3", name: "Probability & Mathematical Statistics", category: "Mathematical Foundations", weightage: 18, status: "completed" },
      { id: "gda-4", name: "Linear Algebra & Optimization", category: "Mathematical Foundations", weightage: 14, status: "completed" },
      { id: "gda-5", name: "Python Programming & Data Structures", category: "Programming & Data Structures", weightage: 13, status: "completed" },
      { id: "gda-6", name: "General Aptitude & Analytical Reasoning", category: "General Aptitude", weightage: 15, status: "completed" }
    ]
  },
  {
    id: "isro-icrb-cs",
    name: "ISRO Scientist / Engineer 'SC' (Computer Science)",
    category: "PSU",
    organization: "Indian Space Research Organisation (ISRO)",
    examPattern: {
      mode: "Online CBT",
      duration: "120 Mins",
      totalQuestions: "80 MCQs",
      negativeMarking: "-0.33 marks per incorrect answer"
    },
    totalMarks: 100,
    cutoffMarks: 68.0,
    targetMarks: 85.0,
    marksDistribution: "Core Technical Discipline (80%), General Aptitude & Reasoning (20%)",
    syllabusSummary: "Computer Architecture, Discrete Math, Data Structures, Algorithms, OS, Networks, DBMS, Compilers, Satellite Ground Software Basics.",
    subjects: [
      { id: "isro-1", name: "Algorithms, Data Structures & C Programming", category: "Core Technical Discipline", weightage: 25, status: "completed" },
      { id: "isro-2", name: "Computer Architecture & Organization", category: "Core Technical Discipline", weightage: 18, status: "in_progress" },
      { id: "isro-3", name: "Operating Systems, Concurrency & Memory", category: "Core Technical Discipline", weightage: 16, status: "in_progress" },
      { id: "isro-4", name: "Computer Networks & Protocols", category: "Core Technical Discipline", weightage: 12, status: "to_study" },
      { id: "isro-5", name: "Discrete Math & Logic", category: "Engineering Mathematics", weightage: 9, status: "completed" },
      { id: "isro-6", name: "General Aptitude, Numerical & Spatial Ability", category: "General Aptitude & Reasoning", weightage: 20, status: "completed" }
    ]
  },
  {
    id: "barc-oces-cs",
    name: "BARC Scientific Officer (OCES / DGFS Computer Science)",
    category: "PSU",
    organization: "Bhabha Atomic Research Centre",
    examPattern: {
      mode: "Online CBT",
      duration: "120 Mins",
      totalQuestions: "100 MCQs (+3 correct, -1 wrong)",
      negativeMarking: "-1.00 marks per wrong answer"
    },
    totalMarks: 300,
    cutoffMarks: 185.0,
    targetMarks: 240.0,
    marksDistribution: "100% Core Technical Computer Science Discipline",
    syllabusSummary: "Rigorous focus on core fundamental computer science, algorithms, theoretical computer science, operating systems, and discrete structures.",
    subjects: [
      { id: "barc-1", name: "Algorithms, Complexity & Data Structures", category: "Core Technical Discipline", weightage: 26, status: "in_progress" },
      { id: "barc-2", name: "Operating Systems & Systems Architecture", category: "Core Technical Discipline", weightage: 24, status: "in_progress" },
      { id: "barc-3", name: "Theoretical Computer Science & Compilers", category: "Core Technical Discipline", weightage: 20, status: "to_study" },
      { id: "barc-4", name: "Computer Networks & Network Security", category: "Core Technical Discipline", weightage: 16, status: "to_study" },
      { id: "barc-5", name: "Engineering Mathematics & Discrete Logic", category: "Engineering Mathematics", weightage: 14, status: "completed" }
    ]
  },
  {
    id: "tcs-nqt-ninja-digital",
    name: "TCS National Qualifier Test (NQT Ninja & Digital)",
    category: "Offcampus",
    organization: "Tata Consultancy Services (TCS iON)",
    examPattern: {
      mode: "Online Proctored / TCS iON Center",
      duration: "165 Mins",
      totalQuestions: "82 Questions (Cognitive + 2 Hands-on Coding)",
      negativeMarking: "No negative marking"
    },
    totalMarks: 100,
    cutoffMarks: 65.0,
    targetMarks: 88.0,
    marksDistribution: "Advanced Coding (35%), Numerical Ability (25%), Reasoning (25%), Verbal Ability (15%)",
    syllabusSummary: "Advanced Hands-on Coding (Python/Java/C++), Quantitative Aptitude, Logical & Inductive Reasoning, Verbal Ability.",
    subjects: [
      { id: "tcs-1", name: "Advanced Hands-on Coding (2 Algorithmic Problems)", category: "Advanced Coding & Development", weightage: 35, status: "completed" },
      { id: "tcs-2", name: "Numerical & Quantitative Aptitude", category: "Cognitive & Analytical Foundations", weightage: 25, status: "in_progress" },
      { id: "tcs-3", name: "Logical & Inductive Reasoning", category: "Cognitive & Analytical Foundations", weightage: 25, status: "completed" },
      { id: "tcs-4", name: "Verbal Ability & Technical Communication", category: "Cognitive & Analytical Foundations", weightage: 15, status: "completed" }
    ]
  },
  {
    id: "infosys-hackwithinfy",
    name: "Infosys HackWithInfy / InfyTQ Elite Coding Drive",
    category: "Offcampus",
    organization: "Infosys Limited",
    examPattern: {
      mode: "Online Code Sandbox (HackerEarth/CodeChef)",
      duration: "180 Mins",
      totalQuestions: "3 Algorithmic Coding Challenges",
      negativeMarking: "Testcase-based partial scoring"
    },
    totalMarks: 300,
    cutoffMarks: 180.0,
    targetMarks: 260.0,
    marksDistribution: "Problem 1 Easy-Medium (50M), Problem 2 Medium-Hard (100M), Problem 3 Hard (150M)",
    syllabusSummary: "Dynamic Programming, Graph Theory, Trees, String Manipulation, Backtracking, Computational Geometry.",
    subjects: [
      { id: "infy-1", name: "Dynamic Programming & Optimization", category: "Advanced Algorithms", weightage: 40, status: "completed" },
      { id: "infy-2", name: "Graph Algorithms (BFS/DFS, Dijkstra, MST)", category: "Advanced Algorithms", weightage: 35, status: "in_progress" },
      { id: "infy-3", name: "Advanced Trees, Tries & Segment Structures", category: "Advanced Algorithms", weightage: 25, status: "to_study" }
    ]
  },
  {
    id: "offcampus-tier1-drive",
    name: "Cognizant / Wipro / Accenture Offcampus Drive",
    category: "Offcampus",
    organization: "National IT Major Recruitment",
    examPattern: {
      mode: "Online Proctored Web Platform",
      duration: "135 Mins",
      totalQuestions: "70 Qs + 2 Coding Problems",
      negativeMarking: "No negative marking"
    },
    totalMarks: 100,
    cutoffMarks: 60.0,
    targetMarks: 85.0,
    marksDistribution: "Coding & Automata (35%), Quantitative (25%), Logical (25%), Verbal (15%)",
    syllabusSummary: "Basic Coding, Pseudocode Analysis, Logical Reasoning, Quantitative Math, Business English.",
    subjects: [
      { id: "offc-1", name: "Data Structures & Hands-on Coding", category: "Technical Development", weightage: 35, status: "in_progress" },
      { id: "offc-2", name: "Pseudocode & Technical Automata", category: "Technical Development", weightage: 20, status: "completed" },
      { id: "offc-3", name: "Quantitative Mathematics & Data Interpretation", category: "General Aptitude", weightage: 25, status: "in_progress" },
      { id: "offc-4", name: "Logical Reasoning & Communication", category: "General Aptitude", weightage: 20, status: "completed" }
    ]
  },
  {
    id: "upsc-cse-prelims",
    name: "UPSC Civil Services Examination (CSE) Prelims",
    category: "Non Technical",
    organization: "Union Public Service Commission",
    examPattern: {
      mode: "Offline OMR Pen-and-Paper (Two Sessions)",
      duration: "4 Hours (Paper I: 2h + Paper II CSAT: 2h)",
      totalQuestions: "Paper I: 100 Qs, Paper II: 80 Qs",
      negativeMarking: "-0.33 marks per wrong answer"
    },
    totalMarks: 400,
    cutoffMarks: 88.5,
    targetMarks: 115.0,
    marksDistribution: "Paper I GS Merit (200M), Paper II CSAT Qualifying 33% (200M)",
    syllabusSummary: "Indian Polity & Constitution, Economy, Modern History & Freedom Struggle, Geography & Environment, CSAT Comprehension.",
    subjects: [
      { id: "upsc-1", name: "Indian Polity & Constitution", category: "General Studies Paper I", weightage: 25, status: "revision" },
      { id: "upsc-2", name: "Indian Economy & Sustainable Development", category: "General Studies Paper I", weightage: 25, status: "in_progress" },
      { id: "upsc-3", name: "Modern History, Art & Culture", category: "General Studies Paper I", weightage: 25, status: "in_progress" },
      { id: "upsc-4", name: "CSAT Comprehension, Reasoning & Logic", category: "CSAT Paper II", weightage: 25, status: "completed" }
    ]
  },
  {
    id: "ssc-cgl-tier1",
    name: "SSC Combined Graduate Level (CGL) Tier-I",
    category: "Non Technical",
    organization: "Staff Selection Commission (Govt of India)",
    examPattern: {
      mode: "Online CBT (Objective MCQ)",
      duration: "60 Mins",
      totalQuestions: "100 MCQs (4 Sections x 25 Qs)",
      negativeMarking: "-0.50 marks per incorrect response"
    },
    totalMarks: 200,
    cutoffMarks: 135.0,
    targetMarks: 165.0,
    marksDistribution: "Quantitative (50M), Reasoning (50M), English (50M), General Awareness (50M)",
    syllabusSummary: "Arithmetic, Advanced Math (Geometry, Algebra, Trigonometry), Reasoning, English Grammar & Vocab, Static GK & Current Affairs.",
    subjects: [
      { id: "ssc-1", name: "Quantitative Aptitude & Advanced Math", category: "Quantitative Foundations", weightage: 25, status: "in_progress" },
      { id: "ssc-2", name: "General Intelligence & Reasoning", category: "Logical Reasoning", weightage: 25, status: "completed" },
      { id: "ssc-3", name: "English Comprehension & Grammar", category: "Language Proficiency", weightage: 25, status: "completed" },
      { id: "ssc-4", name: "General Awareness & Static GK", category: "General Awareness", weightage: 25, status: "to_study" }
    ]
  },
  {
    id: "banking-sbi-po",
    name: "State Bank of India (SBI / IBPS PO) Prelims",
    category: "Non Technical",
    organization: "State Bank of India / IBPS",
    examPattern: {
      mode: "Online CBT (Sectional Timing)",
      duration: "60 Mins (20 Mins per Section)",
      totalQuestions: "100 MCQs",
      negativeMarking: "-0.25 marks per wrong answer"
    },
    totalMarks: 100,
    cutoffMarks: 58.5,
    targetMarks: 76.0,
    marksDistribution: "Quantitative Aptitude (35M), Reasoning Ability (35M), English Language (30M)",
    syllabusSummary: "Data Interpretation, Arithmetic, Seating Arrangements, Puzzles, Syllogisms, Reading Comprehension, Error Detection.",
    subjects: [
      { id: "bank-1", name: "Quantitative Aptitude & Data Interpretation", category: "Quantitative Foundations", weightage: 35, status: "in_progress" },
      { id: "bank-2", name: "Reasoning Ability, Puzzles & Seating", category: "Logical Reasoning", weightage: 35, status: "completed" },
      { id: "bank-3", name: "English Language & Comprehension", category: "Language Skills", weightage: 30, status: "in_progress" }
    ]
  }
];

// Helper to find matching preset
export function detectSyllabusPreset(titleOrCategory = "") {
  const q = titleOrCategory.toLowerCase();
  if (q.includes("gate") && (q.includes("da") || q.includes("data"))) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "gate-da");
  }
  if (q.includes("gate") || q.includes("cs/it") || q.includes("computer science")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "gate-cs");
  }
  if (q.includes("isro")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "isro-icrb-cs");
  }
  if (q.includes("barc")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "barc-oces-cs");
  }
  if (q.includes("tcs") || q.includes("nqt")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "tcs-nqt-ninja-digital");
  }
  if (q.includes("infy") || q.includes("hackwithinfy")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "infosys-hackwithinfy");
  }
  if (q.includes("ssc") || q.includes("cgl")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "ssc-cgl-tier1");
  }
  if (q.includes("bank") || q.includes("sbi") || q.includes("ibps")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "banking-sbi-po");
  }
  if (q.includes("upsc") || q.includes("civil")) {
    return OPEN_SYLLABUS_PRESETS.find((p) => p.id === "upsc-cse-prelims");
  }
  return null;
}

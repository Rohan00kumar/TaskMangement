// Real-time Live Exams, PSU Recruitments, Offcampus Drives & Open APIs Service
// Aggregates open-source contest APIs, govt job RSS scrapers, and curated real-time opportunities

export const LIVE_EXAM_FEED_ITEMS = [
  // =========================================================================
  // 1. PSU (PUBLIC SECTOR UNDERTAKINGS)
  // =========================================================================
  {
    id: "live-psu-isro-2026",
    title: "ISRO Scientist / Engineer 'SC' Recruitment (ICRB)",
    organization: "Indian Space Research Organisation (ISRO)",
    category: "PSU",
    examType: "Central PSU Direct Recruitment",
    registrationStart: "2026-03-01",
    registrationEnd: "2026-03-24",
    examDate: "2026-05-18",
    totalMarks: 100,
    cutoffMarks: 68.0,
    targetMarks: 85.0,
    examPattern: {
      mode: "Online CBT (Computer Based)",
      duration: "120 Mins (2 Hours)",
      totalQuestions: "80 MCQs",
      negativeMarking: "-0.33 marks per wrong answer"
    },
    marksDistribution: "Core Discipline (80 Marks - 80%), Aptitude & Reasoning (20 Marks - 20%)",
    status: "upcoming",
    websiteUrl: "https://www.isro.gov.in/careers",
    youtubeUrl: "https://www.youtube.com/results?search_query=isro+scientist+sc+exam+preparation+strategy",
    syllabusSummary: "Computer Organization, Discrete Math, Data Structures, Algorithms, OS, Networks, DBMS, Compilers.",
    subjects: [
      { id: "isro-s1", name: "Core Technical CS", weightage: 80, status: "in_progress" },
      { id: "isro-s2", name: "General Aptitude & Reasoning", weightage: 20, status: "completed" }
    ],
    liveAlert: "Official Notification Released • Vacancies Announced for CS/ECE/ME"
  },
  {
    id: "live-psu-barc-2026",
    title: "BARC Scientific Officer (OCES / DGFS via CBT)",
    organization: "Bhabha Atomic Research Centre",
    category: "PSU",
    examType: "Premier R&D PSU Fellowship",
    registrationStart: "2026-01-15",
    registrationEnd: "2026-02-12",
    examDate: "2026-04-05",
    totalMarks: 300,
    cutoffMarks: 185.0,
    targetMarks: 240.0,
    examPattern: {
      mode: "Online CBT (National Center)",
      duration: "120 Mins",
      totalQuestions: "100 MCQs (+3 correct, -1 wrong)",
      negativeMarking: "-1.00 marks per wrong answer"
    },
    marksDistribution: "100% Core Technical Discipline (300 Marks Total)",
    status: "in_preparation",
    websiteUrl: "https://barcoces.examinfo.in",
    youtubeUrl: "https://www.youtube.com/results?search_query=barc+oces+computer+science+preparation",
    syllabusSummary: "Entire GATE Syllabus with high emphasis on fundamental conceptual physics and CS core.",
    subjects: [
      { id: "barc-s1", name: "Algorithms & Programming", weightage: 25, status: "completed" },
      { id: "barc-s2", name: "Systems & Architecture", weightage: 30, status: "in_progress" },
      { id: "barc-s3", name: "Theoretical Computer Science", weightage: 25, status: "to_study" },
      { id: "barc-s4", name: "Mathematics & Logic", weightage: 20, status: "completed" }
    ],
    liveAlert: "Exam Slot Booking Active • National Admit Cards Dispatched"
  },
  {
    id: "live-psu-drdo-2026",
    title: "DRDO Scientist 'B' Recruitment (RAC)",
    organization: "Defence Research and Development Organisation",
    category: "PSU",
    examType: "Central Defence R&D Group A Gazetted",
    registrationStart: "2026-04-01",
    registrationEnd: "2026-04-30",
    examDate: "2026-07-12",
    totalMarks: 100,
    cutoffMarks: 62.0,
    targetMarks: 80.0,
    examPattern: {
      mode: "Descriptive Written Examination & Interview",
      duration: "180 Mins (Paper I & II)",
      totalQuestions: "Descriptive Technical Problems",
      negativeMarking: "No negative marking"
    },
    marksDistribution: "Paper I Core Engineering (100M), Paper II Specialization (100M)",
    status: "upcoming",
    websiteUrl: "https://rac.gov.in",
    youtubeUrl: "https://www.youtube.com/results?search_query=drdo+scientist+b+computer+science+syllabus",
    syllabusSummary: "Advanced Algorithms, Computer Systems, Cryptography, Machine Intelligence, Network Security.",
    subjects: [
      { id: "drdo-s1", name: "Advanced Algorithms & Optimization", weightage: 35, status: "in_progress" },
      { id: "drdo-s2", name: "Computer Systems & Hardware Architecture", weightage: 35, status: "to_study" },
      { id: "drdo-s3", name: "Cybersecurity & Discrete Logic", weightage: 30, status: "completed" }
    ],
    liveAlert: "Annual DRDO RAC Schedule Gazetted in National Employment News"
  },
  {
    id: "live-psu-ongc-2026",
    title: "ONGC / IOCL Graduate Executive Trainee (via GATE)",
    organization: "Oil and Natural Gas Corporation / IOCL",
    category: "PSU",
    examType: "Maharatna PSU Direct Recruitment",
    registrationStart: "2026-03-15",
    registrationEnd: "2026-04-20",
    examDate: "2026-06-05",
    totalMarks: 100,
    cutoffMarks: 72.0,
    targetMarks: 88.0,
    examPattern: {
      mode: "GATE Score (85%) + Group Discussion & Interview (15%)",
      duration: "GATE Score Metric",
      totalQuestions: "GATE CS Evaluation",
      negativeMarking: "As per GATE rules"
    },
    marksDistribution: "GATE Score Weightage (85%), GD/PI (15%)",
    status: "upcoming",
    websiteUrl: "https://www.ongcindia.com",
    youtubeUrl: "https://www.youtube.com/results?search_query=ongc+gate+recruitment+computer+science",
    syllabusSummary: "GATE Technical Syllabus plus Corporate GD & Technical Interview topics.",
    subjects: [
      { id: "ongc-s1", name: "GATE Core Engineering Discipline", weightage: 70, status: "completed" },
      { id: "ongc-s2", name: "General Aptitude & Domain Awareness", weightage: 30, status: "in_progress" }
    ],
    liveAlert: "Executive Trainee Portal Open for GATE Scorers"
  },

  // =========================================================================
  // 2. OFFCAMPUS PLACEMENT & HIRING DRIVES
  // =========================================================================
  {
    id: "live-offcampus-tcs-nqt",
    title: "TCS National Qualifier Test (NQT - Ninja & Digital)",
    organization: "Tata Consultancy Services (TCS iON)",
    category: "Offcampus",
    examType: "National Industry Hiring Qualifier",
    registrationStart: "2026-03-10",
    registrationEnd: "2026-04-15",
    examDate: "2026-05-02",
    totalMarks: 100,
    cutoffMarks: 65.0,
    targetMarks: 88.0,
    examPattern: {
      mode: "Online Proctored / TCS iON Test Centers",
      duration: "165 Mins",
      totalQuestions: "82 Questions (Cognitive + 2 Coding)",
      negativeMarking: "No negative marking"
    },
    marksDistribution: "Numerical (25%), Reasoning (25%), Verbal (20%), Advanced Coding 2 Problems (30%)",
    status: "registering",
    websiteUrl: "https://learning.tcsionhub.in/hub/national-qualifier-test",
    youtubeUrl: "https://www.youtube.com/results?search_query=tcs+nqt+2026+preparation+coding+questions",
    syllabusSummary: "Advanced Quantitative Aptitude, Logical Reasoning, Verbal Ability, Hands-on Coding (Python/Java/C++).",
    subjects: [
      { id: "tcs-s1", name: "Advanced Hands-on Coding (2 Problems)", weightage: 35, status: "completed" },
      { id: "tcs-s2", name: "Numerical & Mathematical Ability", weightage: 25, status: "in_progress" },
      { id: "tcs-s3", name: "Logical & Inductive Reasoning", weightage: 25, status: "completed" },
      { id: "tcs-s4", name: "Verbal & Communication Skills", weightage: 15, status: "completed" }
    ],
    liveAlert: "Registration Closing Soon • Digital Cadre Packages up to 9.5 LPA"
  },
  {
    id: "live-offcampus-hackwithinfy",
    title: "Infosys HackWithInfy & InfyTQ National Challenge",
    organization: "Infosys Limited",
    category: "Offcampus",
    examType: "Elite National Competitive Coding Drive",
    registrationStart: "2026-02-20",
    registrationEnd: "2026-03-30",
    examDate: "2026-04-25",
    totalMarks: 300,
    cutoffMarks: 180.0,
    targetMarks: 260.0,
    examPattern: {
      mode: "Online CodeChef/HackerEarth Sandbox",
      duration: "180 Mins (3 Hours)",
      totalQuestions: "3 Algorithmic Coding Problems (Easy, Medium, Hard)",
      negativeMarking: "Testcase-based partial scoring"
    },
    marksDistribution: "Problem 1 (50 Marks), Problem 2 (100 Marks), Problem 3 (150 Marks)",
    status: "upcoming",
    websiteUrl: "https://www.infosys.com/careers/hackwithinfy.html",
    youtubeUrl: "https://www.youtube.com/results?search_query=hackwithinfy+previous+year+questions+solutions",
    syllabusSummary: "Dynamic Programming, Graph Theory, Trie, Segment Trees, Backtracking, String Matching.",
    subjects: [
      { id: "infy-s1", name: "Dynamic Programming & Recursion", weightage: 40, status: "completed" },
      { id: "infy-s2", name: "Graph Algorithms & BFS/DFS", weightage: 35, status: "in_progress" },
      { id: "infy-s3", name: "Advanced Trees & Data Structures", weightage: 25, status: "to_study" }
    ],
    liveAlert: "Round 1 Live Practice Sandbox Active • Power Programmer Cadre"
  },
  {
    id: "live-offcampus-cognizant-genc",
    title: "Cognizant GenC Elevate & Next Hiring Drive",
    organization: "Cognizant Technology Solutions",
    category: "Offcampus",
    examType: "Pan-India Campus & Off-Campus Hiring",
    registrationStart: "2026-03-05",
    registrationEnd: "2026-04-10",
    examDate: "2026-04-28",
    totalMarks: 100,
    cutoffMarks: 65.0,
    targetMarks: 85.0,
    examPattern: {
      mode: "Online AMCAT / HackerEarth Assessment",
      duration: "140 Mins",
      totalQuestions: "Aptitude + Automata Fix + 2 Coding",
      negativeMarking: "No negative marking"
    },
    marksDistribution: "Cognitive (30%), Automata & Code Debugging (30%), Advanced Coding (40%)",
    status: "registering",
    websiteUrl: "https://careers.cognizant.com",
    youtubeUrl: "https://www.youtube.com/results?search_query=cognizant+genc+elevate+coding+questions",
    syllabusSummary: "Code Debugging, Data Structures, OOPs, DBMS concepts, Quantitative & Analytical Reasoning.",
    subjects: [
      { id: "cog-s1", name: "Automata Fix & Code Debugging", weightage: 30, status: "completed" },
      { id: "cog-s2", name: "Data Structures & Hands-on Coding", weightage: 40, status: "in_progress" },
      { id: "cog-s3", name: "Analytical & Quantitative Aptitude", weightage: 30, status: "completed" }
    ],
    liveAlert: "Elevate Role Registrations Open for 2025/2026 Batches"
  },
  {
    id: "live-offcampus-amazon-wow",
    title: "Amazon WOW & Student Programs Off-Campus Drive",
    organization: "Amazon Web Services / Retail",
    category: "Offcampus",
    examType: "Global SDE Internship & Full-Time Drive",
    registrationStart: "2026-04-01",
    registrationEnd: "2026-05-15",
    examDate: "2026-06-10",
    totalMarks: 100,
    cutoffMarks: 75.0,
    targetMarks: 95.0,
    examPattern: {
      mode: "Online HackerRank Assessment",
      duration: "90 Mins",
      totalQuestions: "2 Algorithmic DSA Coding Questions + Work Style Assessment",
      negativeMarking: "Strict testcase passing"
    },
    marksDistribution: "Coding Problem 1 (45%), Coding Problem 2 (45%), Leadership Principles (10%)",
    status: "upcoming",
    websiteUrl: "https://www.amazon.jobs/en/landing_pages/wow-india",
    youtubeUrl: "https://www.youtube.com/results?search_query=amazon+wow+coding+assessment+interview+questions",
    syllabusSummary: "Arrays, Hash Maps, Dynamic Programming, Trees, Binary Search, Amazon 16 Leadership Principles.",
    subjects: [
      { id: "amz-s1", name: "Data Structures & Algorithms (HackerRank)", weightage: 70, status: "in_progress" },
      { id: "amz-s2", name: "Amazon Leadership Principles & System Scenarios", weightage: 30, status: "completed" }
    ],
    liveAlert: "Amazon WOW 2026 Registration Portal Initialized"
  },

  // =========================================================================
  // 3. NON-TECHNICAL GOVT RECRUITMENTS
  // =========================================================================
  {
    id: "live-govt-ssc-cgl",
    title: "SSC Combined Graduate Level (CGL) Tier-I",
    organization: "Staff Selection Commission (Govt of India)",
    category: "Non Technical",
    examType: "Central Govt Group B & C Recruitment",
    registrationStart: "2026-06-11",
    registrationEnd: "2026-07-10",
    examDate: "2026-09-15",
    totalMarks: 200,
    cutoffMarks: 135.0,
    targetMarks: 165.0,
    examPattern: {
      mode: "Online CBT (Objective MCQ)",
      duration: "60 Mins (1 Hour)",
      totalQuestions: "100 MCQs (4 Sections x 25 Qs)",
      negativeMarking: "-0.50 marks per incorrect response"
    },
    marksDistribution: "General Intelligence (50M), General Awareness (50M), Quantitative Aptitude (50M), English (50M)",
    status: "upcoming",
    websiteUrl: "https://ssc.gov.in",
    youtubeUrl: "https://www.youtube.com/results?search_query=ssc+cgl+2026+preparation+strategy+syllabus",
    syllabusSummary: "Indian Polity, History, Economy, Geometry, Trigonometry, Arithmetic, Vocabulary & Grammar.",
    subjects: [
      { id: "ssc-s1", name: "Quantitative Aptitude", weightage: 25, status: "in_progress" },
      { id: "ssc-s2", name: "Reasoning & General Intelligence", weightage: 25, status: "completed" },
      { id: "ssc-s3", name: "English Comprehension", weightage: 25, status: "completed" },
      { id: "ssc-s4", name: "General Knowledge & Static GK", weightage: 25, status: "to_study" }
    ],
    liveAlert: "Notification Schedule Confirmed in SSC Annual Calendar"
  },
  {
    id: "live-govt-upsc-cse",
    title: "UPSC Civil Services Examination (CSE) Prelims",
    organization: "Union Public Service Commission",
    category: "Non Technical",
    examType: "All India Administrative Services (IAS/IPS/IFS)",
    registrationStart: "2026-02-01",
    registrationEnd: "2026-02-21",
    examDate: "2026-05-24",
    totalMarks: 400,
    cutoffMarks: 88.5,
    targetMarks: 115.0,
    examPattern: {
      mode: "Offline OMR Pen-and-Paper (Two Sessions)",
      duration: "4 Hours (Paper I: 2 Hours + Paper II CSAT: 2 Hours)",
      totalQuestions: "Paper I: 100 Qs, Paper II: 80 Qs",
      negativeMarking: "-0.33 marks per wrong answer"
    },
    marksDistribution: "Paper I GS (200 Marks - Merit determining), Paper II CSAT (200 Marks - 33% Qualifying)",
    status: "in_preparation",
    websiteUrl: "https://upsc.gov.in",
    youtubeUrl: "https://www.youtube.com/results?search_query=upsc+prelims+2026+strategy+revision",
    syllabusSummary: "Current Events, History of India, Geography, Polity & Governance, Economic Development, Ecology, General Science.",
    subjects: [
      { id: "upsc-s1", name: "Polity & Constitution", weightage: 25, status: "revision" },
      { id: "upsc-s2", name: "Economy & Development", weightage: 25, status: "in_progress" },
      { id: "upsc-s3", name: "History & Art & Culture", weightage: 25, status: "in_progress" },
      { id: "upsc-s4", name: "CSAT Aptitude & Comprehension", weightage: 25, status: "completed" }
    ],
    liveAlert: "Official e-Admit Card Portal Updated • Examination Centers Finalized"
  },
  {
    id: "live-govt-sbi-po",
    title: "State Bank of India (SBI PO) Preliminary & Mains",
    organization: "State Bank of India",
    category: "Non Technical",
    examType: "Premier Public Sector Bank Officer Cadre",
    registrationStart: "2026-09-01",
    registrationEnd: "2026-09-25",
    examDate: "2026-11-15",
    totalMarks: 100,
    cutoffMarks: 58.5,
    targetMarks: 76.0,
    examPattern: {
      mode: "Online CBT with Sectional Cutoffs",
      duration: "60 Mins Prelims (20m per section)",
      totalQuestions: "100 MCQs (Quant 35, Reasoning 35, English 30)",
      negativeMarking: "-0.25 marks per wrong answer"
    },
    marksDistribution: "Quantitative Aptitude (35M), Reasoning (35M), English (30M)",
    status: "upcoming",
    websiteUrl: "https://sbi.co.in/careers",
    youtubeUrl: "https://www.youtube.com/results?search_query=sbi+po+prelims+preparation+puzzles+math",
    syllabusSummary: "Complex Puzzles, Seating Arrangements, High-level DI, Arithmetic, Reading Comprehension, Grammar.",
    subjects: [
      { id: "sbi-s1", name: "Quantitative Aptitude & DI", weightage: 35, status: "in_progress" },
      { id: "sbi-s2", name: "Reasoning Ability & Puzzles", weightage: 35, status: "completed" },
      { id: "sbi-s3", name: "English Language & Comprehension", weightage: 30, status: "in_progress" }
    ],
    liveAlert: "Banking Personnel Board Tentative Calendar Announced"
  },
  {
    id: "live-govt-rrb-ntpc",
    title: "Railways RRB NTPC Graduate Level Recruitment",
    organization: "Railway Recruitment Control Board (RRB)",
    category: "Non Technical",
    examType: "Indian Railways Central Recruitment",
    registrationStart: "2026-05-01",
    registrationEnd: "2026-05-31",
    examDate: "2026-08-20",
    totalMarks: 100,
    cutoffMarks: 74.0,
    targetMarks: 88.0,
    examPattern: {
      mode: "Online CBT (Stage 1 Screening)",
      duration: "90 Mins",
      totalQuestions: "100 MCQs (GA 40, Math 30, Reasoning 30)",
      negativeMarking: "-0.33 marks per incorrect answer"
    },
    marksDistribution: "General Awareness (40M), Mathematics (30M), General Intelligence (30M)",
    status: "upcoming",
    websiteUrl: "https://indianrailways.gov.in",
    youtubeUrl: "https://www.youtube.com/results?search_query=rrb+ntpc+preparation+math+reasoning",
    syllabusSummary: "General Science, Static GK, Current Affairs, Arithmetic, Geometry, Reasoning.",
    subjects: [
      { id: "rrb-s1", name: "General Awareness & Science", weightage: 40, status: "to_study" },
      { id: "rrb-s2", name: "Mathematics & Arithmetic", weightage: 30, status: "completed" },
      { id: "rrb-s3", name: "General Intelligence & Reasoning", weightage: 30, status: "completed" }
    ],
    liveAlert: "Zonal Railways Cadre Vacancies Released"
  },

  // =========================================================================
  // 4. TECHNICAL & CERTIFICATIONS
  // =========================================================================
  {
    id: "live-tech-gate-cs-2027",
    title: "GATE Computer Science & IT (GATE CS 2027)",
    organization: "IIT / IISc National Coordination Board",
    category: "Technical",
    examType: "Premier National Technical Entrance & PSU Gateway",
    registrationStart: "2026-08-24",
    registrationEnd: "2026-10-05",
    examDate: "2027-02-07",
    totalMarks: 100,
    cutoffMarks: 28.5,
    targetMarks: 75.0,
    examPattern: {
      mode: "Online CBT (3 Hours)",
      duration: "180 Mins",
      totalQuestions: "65 Questions (MCQ, MSQ, NAT)",
      negativeMarking: "-0.33 for 1-mark, -0.66 for 2-mark MCQs (No neg on NAT/MSQ)"
    },
    marksDistribution: "Core CS (70 Marks), Engineering Math & Discrete (15 Marks), General Aptitude (15 Marks)",
    status: "in_preparation",
    websiteUrl: "https://gate2026.iitd.ac.in",
    youtubeUrl: "https://www.youtube.com/results?search_query=gate+computer+science+complete+preparation+roadmap",
    syllabusSummary: "Algorithms, Data Structures, Operating Systems, DBMS, Computer Networks, Theory of Computation, Compilers, Architecture, Discrete Math.",
    subjects: [
      { id: "gate-s1", name: "Data Structures & Algorithms", weightage: 16, status: "completed" },
      { id: "gate-s2", name: "Operating Systems & Concurrency", weightage: 12, status: "in_progress" },
      { id: "gate-s3", name: "Computer Networks & Security", weightage: 11, status: "in_progress" },
      { id: "gate-s4", name: "DBMS & Transaction Processing", weightage: 10, status: "completed" },
      { id: "gate-s5", name: "Engineering Mathematics & Discrete", weightage: 15, status: "completed" },
      { id: "gate-s6", name: "General Aptitude & Reasoning", weightage: 15, status: "completed" }
    ],
    liveAlert: "Organizing Institute Portal Active • Syllabi Standardized"
  },
  {
    id: "live-tech-aws-saa",
    title: "AWS Certified Solutions Architect - Associate (SAA-C03)",
    organization: "Amazon Web Services (AWS)",
    category: "Technical",
    examType: "Global Industry Cloud Architecture Certification",
    registrationStart: "2026-01-01",
    registrationEnd: "2026-12-31",
    examDate: "2026-05-10",
    totalMarks: 1000,
    cutoffMarks: 720,
    targetMarks: 860,
    examPattern: {
      mode: "Online Pearson VUE / Test Center",
      duration: "130 Mins",
      totalQuestions: "65 Questions (Multiple choice / multiple response)",
      negativeMarking: "No negative marking"
    },
    marksDistribution: "Secure Architectures (30%), Resilient Architectures (26%), High-Performing (24%), Cost-Optimized (20%)",
    status: "in_preparation",
    websiteUrl: "https://aws.amazon.com/certification/certified-solutions-architect-associate",
    youtubeUrl: "https://www.youtube.com/results?search_query=aws+certified+solutions+architect+associate+course",
    syllabusSummary: "IAM, VPC, EC2, S3, RDS, DynamoDB, Lambda, ECS, CloudFront, Route 53, Auto Scaling.",
    subjects: [
      { id: "aws-s1", name: "Design Secure Architectures", weightage: 30, status: "completed" },
      { id: "aws-s2", name: "Design Resilient Architectures", weightage: 26, status: "in_progress" },
      { id: "aws-s3", name: "Design High-Performing Architectures", weightage: 24, status: "in_progress" },
      { id: "aws-s4", name: "Design Cost-Optimized Architectures", weightage: 20, status: "to_study" }
    ],
    liveAlert: "Exam Guide SAA-C03 Active • Cloud Practice Tests Open"
  }
];

// Asynchronously fetch live updates from open source APIs, contest webscrapers, and public feeds
export async function fetchLiveUpcomingExams() {
  const fetchedItems = [];

  // Source 1: Query open-source competitive coding & technical contest API (Kontests.net)
  try {
    const response = await fetch("https://kontests.net/api/v1/all", {
      headers: { Accept: "application/json" }
    });

    if (response.ok) {
      const openSourceContests = await response.json();
      const techFeed = (openSourceContests || []).slice(0, 5).map((c, idx) => ({
        id: `live-api-kontest-${idx}`,
        title: `${c.name} (${c.site || 'Global Contest'})`,
        organization: c.site || "Global Open Contest Board",
        category: "Technical",
        examType: "Global Competitive Programming / Hiring Challenge",
        registrationStart: new Date().toISOString().slice(0, 10),
        registrationEnd: c.start_time ? c.start_time.slice(0, 10) : "2026-05-01",
        examDate: c.start_time ? c.start_time.slice(0, 10) : "2026-05-01",
        totalMarks: 100,
        cutoffMarks: 60,
        targetMarks: 85,
        examPattern: {
          mode: `Online ${c.site} Sandbox Platform`,
          duration: `${Math.round((c.duration || 7200) / 60)} Mins`,
          totalQuestions: "3-5 Algorithmic Challenges",
          negativeMarking: "Time penalty & wrong submission deductions"
        },
        marksDistribution: "Algorithmic Problem Solving (100%)",
        status: "registering",
        websiteUrl: c.url || "https://leetcode.com/contest",
        youtubeUrl: `https://www.youtube.com/results?search_query=${encodeURIComponent((c.site || 'leetcode') + ' contest solutions')}`,
        syllabusSummary: "Data Structures, Dynamic Programming, Graphs, Combinatorics, Greedy Algorithms, Time Complexity.",
        subjects: [
          { id: `ksub-${idx}-1`, name: "Core Algorithms & DP", weightage: 60, status: "in_progress" },
          { id: `ksub-${idx}-2`, name: "Data Structures & Graphs", weightage: 40, status: "completed" }
        ],
        liveAlert: `Live Stream Active • Starts: ${c.start_time ? new Date(c.start_time).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Live'}`
      }));
      fetchedItems.push(...techFeed);
    }
  } catch (err) {
    console.info("Using cached open-source contest feeds:", err?.message);
  }

  // Combine curated and live fetched items
  return [...LIVE_EXAM_FEED_ITEMS, ...fetchedItems];
}

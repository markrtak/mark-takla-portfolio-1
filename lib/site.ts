export const SITE = {
  name: "Mark Takla",
  title: "Data science & full stack development",
  location: "New Cairo, Egypt",
  github: "https://github.com/markrtak",
  linkedin: "https://www.linkedin.com/in/mark-takla",
  email: "markrtakla@gmail.com",
  githubUsername: "markrtak",
  /**
   * CV download target. Set `NEXT_PUBLIC_CV_URL` in Vercel (or `.env.local`)
   * to an external PDF URL so you can replace the file at that link without
   * editing code. If unset, falls back to the file in `public/cv/`.
   */
  cvUrl:
    typeof process !== "undefined" &&
    process.env.NEXT_PUBLIC_CV_URL &&
    process.env.NEXT_PUBLIC_CV_URL.trim() !== ""
      ? process.env.NEXT_PUBLIC_CV_URL.trim()
      : "/cv/mark-takla-cv.pdf",
} as const;

/**
 * GitHub repo `name` values never shown in the Projects section (e.g. this site’s own repo).
 */
export const EXCLUDED_PROJECT_REPO_SLUGS = [
  "mark-takla-portfolio-1",
  "Task2-ai-assisted-coding-lab4.2",
  "Task2-ai-assisted-coding-lab4.1",
  "Task2-ai-assisted-coding-lab3.2",
  "Task-1-marketplace-variant",
] as const;

/** @deprecated Use SITE.cvUrl */
export const CV_URL = SITE.cvUrl;

/**
 * Keyboard keys - CV technical skills & tools (human languages omitted from keys).
 */
export const SKILL_KEYS = [
  "Java",
  "Python",
  "C",
  "C#",
  "R",
  "React",
  "Next.js",
  "ASP.NET",
  "FastAPI",
  "MATLAB",
  "Haskell",
  "Prolog",
  "HTML",
  "CSS",
  "OrCAD PSpice",
  "Linux",
  "AI",
  "SQL",
  "MongoDB",
  "Pandas",
  "NumPy",
  "scikit-learn",
  "Power BI",
  "TensorFlow",
  "Keras",
  "LangChain",
  "LangGraph",
  "Postman",
  "Microsoft Word",
  "PowerPoint",
  "Excel",
  "Adobe Photoshop",
  "Adobe After Effects",
  "UiPath",
] as const;

/** @deprecated Use SKILL_KEYS */
export const SKILLS = SKILL_KEYS;

export const LOYA_URL = "https://loya-landing-page.pages.dev/";

export const ABOUT =
  "I am the kind of person who enjoys both debugging a stubborn model at midnight and explaining it clearly the next morning. I grew up loving math, games, and figuring out how things work, so computer engineering felt natural. I am a computer engineering student at the German University in Cairo, and I have taken and still take many courses outside of college to keep leveling up. These days I spend my time building practical full stack AI and data projects, mentoring younger engineering students, and shipping things that are actually useful. I care about clean code, honest results, and products that feel human, not just technically correct.";

/** Second paragraph for About: includes the Loya founder line (link rendered in the section). */
export const ABOUT_LOYA =
  "I am also a technical founder at loya, a B2B2C tech startup (pre-seed) for cafes and local shops, helping them ditch paper stamp cards for a faster, wallet-first experience, and grow transaction count by lifting retention and customer acquisition with far less CAC than the old pipelines.";

export type ExperienceEntry = {
  title: string;
  organization: string;
  range: string;
  location: string;
  summary?: string;
  bullets?: string[];
  /** When a bullet ends with "(Demo link)", this URL is used for the hyperlink. */
  demoUrl?: string;
  tags?: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: "Integration Engineer Intern",
    organization: "TPAY",
    range: "Aug 2026 – Sep 2026",
    location: "Egypt",
    bullets: [
      "Cut manual testing time by about 85% by building a production-ready AI agent with LangGraph, finally unblocking an eight-year team bottleneck around repetitive integration checks.",
      "Integrated TPAY into merchant web and mobile platforms across four methods (REST APIs, client/server SDKs, and the Android SDK), using JavaScript and Postman to validate flows end to end. (Demo link)",
    ],
    demoUrl:
      "https://drive.google.com/drive/folders/14m2j2e1peMjb3Nt6NDL_lAo1vh2gKphl?usp=sharing",
    tags: ["LangGraph", "JavaScript", "APIs", "Postman"],
  },
  {
    title: "Computer Science Junior Teaching Assistant",
    organization: "German University in Cairo",
    range: "Sep 2024 – Jun 2026",
    location: "Cairo, Egypt",
    bullets: [
      "CSEN102 & CSIS102 (Python): Instructed 60+ students in core programming and data structures for engineering and business informatics cohorts. Supervised by Assoc. Prof. Dr. Milad Ghantous.",
      "CSEN401 (OOP with Java): Mentored 50+ students and held 2 weekly project office hours to guide complex software projects that carried most of the course grade.",
      "Built soft skills across leadership, communication, teaching, patience, accountability, and time management.",
    ],
    tags: ["Python", "Java", "OOP", "Teaching"],
  },
  {
    title: "Robotic Process Automation (RPA) Internship",
    organization: "Bank NXT",
    range: "Jul 2025 – Aug 2025",
    location: "Egypt",
    bullets: [
      "Completed a multidisciplinary rotation across the banking industry, including intensive weeks in RPA, Integration, and IT Governance & Risk Management, and gained exposure to how those functions interoperate.",
      "Developed 5+ unattended UiPath robots for automated login, Excel-driven multi-form data entry, web scraping, and related workflows using Studio and Orchestrator; eliminated manual form-filling time by 100% and saved significant bank resources. (Demo link)",
    ],
    demoUrl:
      "https://drive.google.com/drive/folders/1VhVN3YTtO0m-FKA2PlINm1LT_-ezv7AU",
    tags: ["UiPath", "RPA", "Excel", "Automation"],
  },
  {
    title: "Vehicle Dynamics Engineer & Robotics Engineer",
    organization: "GUC Innovators & GUC Google Developer Groups",
    range: "Jun 2024 – Jul 2025",
    location: "Cairo, Egypt",
    bullets: [
      "Vehicle dynamics and simulation work with GUC Innovators: MATLAB-based modeling and team engineering workflows.",
      "Robotics engineering with GUC Google Developer Groups: hands-on builds, demos, and peer collaboration alongside GDG initiatives.",
    ],
    tags: ["MATLAB", "Dynamics", "Robotics", "GDG"],
  },
  {
    title: "Rotational Engineering Internship",
    organization: "Alstom",
    range: "Jun 2024 – Aug 2024",
    location: "Multi-site rotation",
    bullets: [
      "Completed a comprehensive rotation through Verification & Validation (V&V), Integrated Control Centre (ICC), Communication Based Interlocking (CBI), and Requirements & Configuration Management (RCM), spanning railway signaling, control, and project lifecycles.",
      "Verification & Validation (V&V): Learned Automatic Train Supervision (ATS) and Automatic Train Control (ATC) supervision and testing stacks; conducted and analyzed signaling test cases for the Umraniye–Ataşehir–Göztepe (UAG) line in Turkey against client needs. Applied ISTQB-style thinking alongside SCADA perspectives to stress mission-critical reliability, and identified 4 technical discrepancies in signaling scenarios within Alstom’s Human Machine Interface (HMI), ensuring accurate train simulations before handoff.",
      "Integrated Control Centre (ICC): SCADA, Alstom U400, virtualization, speed management and safe distancing, plus train scheduling and dispatching systems.",
      "Communication Based Interlocking (CBI): Interlocking structures (e.g. IXL), point machines, balises, configuration rules, and trackside safety. Designed multiple railway layouts with signals and track equipment in AutoCAD to engineering rules and SIL 4 expectations.",
      "Requirements & Configuration Management (RCM): Tendering processes, requirements flow, and full project life cycles.",
      "ISTQB Certified Tester Foundation Level (CTFL) v4.0 curriculum: testing principles, design techniques, static testing, and testing across software lifecycles; plus foundations in cybersecurity and networks.",
    ],
    tags: ["Rail", "Testing", "SCADA", "Safety"],
  },
];

export type DegreeEntry = {
  degree: string;
  institution: string;
  range: string;
  location: string;
  description?: string;
  coursework?: string[];
};

export const DEGREES: DegreeEntry[] = [
  {
    degree: "Bachelor of Engineering in Computer Science",
    institution: "German University in Cairo (GUC)",
    range: "Sep 2023 - Present",
    location: "Cairo, Egypt",
    description:
      "Cumulative German scale GPA: 2.01 (B+), roughly ~3.5 on the American scale. Coursework spans algorithms, systems, ML, and software engineering.",
    coursework: [
      "Machine learning",
      "Data structures",
      "Databases",
      "Operating systems",
    ],
  },
  {
    degree: "IGCSE & A Levels",
    institution: "Cairo English School (CES) & New Ramses College (NRC)",
    range: "Earlier years",
    location: "Cairo, Egypt",
    description:
      "Early graduation after year 11; 8 IGCSEs at grade 9 (A* equivalent); A Level Mathematics grade A*.",
    coursework: ["Mathematics", "Sciences", "IGCSE program"],
  },
];

export type VolunteerEntry = {
  title: string;
  organization: string;
  range: string;
  location: string;
  summary: string;
  /** Visual variant for the card chrome */
  vibe: "ribbon" | "ticket" | "stamp";
};

/**
 * Volunteering: align wording and dates with your CV PDF (`public/cv/`).
 */
export const VOLUNTEERING: VolunteerEntry[] = [
  {
    title: "Scout Leader",
    organization: "Scouting",
    range: "2013 to Present",
    location: "Egypt",
    summary:
      "Long term volunteer leadership in scouting: running programs, ceremonies, and mentoring for young people. Building routines, responsibility, and teamwork outside school and paid work.",
    vibe: "ribbon",
  },
  {
    title: "Summer camp programs",
    organization: "New Jersey, USA",
    range: "Summer 2023",
    location: "United States",
    summary:
      "Managed summer camps in New Jersey for 30+ children: schedules, activities, safety, and keeping energy high across full camp days.",
    vibe: "ticket",
  },
  {
    title: "Refugee community support",
    organization: "Charity & humanitarian events",
    range: "Ongoing",
    location: "Egypt",
    summary:
      "Organized charity activities and ceremonies for 200+ Sudanese-Egyptian refugees. Logistics, inclusion, and meaningful events at scale.",
    vibe: "stamp",
  },
  {
    title: "Graduation ceremony usher",
    organization: "German University in Cairo",
    range: "2026",
    location: "Cairo, Egypt",
    summary:
      "Ushered at the GUC graduation ceremony in 2026, guiding guests, keeping the flow calm when things got busy, and learning how to stay responsible under pressure while dealing with people all day.",
    vibe: "ribbon",
  },
];

export const CERTIFICATIONS: string[] = [
  "API Beginner Path - Postman (Issued Aug 2026)",
  "Data Science, AI and ML Diploma (180h) - Space Code Academy",
  "Data Science and AI Diploma (250h) - Sprints.ai (in progress)",
  "Foundation: Introduction to LangChain - LangChain Academy",
  "Machine Learning Specialization - Stanford & DeepLearning.AI (in progress)",
  "Statistical Data Analysis Using R - SRTA-City",
  "AI Data Analytics Intensive Bootcamp - EYouth",
  "McKinsey.org Forward Program (in progress)",
  "Introduction to Modern AI - Cisco",
  "L'Oréal Brandstorm 2025",
  "MATLAB Onramp - MathWorks",
  "Intro to AI - Microsoft & Egyptian Ministry of Youth",
];

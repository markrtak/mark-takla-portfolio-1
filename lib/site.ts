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

/** @deprecated Use SITE.cvUrl */
export const CV_URL = SITE.cvUrl;

/**
 * Keyboard keys - CV technical skills & tools (human languages omitted from keys).
 */
export const SKILL_KEYS = [
  "Java",
  "Python",
  "C",
  "R",
  "React",
  "ASP.NET",
  "MATLAB",
  "Haskell",
  "Prolog",
  "HTML",
  "CSS",
  "OrCAD PSpice",
  "Linux",
  "AI",
  "SQL",
  "Pandas",
  "NumPy",
  "scikit-learn",
  "Power BI",
  "TensorFlow",
  "Keras",
  "LangChain",
  "Microsoft Word",
  "PowerPoint",
  "Excel",
  "Adobe Photoshop",
  "Adobe After Effects",
  "UiPath",
] as const;

/** @deprecated Use SKILL_KEYS */
export const SKILLS = SKILL_KEYS;

export const ABOUT =
  "I am the kind of person who enjoys both debugging a stubborn model at midnight and explaining it clearly the next morning. I grew up loving math, games, and figuring out how things work, so computer engineering felt natural. I am a computer engineering student at the German University in Cairo, and I have taken and still take many courses outside of college to keep leveling up. These days I spend my time building practical full stack AI and data projects, mentoring younger engineering students, and shipping things that are actually useful. I care about clean code, honest results, and products that feel human, not just technically correct.";

export type ExperienceEntry = {
  title: string;
  organization: string;
  range: string;
  location: string;
  summary?: string;
  bullets?: string[];
  tags?: string[];
};

export const EXPERIENCE: ExperienceEntry[] = [
  {
    title: "Robotic Process Automation (RPA) Internship",
    organization: "Bank NXT",
    range: "Jul 2025 - Aug 2025",
    location: "Egypt",
    bullets: [
      "Got introduced to the banking industry with all its departments.",
      "Created UIPath unattended robots to do many tasks such as logging in, multiple form-filling from an Excel spreadsheet, extracting information from websites and using it for different purposes. (demo link)",
      "With the use of Studio, Orchestrator, and the robots, I was able to save the bank time and resources.",
      "Also spent a week in the Integration department and a week in the IT Governance and Risk Management.",
    ],
    tags: ["UiPath", "RPA", "Excel", "Automation"],
  },
  {
    title: "Vehicle Dynamics Engineer",
    organization: "GUC Innovators",
    range: "Jun 2024 - Jul 2025",
    location: "Cairo, Egypt",
    tags: ["MATLAB", "Dynamics", "Simulation"],
  },
  {
    title: "Robotics Engineer",
    organization: "GUC Google Developer Groups",
    range: "Oct 2024 - Jun 2025",
    location: "Cairo, Egypt",
    tags: ["Robotics", "GDG"],
  },
  {
    title: "Computer Science Junior Teaching Assistant",
    organization: "German University in Cairo",
    range: "Sep 2024 - Jan 2025",
    location: "Cairo, Egypt",
    bullets: [
      "Worked as a junior teaching assistant for CSEN102 and CSIS102 (Python) engineering and business informatics students in the GUC.",
      "Supervised by Assoc. Prof. Dr. Milad Ghantous.",
      "Gained many soft-skills such as leadership, communication, teaching, patience, accountability, and time management.",
    ],
    tags: ["Python", "Teaching", "CS1"],
  },
  {
    title: "Computer Science Junior Teaching Assistant",
    organization: "German University in Cairo",
    range: "Feb 2026 - Jun 2026",
    location: "Cairo, Egypt",
    bullets: [
      "Worked as a junior teaching assistant for CSEN401 (OOP with Java) engineering students in the GUC.",
      "Helped student by conducting weekly office hours to help them on a project worth most of the grade.",
    ],
    tags: ["Java", "OOP", "Teaching"],
  },
  {
    title: "Engineering Internship",
    organization: "Alstom",
    range: "Jun 2024 - Aug 2024",
    location: "Multi-site rotation",
    bullets: [
      "Went through a rotation on many different engineering departments in the railway industry.",
      "Verification and Validation (V&V); learned about the different train supervision and testing systems such as the Automatic Train Supervision (ATS) and Automatic Train Control (ATC). I have conducted and analyzed signaling test cases on the line Umraniye-Atasehir Goztepe (UAG) in Turkey based on the client’s needs, ensuring accurate train simulations within Alstom’s Human Machine Interface (HMI) and effectively reported any discrepancies.",
      "Integrated Control Centre (ICC); acquired knowledge on SCADA, U400 by Alstom, virtualization, speed management and safe distancing, along with train scheduling and dispatching systems.",
      "Communication Based Interlocking (CBI); got presented to train interlocking structures like IXL and trackside equipment, such as point machines and balises, configuration rules, and all the trackside safety regulations. I have designed multiple railway tracks with signals and trackside equipment using AutoCAD, ensuring adherence to engineering rules and meeting Safety Integrity Level (SIL) 4 standards.",
      "Requirements and Configuration Management (RCM); was taught the different tendering processes in detail and projects’ life cycles.",
      "I also got lectured on the ISTQB Certified Tester Foundation Level (CTFL) v4.0 where I gained an understanding of testing principles, methodologies, and tools, including test design techniques, static testing, and the role of testing throughout various software development lifecycles.",
      "Took lectures on cybersecurity and networks.",
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
      "Cumulative GPA on German scale 2.15 (~3.3 US B+). Coursework spans algorithms, systems, ML, and software engineering.",
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

export const CERTIFICATIONS: string[] = [
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

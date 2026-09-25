export const profile = {
  name: "Abhiraj Ghosh",
  firstName: "Abhiraj",
  lastName: "Ghosh",
  title: "Backend Software Engineer",
  location: "Chandigarh, India",
  timezone: "UTC+5:30",
  email: "abhirajcuchd@gmail.com",
  github: "https://github.com/Abhiraj-cuchd",
  linkedin: "https://www.linkedin.com/in/abhiraj-ghosh",
  linktree: "https://linktr.ee/dev_abhiraj",
  resume: "/Abhiraj_Ghosh_Resume.pdf",
  positioning:
    "Backend engineer, three years in. I mostly work in NestJS and Postgres, and more of that work now involves AI that people actually use, like an assistant I built for the Indian Army that runs completely offline.",
};

export const nav = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Experience", href: "#experience" },
  { index: "03", label: "Work", href: "#work" },
  { index: "04", label: "Contact", href: "#contact" },
];

export const about = {
  lead: "I like the parts of a product most people never see: how the data is laid out, what happens in the background, and who is allowed to do what.",
  body: "At Talentelgia I led a team of four on a CRM and ERP that 75+ people use every day. I've also spent a lot of time on Indian Army projects: an inventory assistant that works with no internet at all, and an NFC tracking system we rolled out to 14 depots. I'm a Software Engineer L2 there, based in Mohali.",
  facts: [
    { label: "Location", value: "Chandigarh, India — UTC+5:30" },
    { label: "Role", value: "Software Engineer L2, Talentelgia" },
    { label: "Focus", value: "Backend Systems · Applied AI" },
    { label: "Open to", value: "Remote (India) · Relocation to Gurgaon / Noida / Delhi NCR" },
    {
      label: "Education",
      value: "MCA, Chandigarh University (2024– 26) — CGPA 8.8 · BCA, Chandigarh University (2021–24) — CGPA 7.3",
    },
  ],
};

export const stats = [
  { value: 160, suffix: "+", label: "Postgres tables, split across schemas" },
  { value: 75, suffix: "+", label: "People using the CRM + ERP daily" },
  { value: 14, suffix: "", label: "Army depots running our system" },
  { value: 40, suffix: "%", label: "More accurate than baseline RAG" },
];

export type Job = {
  role: string;
  company: string;
  url: string;
  period: string;
  location: string;
  points: string[];
  logo: string;
};

export const experience: Job[] = [
  {
    role: "Software Engineer L2",
    company: "Talentelgia Technologies",
    url: "https://www.talentelgia.com/",
    period: "Feb 2025 — Present",
    location: "Mohali",
    logo: "/logos/talentelgia.png",
    points: [
      "Led a team of **4 engineers** building a CRM and ERP for an education consultancy in NestJS. It has **14 roles** that each see only what they should, and **75+ staff** use it every day. Access is checked by NestJS guards on JWT auth with refresh-token rotation.",
      "Designed the database behind it: **160+ tables** in PostgreSQL, with separate schemas for CRM, ERP, payroll and HR. Added indexes and Redis caching in the places where the old system had been slow.",
      "Built a two-way HubSpot sync for a US M&A firm. Webhooks go through a **BullMQ** queue with retries and idempotency keys, so nobody has to clean up duplicate records by hand.",
      "Built the backend for an **Indian Army** inventory assistant. You ask it questions in plain language, and **LangGraph** agents either search the records or write SQL. That SQL runs as a **read-only** database user.",
      "Gathered requirements on-site with commanding officers, then built and rolled out an NFC tracking system to **14 Army depots**. Updating a record used to take hours. Now it takes minutes.",
    ],
  },
  {
    role: "Software Developer",
    company: "Vaayro Technologies",
    url: "https://www.vaayrotech.com/",
    period: "Nov 2023 — Jan 2025",
    location: "Mohali",
    logo: "/logos/vaayro.png",
    points: [
      "Shipped **10+ features** to production across Next.js, Node.js and Express.",
      "Added Redis caching that cut page load times by **70%**, and reworked real-time tracking on Socket.IO so it ran **40%** faster.",
      "Mentored **4 junior developers**, mostly on debugging, code quality and how to structure a system.",
    ],
  },
];

export type Project = {
  index: string;
  name: string;
  type: string;
  tagline: string;
  detail: string;
  metric: { value: string; label: string };
  tech: string[];
  github?: string;
  live?: string;
  /** Shown in place of GitHub/Live links for work that can't be linked publicly. */
  privateLabel?: string;
  /** Internal route to a full write-up, e.g. "/work/inventory-ai-agent". */
  caseStudy?: string;
};

export const projects: Project[] = [
  {
    index: "01",
    name: "Inventory AI Agent",
    type: "Client — Indian Army",
    tagline: "An offline assistant for inventory questions",
    detail:
      "You ask about inventory in plain language and get answers from the database. **LangGraph** agents decide whether to search the records (pgvector plus keyword search) or write SQL. The SQL is the risky part, so it runs under a **read-only** role and can only touch approved tables and query shapes. Paper challans come in through an OCR pipeline built on **PaddleOCR**. Everything runs on-site on a self-hosted **Mistral 8B**, with no internet connection at all.",
    metric: { value: "<3 min", label: "to generate a report. It used to take hours" },
    tech: ["LangGraph", "pgvector", "PostgreSQL", "Text2SQL", "PaddleOCR", "Mistral 8B"],
    privateLabel: "Private / Air-gapped deployment",
    caseStudy: "/work/inventory-ai-agent",
  },
  {
    index: "02",
    name: "MindAgent",
    type: "Independent — AI / RAG",
    tagline: "Ask questions across your documents",
    detail:
      "A RAG agent built with LangChain and OpenAI. Search mixes **MMR and RRF ranking**, which gave better answers than either method alone. It works across several documents, links each answer back to the passages it came from, and supports more than one LLM. It runs on **AWS Lambda**, set up with CDK, with Pinecone for vectors.",
    metric: { value: "40%", label: "more accurate answers than the baseline" },
    tech: ["LangChain", "OpenAI", "Pinecone", "AWS Lambda", "CDK", "TypeScript"],
    github: "https://github.com/Abhiraj-cuchd/docmind",
    live: "https://mindagent.abhirajghosh.tech/",
  },
  {
    index: "03",
    name: "Social Media API",
    type: "Personal — Distributed systems",
    tagline: "A social media backend split into services",
    detail:
      "**Five small services** behind one API gateway that handles rate limiting and load balancing, all running in Docker. Redis caches the busiest reads so they don't hit the database every time.",
    metric: { value: "65%", label: "faster API responses after adding Redis" },
    tech: ["Node.js", "Express", "Redis", "Docker", "API Gateway", "MongoDB"],
    github: "https://github.com/Abhiraj-cuchd/Social-Media-Microservice",
  },
  {
    index: "04",
    name: "Mindful by Akansha",
    type: "Freelance — Client platform",
    tagline: "A blog for a psychologist",
    detail:
      "A fast, SEO-friendly blog on **Sanity CMS**. I set it up so the client can write and publish without needing a developer.",
    metric: { value: "100%", label: "of posts published by the client, no developer needed" },
    tech: ["Next.js", "Sanity", "Tailwind", "Vercel"],
    live: "https://mindfulbyakansha.vercel.app/",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Backend",
    items: ["NestJS", "Node.js", "TypeScript", "BullMQ", "Redis", "REST APIs", "Express.js", "Socket.IO", "Microservices"],
  },
  { group: "Databases", items: ["PostgreSQL", "Prisma", "pgvector", "MongoDB", "MySQL", "Sequelize"] },
  { group: "AI / ML", items: ["LangGraph", "RAG", "Text2SQL", "LangChain", "OpenAI", "Mistral", "PaddleOCR"] },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "GitHub Actions", "Jenkins", "Nginx", "API Gateway", "Linux"] },
  { group: "Frontend", items: ["Next.js", "React.js", "Redux"] },
  { group: "Tools", items: ["Git / GitHub", "Postman", "Jest"] },
];

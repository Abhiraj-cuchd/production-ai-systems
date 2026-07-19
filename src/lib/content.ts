export const profile = {
  name: "Abhiraj Ghosh",
  firstName: "Abhiraj",
  lastName: "Ghosh",
  title: "Software Engineer",
  location: "Chandigarh, India",
  timezone: "UTC+5:30",
  email: "abhirajcuchd@gmail.com",
  github: "https://github.com/Abhiraj-cuchd",
  linktree: "https://linktr.ee/dev_abhiraj",
  positioning:
    "Software engineer, 3 years. I ship full-stack products on microservices architecture and integrate AI where it earns its keep — from RAG document agents to offline-first logistics software for the Indian Army.",
};

export const nav = [
  { index: "01", label: "About", href: "#about" },
  { index: "02", label: "Experience", href: "#experience" },
  { index: "03", label: "Work", href: "#work" },
  { index: "04", label: "Contact", href: "#contact" },
];

export const about = {
  lead: "Three years in, I work across the stack with a bias for the backend — services, caches, queues, and the AI features built on top of them.",
  body: "I've delivered offline-first logistics software for the Indian Army, automated enterprise workflows to 30% efficiency gains, and mentored junior engineers across product teams. Currently a Software Engineer L2 at Talentelgia Technologies, Mohali.",
  facts: [
    { label: "Location", value: "Chandigarh, India — UTC+5:30" },
    { label: "Role", value: "Software Engineer L2, Talentelgia" },
    { label: "Focus", value: "Systems · AI Integrations" },
    {
      label: "Education",
      value: "MCA, Chandigarh University (2024– ) — CGPA 8.8 · BCA, Chandigarh University (2021–24) — CGPA 7.3",
    },
  ],
};

export const stats = [
  { value: 3, suffix: "", label: "Years shipping software" },
  { value: 10, suffix: "+", label: "Production features delivered" },
  { value: 70, suffix: "%", label: "Page-load time cut" },
  { value: 4, suffix: "", label: "Engineers mentored" },
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
      "Architected and delivered an **offline-first, NFC-based logistics system** for the **Indian Army**, owning the full lifecycle from development through onsite deployment and stakeholder handoff.",
      "Automated an M&A firm's manual workflows with async task processing, increasing operational efficiency by **30%**.",
      "Built an internal CRM for a visa consultancy, boosting team productivity by **25%**.",
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
      "Shipped **10+ production features** across Next.js, Node.js, and Express.js.",
      "Cut page load times by **70%** via Redis caching and improved real-time tracking performance by **40%** with Socket.IO.",
      "Mentored **4 junior developers** on code quality, debugging, and system design.",
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
};

export const projects: Project[] = [
  {
    index: "01",
    name: "MindAgent",
    type: "Independent — AI / RAG",
    tagline: "AI-powered document intelligence agent",
    detail:
      "Production-grade RAG agent (LangChain + OpenAI) with **hybrid search (MMR + RRF)**, multimodal LLM support, and token-based rate limiting for enterprise-scale document Q&A. Deployed end-to-end on **serverless AWS Lambdas via CDK** with Pinecone vector storage.",
    metric: { value: "40%", label: "better response accuracy over baseline" },
    tech: ["LangChain", "OpenAI", "Pinecone", "AWS Lambda", "CDK", "TypeScript"],
    github: "https://github.com/Abhiraj-cuchd/docmind",
    live: "https://mindagent.abhirajghosh.tech/",
  },
  {
    index: "02",
    name: "Social Media API",
    type: "Personal — Distributed systems",
    tagline: "Distributed microservices backend",
    detail:
      "**5 independent microservices** behind a centralized API Gateway with rate limiting and load balancing, containerized with Docker. Redis sits in front of hot paths to keep reads off the database.",
    metric: { value: "65%", label: "faster API responses via Redis caching" },
    tech: ["Node.js", "Express", "Redis", "Docker", "API Gateway", "MongoDB"],
    github: "https://github.com/Abhiraj-cuchd/Social-Media-Microservice",
  },
  {
    index: "03",
    name: "Mindful by Akansha",
    type: "Freelance — Client platform",
    tagline: "Blog platform for a psychologist",
    detail:
      "Responsive, SEO-optimized blog with **Sanity CMS**, structured so the client publishes fully independently — no ongoing dev involvement required.",
    metric: { value: "100%", label: "client-owned publishing, zero dev involvement" },
    tech: ["Next.js", "Sanity", "Tailwind", "Vercel"],
    live: "https://mindfulbyakansha.vercel.app/",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Backend",
    items: ["Node.js", "Express.js", "TypeScript", "JavaScript", "Redis", "Socket.IO", "REST APIs", "Microservices"],
  },
  { group: "Frontend", items: ["Next.js", "React.js", "Redux"] },
  { group: "Cloud & DevOps", items: ["AWS", "Docker", "Nginx", "API Gateway", "CI/CD", "Linux"] },
  { group: "AI / ML", items: ["LangChain", "OpenAI", "RAG", "AI Integrations"] },
  { group: "Databases", items: ["MongoDB", "PostgreSQL"] },
  { group: "Tools", items: ["Git / GitHub", "Postman"] },
];


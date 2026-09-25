import type { ComponentType } from "react";
import {
  SiNodedotjs,
  SiExpress,
  SiTypescript,
  SiJavascript,
  SiRedis,
  SiSocketdotio,
  SiNextdotjs,
  SiReact,
  SiRedux,
  SiDocker,
  SiNginx,
  SiLinux,
  SiLangchain,
  SiMongodb,
  SiPostgresql,
  SiGithub,
  SiPostman,
  SiNestjs,
  SiPrisma,
  SiMysql,
  SiSequelize,
  SiGithubactions,
  SiJenkins,
  SiJest,
  SiLanggraph,
  SiMistralai,
  SiPaddlepaddle,
} from "@icons-pack/react-simple-icons";
import {
  Boxes,
  Cloud,
  GitBranch,
  Route,
  Bot,
  BrainCircuit,
  Sparkles,
  Webhook,
  ListOrdered,
  Database,
  DatabaseZap,
} from "lucide-react";

type IconProps = { size?: number; className?: string; strokeWidth?: number; color?: string };

// Brands not in Simple Icons (AWS, OpenAI) or without a distinct product
// mark (REST, microservices, CI/CD...) fall back to a generic lucide icon.
const brandIcons: Record<string, ComponentType<IconProps>> = {
  "Node.js": SiNodedotjs,
  "Express.js": SiExpress,
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Redis: SiRedis,
  "Socket.IO": SiSocketdotio,
  "Next.js": SiNextdotjs,
  "React.js": SiReact,
  Redux: SiRedux,
  Docker: SiDocker,
  Nginx: SiNginx,
  Linux: SiLinux,
  LangChain: SiLangchain,
  MongoDB: SiMongodb,
  PostgreSQL: SiPostgresql,
  "Git / GitHub": SiGithub,
  Postman: SiPostman,
  NestJS: SiNestjs,
  Prisma: SiPrisma,
  MySQL: SiMysql,
  Sequelize: SiSequelize,
  "GitHub Actions": SiGithubactions,
  Jenkins: SiJenkins,
  Jest: SiJest,
  LangGraph: SiLanggraph,
  Mistral: SiMistralai,
  PaddleOCR: SiPaddlepaddle,
};

// Fallbacks with a well-known brand color, applied explicitly since there's
// no Simple Icons mark to source it from.
const coloredFallbackIcons: Record<string, { Icon: ComponentType<IconProps>; color: string }> = {
  AWS: { Icon: Cloud, color: "#FF9900" },
  OpenAI: { Icon: Bot, color: "#10A37F" },
};

// Generic concepts with no associated brand color — stay currentColor/muted.
const fallbackIcons: Record<string, ComponentType<IconProps>> = {
  "REST APIs": Webhook,
  Microservices: Boxes,
  "API Gateway": Route,
  "CI/CD": GitBranch,
  RAG: BrainCircuit,
  "AI Integrations": Sparkles,
  BullMQ: ListOrdered,
  pgvector: Database,
  Text2SQL: DatabaseZap,
};

export default function SkillIcon({ name, size = 16, className }: { name: string; size?: number; className?: string }) {
  const Brand = brandIcons[name];
  if (Brand) return <Brand size={size} color="default" className={className} />;

  const colored = coloredFallbackIcons[name];
  if (colored) return <colored.Icon size={size} color={colored.color} strokeWidth={1.75} className={className} />;

  const Fallback = fallbackIcons[name] ?? Boxes;
  return <Fallback size={size} strokeWidth={1.75} className={className} />;
}

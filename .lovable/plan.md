
## Senior AI Systems Engineer Portfolio — Linear-Inspired

### Design System
- **Theme**: Deep graphite background (`#0a0a0b`), near-black surfaces (`#111114`), white text, violet accent (`#7c3aed` / electric indigo)
- **Typography**: Inter font — sharp, premium, varied weights
- **Motion**: 200–300ms fade+translate on scroll reveal, soft hover lift on cards, animated underline on nav links, smooth glow on buttons
- **Layout**: Clean CSS grid, generous whitespace, 8px spacing rhythm, subtle borders at 5% white opacity

---

### Page Structure

**1. Navigation**
- Logo: name + "AI Systems Engineer" tagline
- Links: Projects · Approach · Writing
- Animated underline hover effect
- Subtle backdrop blur on scroll

**2. Hero Section**
- Headline: *"Designing Production-Grade AI Systems"* — large, high-contrast
- Subhead: AI Systems Engineer specializing in RAG, event-driven pipelines, and cloud-native architectures on AWS
- Two CTAs: "View Projects" (primary with glow) + "Download Resume" (ghost)
- Faint dot-grid or subtle grain texture background — no gradients

**3. Core Focus Areas — Icon Grid (4 cards)**
- 🧠 Retrieval-Augmented Generation — Titan embeddings, OpenSearch kNN, Bedrock Claude
- ⚡ Event-Driven AI Pipelines — S3 triggers → SQS, DLQ-backed retry, async decoupling
- ☁️ Cloud-Native Infrastructure — ECS Fargate, RDS Multi-AZ, VPC private subnets, ALB
- 📊 Reliability & Observability — IAM least-privilege, CloudWatch + X-Ray, cost modeling
- Hover: subtle lift + border brightens

**4. Featured Projects — Horizontal Carousel**

*Project 1: Serverless RAG Knowledge Assistant*
- Impact: Semantic document Q&A at scale; sub-2s query latency via kNN vector search
- Stack pills: Lambda · Bedrock (Claude + Titan) · OpenSearch · DynamoDB · S3 · API Gateway
- Highlights: Presigned S3 uploads, 512-token overlapping chunks, HNSW kNN search, DLQ-backed ingestion, X-Ray tracing, per-Lambda IAM roles

*Project 2: AI Document Risk & Compliance Analyzer*
- Impact: 99.9% message processing reliability; automated high-risk stakeholder alerting
- Stack pills: Lambda · Bedrock (Claude) · SQS · SNS · DynamoDB · S3
- Highlights: Fully async S3→SQS→Lambda pipeline, structured JSON output from Claude, DLQ with maxReceiveCount=3, idempotent DynamoDB writes, reserved concurrency as Bedrock rate guard

*Project 3: Cloud-Native Ticketing Microservices Platform*
- Impact: Migrated NestJS platform to zero-downtime Blue/Green deployments on AWS
- Stack pills: ECS Fargate · RDS PostgreSQL Multi-AZ · SNS/SQS fanout · ALB · CodeDeploy · Secrets Manager
- Highlights: SNS+SQS event fanout, private VPC subnets, security group layering, RDS Multi-AZ failover, ECR image scanning, per-task IAM roles

Carousel: CSS snap scrolling, prev/next arrows, dot indicators, smooth transitions

**5. Engineering Approach — 5 Statements**
Using the exact principles from the document:
- Design for failure, not just success paths
- Prefer async workflows over blocking systems
- Enforce IAM least privilege — no wildcards, no hardcoded credentials
- Monitor everything critical: errors, latency, queue depth, cost
- Optimize only after measuring — instrument first

Clean alternating layout, subtle scroll reveal

**6. Blog Preview — 3 Cards**
Placeholder posts derived from the content:
- "Why I Use SQS Over EventBridge for Worker Patterns"
- "RAG Architecture Tradeoffs: OpenSearch vs Bedrock Knowledge Bases"
- "Blue/Green Deployments on ECS Fargate: A Practical Guide"
Subtle card hover. "Read more →" link style.

**7. Footer**
- Name + role line
- GitHub · LinkedIn · Email icons only
- Minimal. No clutter.

---

### Technical Implementation
- All animations via Tailwind + CSS custom keyframes (no heavy libs)
- Intersection Observer for scroll reveal
- CSS scroll-snap for project carousel
- Semantic HTML5 landmarks
- Mobile-first responsive grid
- Dark color tokens in CSS variables

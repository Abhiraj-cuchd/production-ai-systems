export type CaseStudySection = {
  index: string;
  title: string;
  note: string;
  /** Paragraphs; supports **bold** via rich(). */
  body: string[];
  /** Titled sub-points, rendered as a list under the body. */
  points?: { title: string; body: string }[];
  /** Renders the architecture diagram after the body. */
  diagram?: boolean;
};

export type CaseStudy = {
  slug: string;
  name: string;
  kicker: string;
  summary: string;
  metaDescription: string;
  facts: { label: string; value: string }[];
  metric: { value: string; label: string };
  sections: CaseStudySection[];
  /** Separate work for the same client, credited on its own terms. */
  related?: { title: string; body: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "inventory-ai-agent",
    name: "Inventory AI Agent",
    kicker: "Case study — Indian Army",
    summary:
      "An assistant that answers inventory questions in plain language, built to run on the Army's own hardware with no internet connection at all.",
    metaDescription:
      "Case study: an air-gapped inventory assistant for the Indian Army. LangGraph agents, hybrid pgvector retrieval, read-only Text2SQL, PaddleOCR ingestion and a self-hosted Mistral 8B.",
    facts: [
      { label: "Client", value: "Indian Army, via Talentelgia Technologies" },
      { label: "My role", value: "Backend & infrastructure" },
      { label: "Deployment", value: "On-prem, air-gapped" },
      { label: "Stack", value: "LangGraph · PostgreSQL · pgvector · PaddleOCR · Mistral 8B" },
    ],
    metric: { value: "<3 min", label: "to generate a report. It used to take hours" },
    sections: [
      {
        index: "01",
        title: "Context",
        note: "The problem",
        body: [
          "Inventory records came in on **paper challans**. Getting an answer out of them meant someone going through the paper, or someone who could write SQL going through the database. Neither scales when the people asking the questions are the staff who run the stores.",
          "The ask was simple to state: let staff ask about inventory in plain language and get a correct answer back, from data that's actually up to date.",
        ],
      },
      {
        index: "02",
        title: "Constraints",
        note: "What we couldn't do",
        body: ["Most of the design follows from these four constraints."],
        points: [
          {
            title: "No external connectivity",
            body: "The system is fully air-gapped. No calls out to any API, no cloud services, no package pulls at runtime.",
          },
          {
            title: "Self-hosted inference only",
            body: "Every model runs locally. That rules out hosted LLMs and means working within what one on-prem GPU can serve.",
          },
          {
            title: "Data stays on-site",
            body: "Records never leave the on-prem GPU and server hardware, which I specced and configured, including storage.",
          },
          {
            title: "Safe queries from unsafe input",
            body: "Questions arrive as free text, but they end up touching real inventory records. A bad question must never turn into a bad query.",
          },
        ],
      },
      {
        index: "03",
        title: "Architecture",
        note: "And why it looks like this",
        body: [
          "Paper challans go through an **OCR pipeline built on PaddleOCR**, and a REST API writes the results into **PostgreSQL**, with pgvector embeddings alongside the rows. When someone asks a question, a **LangGraph** router reads it and sends it down one of two paths. Everything, the router included, runs on a self-hosted **Mistral 8B**.",
        ],
        diagram: true,
        points: [
          {
            title: "Why a router instead of one model doing everything",
            body: "The questions come in two kinds. Some are fuzzy (\"what came in on that challan last week?\") and are best answered by searching the records. Others are exact (\"how many of X are in stock?\") and need a real query. An 8B model is noticeably more reliable when each call has one narrow job and a short prompt than when a single prompt carries every tool and every rule. Splitting the paths also means each can be tested on its own, and the SQL path's permissions stay with the SQL path.",
          },
          {
            title: "Hybrid retrieval",
            body: "The retrieval agent combines **pgvector** similarity search with plain keyword search. Vector search handles loosely worded questions. Keyword search catches the things embeddings blur together, like item codes and challan numbers.",
          },
          {
            title: "Why Text2SQL runs under a locked-down role",
            body: "Telling a model \"only write SELECT statements\" in its prompt is a request, not a guarantee. A small local model can misread a question or be talked into something. So the limits live in the database: the Text2SQL agent connects as a **read-only role** with access to one schema, and every generated query is checked against an **allow-list** before it runs. If the model gets it wrong, Postgres refuses. The prompt is the first line of defence, not the only one.",
          },
          {
            title: "No external calls, anywhere",
            body: "OCR, embeddings, routing and generation all run on the same on-prem hardware. Nothing in the request path depends on a network connection the site doesn't have.",
          },
        ],
      },
      {
        index: "04",
        title: "Outcome",
        note: "What changed",
        body: [
          "Generating an inventory report went from **hours to under three minutes**. Staff ask in plain language instead of waiting on someone who can read the paperwork or write SQL.",
          "I built the backend and the infrastructure: the agents, the query safety layer, the OCR ingestion and API, and the on-prem hardware it all runs on.",
        ],
      },
    ],
    related: {
      title: "Also for the Indian Army: Drawal Management System",
      body: "A separate system: NFC-based logistics tracking, built with Express, MySQL and a React/Electron client. I gathered requirements on-site with commanding officers, owned it end to end as a forward-deployed engineer, and rolled it out across **14 depots**, cutting record-update time from hours to minutes.",
    },
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);

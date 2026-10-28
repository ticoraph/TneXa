export interface Technology {
  name: string;
  /** Nom du fichier dans src/assets/logos (sans .svg). Sans logo, seul le nom s'affiche. */
  logo?: string;
}

export interface TechnologyGroup {
  title: string;
  items: Technology[];
}

/** Les logos se récupèrent avec `node scripts/fetch-logos.mjs` (voir .claude/skills/logos). */
export const technologyGroups: TechnologyGroup[] = [
  {
    title: 'IA & GenAI',
    items: [
      { name: 'LLM' },
      { name: 'RAG' },
      { name: 'Agents IA' },
      { name: 'LangGraph', logo: 'langgraph' },
      { name: 'CrewAI', logo: 'crewai' },
      { name: 'LangChain', logo: 'langchain' },
      { name: 'Hugging Face', logo: 'huggingface' },
      { name: 'MCP / FastMCP', logo: 'mcp' },
      { name: 'LiteLLM' },
      { name: 'LoRA / QLoRA' },
      { name: 'TRL' },
      { name: 'Unsloth', logo: 'unsloth' },
      { name: 'LLM-as-a-judge' },
    ],
  },
  {
    title: 'Serving & inférence',
    items: [
      { name: 'vLLM', logo: 'vllm' },
      { name: 'Ollama', logo: 'ollama' },
      { name: 'Modal', logo: 'modal' },
      { name: 'llama.cpp' },
    ],
  },
  {
    title: 'Recherche & données IA',
    items: [
      { name: 'PostgreSQL', logo: 'postgresql' },
      { name: 'pgvector' },
      { name: 'Qdrant', logo: 'qdrant' },
      { name: 'Pydantic', logo: 'pydantic' },
      { name: 'SQLAlchemy', logo: 'sqlalchemy' },
    ],
  },
  {
    title: 'ML / Deep Learning',
    items: [
      { name: 'PyTorch', logo: 'pytorch' },
      { name: 'Scikit-learn', logo: 'scikitlearn' },
      { name: 'XGBoost' },
      { name: 'LightGBM' },
    ],
  },
  {
    title: 'MLOps / LLMOps',
    items: [
      { name: 'Docker', logo: 'docker' },
      { name: 'FastAPI', logo: 'fastapi' },
      { name: 'MLflow', logo: 'mlflow' },
      { name: 'GitHub Actions', logo: 'githubactions' },
      { name: 'Langfuse', logo: 'langfuse' },
      { name: 'Opik' },
      { name: 'Weights & Biases', logo: 'wandb' },
      { name: 'Ragas' },
      { name: 'OpenTelemetry', logo: 'opentelemetry' },
      { name: 'Prometheus', logo: 'prometheus' },
      { name: 'Grafana', logo: 'grafana' },
      { name: 'Loki' },
    ],
  },
  {
    title: 'Data Engineering & Automatisation',
    items: [
      { name: 'API REST' },
      { name: 'Dagster' },
      { name: 'Kestra' },
      { name: 'n8n', logo: 'n8n' },
      { name: 'Playwright' },
    ],
  },
  {
    title: 'Cloud & IaC',
    items: [
      { name: 'AWS', logo: 'aws' },
      { name: 'GCP', logo: 'gcp' },
      { name: 'Cloudflare', logo: 'cloudflare' },
      { name: 'Terraform', logo: 'terraform' },
    ],
  },
  {
    title: 'Sécurité & conformité IA',
    items: [
      { name: 'OWASP LLM Top 10', logo: 'owasp' },
      { name: 'Défense contre la prompt injection' },
      { name: 'RGPD' },
    ],
  },
  {
    title: 'Développement & Web',
    items: [
      { name: 'Python', logo: 'python' },
      { name: 'SQL' },
      { name: 'TypeScript', logo: 'typescript' },
      { name: 'React', logo: 'react' },
      { name: 'Next.js', logo: 'nextjs' },
      { name: 'Vite', logo: 'vite' },
      { name: 'Astro', logo: 'astro' },
      { name: 'Tailwind', logo: 'tailwind' },
    ],
  },
];

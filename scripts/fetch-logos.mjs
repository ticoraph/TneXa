// Télécharge les logos de la page Technologies dans src/assets/logos/.
// Usage : node scripts/fetch-logos.mjs [nom ...]   (sans argument : tous les logos)
//
// Sources, toutes en SVG monochrome :
//   si    → Simple Icons (CC0) https://simpleicons.org
//   lobe  → LobeHub Icons (MIT) https://lobehub.com/icons, pour les marques d'IA
// Les logos restent la propriété de leurs marques.
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SI_VERSION = '16.36.0';
const LOBE_VERSION = '1.101.0';

const sources = {
  si: (slug) => `https://cdn.jsdelivr.net/npm/simple-icons@${SI_VERSION}/icons/${slug}.svg`,
  lobe: (slug) => `https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@${LOBE_VERSION}/icons/${slug}.svg`,
};

/** nom du fichier local → [source, nom chez la source] */
const logos = {
  langgraph: ['si', 'langgraph'],
  crewai: ['si', 'crewai'],
  langchain: ['si', 'langchain'],
  huggingface: ['si', 'huggingface'],
  mcp: ['si', 'modelcontextprotocol'],
  unsloth: ['lobe', 'unsloth'],
  vllm: ['si', 'vllm'],
  ollama: ['si', 'ollama'],
  modal: ['si', 'modal'],
  postgresql: ['si', 'postgresql'],
  qdrant: ['si', 'qdrant'],
  pydantic: ['si', 'pydantic'],
  sqlalchemy: ['si', 'sqlalchemy'],
  pytorch: ['si', 'pytorch'],
  scikitlearn: ['si', 'scikitlearn'],
  docker: ['si', 'docker'],
  fastapi: ['si', 'fastapi'],
  mlflow: ['si', 'mlflow'],
  githubactions: ['si', 'githubactions'],
  langfuse: ['lobe', 'langfuse'],
  wandb: ['si', 'weightsandbiases'],
  opentelemetry: ['si', 'opentelemetry'],
  prometheus: ['si', 'prometheus'],
  grafana: ['si', 'grafana'],
  n8n: ['si', 'n8n'],
  aws: ['lobe', 'aws'],
  gcp: ['si', 'googlecloud'],
  cloudflare: ['si', 'cloudflare'],
  terraform: ['si', 'terraform'],
  owasp: ['si', 'owasp'],
  python: ['si', 'python'],
  typescript: ['si', 'typescript'],
  react: ['si', 'react'],
  nextjs: ['si', 'nextdotjs'],
  vite: ['si', 'vite'],
  astro: ['si', 'astro'],
  tailwind: ['si', 'tailwindcss'],
};

/** Rend le SVG décoratif et colorable par le CSS (currentColor). */
function normalize(svg) {
  return svg
    .replace(/<title>.*?<\/title>/s, '')
    .replace(/<svg[^>]*>/, (tag) => {
      const viewBox = tag.match(/viewBox="[^"]*"/)?.[0] ?? 'viewBox="0 0 24 24"';
      const rule = tag.includes('fill-rule="evenodd"') ? ' fill-rule="evenodd"' : '';
      return `<svg xmlns="http://www.w3.org/2000/svg" ${viewBox} fill="currentColor"${rule} aria-hidden="true" focusable="false">`;
    })
    .trim();
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'assets', 'logos');
await mkdir(outDir, { recursive: true });

const wanted = process.argv.slice(2);
const unknown = wanted.filter((name) => !(name in logos));
if (unknown.length) {
  console.error(`Logo inconnu dans le script : ${unknown.join(', ')}`);
  process.exit(1);
}

let failures = 0;
for (const [name, [source, slug]] of Object.entries(logos)) {
  if (wanted.length && !wanted.includes(name)) continue;
  const response = await fetch(sources[source](slug));
  if (!response.ok) {
    console.error(`✗ ${name} (${source}/${slug}) : HTTP ${response.status}`);
    failures += 1;
    continue;
  }
  await writeFile(join(outDir, `${name}.svg`), `${normalize(await response.text())}\n`);
  console.log(`✓ ${name}`);
}
process.exit(failures ? 1 : 0);

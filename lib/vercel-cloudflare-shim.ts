// Vercel has no Cloudflare Worker bindings. This keeps the public demo UI
// buildable there; persistent classes and real accounts continue to run on
// the Sites deployment where the D1 binding is available.
export const env = process.env as unknown as {
  DB?: D1Database;
  OPENAI_API_KEY?: string;
  OPENAI_MODEL?: string;
  SITE_ADMIN_EMAIL?: string;
};

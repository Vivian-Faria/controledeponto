import { getStore } from "@netlify/blobs";
import { timingSafeEqual } from "node:crypto";

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function sameToken(a, b) {
  const x = Buffer.from(String(a || ""));
  const y = Buffer.from(String(b || ""));
  return x.length === y.length && timingSafeEqual(x, y);
}

export default async (req) => {
  const secret = Netlify.env.get("PONTO_TOKEN");
  if (!secret) return json({ error: "PONTO_TOKEN não configurado no Netlify" }, 500);

  if (!sameToken(req.headers.get("x-ponto-token"), secret)) {
    await sleep(800);
    return json({ error: "senha inválida" }, 401);
  }

  const store = getStore("ponto");

  if (req.method === "GET") {
    const data = await store.get("state", { type: "json" });
    return json(data || { units: [], sessions: [], del: {}, cfg: null, adj: [] });
  }

  if (req.method === "PUT") {
    const raw = await req.text();
    if (raw.length > 5_000_000) return json({ error: "grande demais" }, 413);
    let body;
    try { body = JSON.parse(raw); } catch { return json({ error: "json inválido" }, 400); }
    if (!body || !Array.isArray(body.units) || !Array.isArray(body.sessions)) {
      return json({ error: "formato inválido" }, 400);
    }
    await store.setJSON("state", {
      units: body.units,
      sessions: body.sessions,
      del: body.del || {},
      cfg: body.cfg || null,
      adj: Array.isArray(body.adj) ? body.adj : [],
    });
    return json({ ok: true });
  }

  return json({ error: "método não permitido" }, 405);
};

export const config = { path: "/api/ponto" };

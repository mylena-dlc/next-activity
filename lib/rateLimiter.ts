import { LRUCache } from "lru-cache";
import { NextRequest, NextResponse } from "next/server";

const options = {
  max: 100, // Nombre maximal d'IP stockées
  ttl: 60 * 1000, // Temps avant expiration des entrées (1 min)
};

const rateLimitCache = new LRUCache<string, number>(options);

export function rateLimiter(req: NextRequest) {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown"; // récupération de l'IP du client

  const requestCount = (rateLimitCache.get(ip) as number) || 0;

  if (requestCount >= 5) {
    return NextResponse.json(
      { error: "Trop de requêtes, veuillez réessayer plus tard." },
      { status: 429 }
    );
  }

  rateLimitCache.set(ip, requestCount + 1);
  return null; 
}



import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0] || "unknown";
  
  return new Response(
    JSON.stringify({ ip: clientIP }),
    { headers: { "Content-Type": "application/json" } },
  )
})
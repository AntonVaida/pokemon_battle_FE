export async function GET(req) {
  const accessToken = req.cookies.get("accessToken")?.value || null;

  response.headers.set("Access-Control-Allow-Origin", "https://pokemon-battle-fe-3i7e-q0cupqt3q-antonvaidas-projects.vercel.app");
  response.headers.set("Access-Control-Allow-Credentials", "true");

  return Response.json({ accessToken });
}
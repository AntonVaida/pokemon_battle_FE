export async function GET(req) {
  try {
    const accessToken = req.cookies.get("accessToken")?.value || null;

    return Response.json({ accessToken }, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://pokemon-battle-fe-3i7e.vercel.app",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  } catch (error) {
    console.error("Error in /api/cookies:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
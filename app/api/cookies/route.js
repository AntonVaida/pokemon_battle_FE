export async function GET(req) {
  const accessToken = req.cookies.get("accessToken")?.value || null;
  
  return Response.json({ accessToken });
}
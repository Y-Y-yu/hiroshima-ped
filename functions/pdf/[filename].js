import { verifySession } from "../../src/lib/session.js";

export const GET = async ({ params, cookies }) => {
  const token = cookies.get("session")?.value;
  const user = token && verifySession(token);

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const fs = await import("fs/promises");
  const path = await import("path");

  const filename = params.filename;
  const filePath = path.join(process.cwd(), "private_pdfs", filename);

  try {
    const file = await fs.readFile(filePath);
    return new Response(file, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `inline; filename="${filename}"`,
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
};

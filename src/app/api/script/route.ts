import { connection } from "next/server";
import { SCRIPT } from "@/content/script";
import { readOverrides, saveOverride } from "@/server/script-store";

const MAX_LENGTH = 20_000;

export async function GET() {
  await connection(); // edits land on disk at runtime, so this must never be prerendered
  try {
    /* the deck's notes read `script` from here, so the script never ships in the deck bundle */
    return Response.json(
      { overrides: await readOverrides(), script: SCRIPT },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json({ error: "수정본 파일을 읽지 못했습니다." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  /* The deck runs on localhost; refuse writes coming from any other site's pages. */
  const origin = request.headers.get("origin");
  if (origin && new URL(origin).host !== request.headers.get("host")) {
    return Response.json({ error: "허용되지 않은 요청입니다." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON 형식이 아닙니다." }, { status: 400 });
  }
  const { id, text } = (body ?? {}) as { id?: unknown; text?: unknown };
  if (typeof id !== "string" || !Object.hasOwn(SCRIPT, id)) {
    return Response.json({ error: "알 수 없는 슬라이드입니다." }, { status: 400 });
  }
  if (typeof text !== "string" || text.length > MAX_LENGTH) {
    return Response.json({ error: "대본 내용이 올바르지 않습니다." }, { status: 400 });
  }

  try {
    await saveOverride(id, text);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "저장하지 못했습니다." }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from "next/server";
import { searchErrors } from "@/lib/search";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q") ?? "";
  const lang = request.nextUrl.searchParams.get("lang") ?? undefined;
  const results = searchErrors(q, lang);
  return NextResponse.json(results);
}

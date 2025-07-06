import { NextResponse } from "next/server";
import { getMesColis } from "@/app/actions/colis";

export async function GET() {
  const result = await getMesColis();
  return NextResponse.json(result);
}
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/services";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const response = await api.contact.createContact(body);
    return NextResponse.json(
      { success: true, data: response },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { deleteImages } from "./cloudinary";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const result = await deleteImages(body.publicIds ?? []);
    return NextResponse.json({ message: result }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 400 });
  }
}

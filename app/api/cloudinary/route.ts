import { NextRequest, NextResponse } from "next/server";
import { deleteImages } from "./cloudinary";
import { CustomBaseError } from "@/app/api/utils/errors";

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const result = await deleteImages(body.publicIds ?? []);
    return NextResponse.json({ message: result }, { status: 201 });
  } catch (e) {
    return NextResponse.json(
      { error: (e as CustomBaseError).message },
      { status: (e as CustomBaseError).statusCode ?? 400 },
    );
  }
}

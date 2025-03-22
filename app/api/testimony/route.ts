import { NextRequest, NextResponse } from "next/server";
import { TestimonyService } from "../services/testimony.service";
import { CustomBaseError } from "@/app/api/utils/errors";

const testimonyService = new TestimonyService();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const queryParams = url.searchParams.get("priority");
    const allTestimonies = await testimonyService.getAllTestimonies(
      queryParams ? parseInt(queryParams) : undefined,
    );
    return NextResponse.json({ message: allTestimonies }, { status: 200 });
  } catch (error) {
    const e = error as CustomBaseError;
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: e.statusCode ?? 400 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const testimonyCreated = await testimonyService.createTestimony(body);
    return NextResponse.json(
      {
        message: testimonyCreated.testimonyId,
      },
      { status: 201 },
    );
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 400 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const deleteTestimony = await testimonyService.deleteTestimony(
      body.id,
      body.isDeleted,
    );
    return NextResponse.json(
      {
        message: deleteTestimony.testimonyId,
      },
      { status: 200 },
    );
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 400 },
    );
  }
}

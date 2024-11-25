import { NextRequest, NextResponse } from "next/server";
import { TestimonyService } from "../services/testimony.service";

const testimonyService = new TestimonyService();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const queryParams = url.searchParams.get("priority");
    const allTestimonies = await testimonyService.getAllTestimonies(
      queryParams ? parseInt(queryParams) : undefined,
    );
    return NextResponse.json({ message: allTestimonies }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: e.status ?? 400 },
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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 },
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
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status ?? 400 });
  }
}

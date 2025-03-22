import { NextRequest, NextResponse } from "next/server";
import { EventService } from "../services/event.service";
import { CustomBaseError } from "@/app/api/utils/errors";

const eventService = new EventService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    const eventCreated = await eventService.createEvent(body);
    return NextResponse.json(
      { message: eventCreated.eventId },
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

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const relations = url.searchParams.get("relations");
    const valid = url.searchParams.get("valid");
    const eventList = await eventService.getAllEvents(!!relations, !!valid);
    return NextResponse.json({ message: eventList }, { status: 200 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: error.statusCode ?? 400 },
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    await eventService.deleteEvent(body.id, true, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 201 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 400 },
    );
  }
}

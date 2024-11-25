import { NextRequest, NextResponse } from "next/server";
import { EventService } from "../services/event.service";

const eventService = new EventService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    const eventCreated = await eventService.createEvent(body);
    return NextResponse.json(
      { message: eventCreated.eventId },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 },
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
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: error.status ?? 400 },
    );
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    await eventService.deleteEvent(body.id, true, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 },
    );
  }
}

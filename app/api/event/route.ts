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
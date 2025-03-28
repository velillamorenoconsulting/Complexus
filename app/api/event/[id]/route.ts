import { NextRequest, NextResponse } from "next/server";
import { EventService } from "../../services/event.service";
import { CustomBaseError } from "../../utils/errors";

const eventService = new EventService();

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { id: eventId } = params;
  try {
    const event = await eventService.getEventById(eventId);
    return NextResponse.json({ message: event }, { status: 200 });
  } catch (error) {
    if (error instanceof CustomBaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 },
    );
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { id: eventId } = params;
  try {
    const body = await req.json();
    const event = await eventService.updateEvent(eventId, body);
    return NextResponse.json({ message: event }, { status: 201 });
  } catch (error) {
    if (error instanceof CustomBaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    return NextResponse.json(
      { error: "Internal server error: " + (error as Error).message },
      { status: 500 },
    );
  }
}

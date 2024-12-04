import { NextRequest, NextResponse } from "next/server";
import { ParticipantService } from "../services/participant.service";

const participantService = new ParticipantService();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const itemList = await participantService.getAllParticipants();
    return NextResponse.json(
      {
        message: itemList,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const participantCreated = await participantService.createParticipant(body);
    return NextResponse.json(
      { message: participantCreated.participantId },
      { status: 201 },
    );
  } catch (e: any) {
    return NextResponse.json(
      {
        error: e.message,
      },
      { status: e.status ?? 400 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    await participantService.deleteParticipant(body.id, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status || 400 });
  }
}

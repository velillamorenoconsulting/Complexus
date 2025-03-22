import { NextRequest, NextResponse } from "next/server";
import { ParticipantService } from "../services/participant.service";
import { CustomBaseError } from "@/app/api/utils/errors";

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
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message + " " + req.method },
      { status: error.statusCode ?? 400 },
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

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    await participantService.deleteParticipant(body.id, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 200 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 400 },
    );
  }
}

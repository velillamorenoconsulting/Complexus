import { NextRequest, NextResponse } from "next/server";
import { RegisterService } from "./register.service";
import { CustomBaseError } from "../../utils/errors";
import { generateToken } from "../utils/jwt";

const registerService = new RegisterService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    if (body.type === "user") {
      const userCreated = await registerService.registerUser(body);
      const token = generateToken(userCreated);
      return NextResponse.json(
        { message: { user: userCreated, token } },
        { status: 201 },
      );
    } else {
      const memberCreated = await registerService.registerMember(body);
      const token = generateToken(memberCreated);
      return NextResponse.json(
        { message: { user: memberCreated, token } },
        { status: 201 },
      );
    }
  } catch (error) {
    if (error instanceof CustomBaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    return NextResponse.json(
      { error: `Internal Server Error: ${(error as Error).message}` },
      { status: 500 },
    );
  }
}

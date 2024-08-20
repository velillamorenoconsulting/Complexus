import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../../services/user.service";
import { RegisterService } from "./register.service";
import { CustomBaseError, UnauthorizedError } from "../../utils/errors";
import { generateToken } from "../utils/jwt";

const registerService = new RegisterService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const userCreated = await registerService.registerUser(body);
    const token = generateToken(userCreated);
    return NextResponse.json(
      { message: { user: userCreated, token } },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof CustomBaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode }
      );
    }
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}

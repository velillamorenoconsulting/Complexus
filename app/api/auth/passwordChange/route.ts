import { NextRequest, NextResponse } from "next/server";
import { CustomBaseError, UnauthorizedError } from "../../utils/errors";
import { verifyToken } from "../utils/jwt";
import { PasswordChangeService } from "./passwordChange.service";

const passwordService = new PasswordChangeService();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const receivedToken = req.headers.get("Authorization");
    if (!receivedToken) throw new UnauthorizedError("Invalid token");
    const user = verifyToken(receivedToken);
    await passwordService.resetPassword(user.email);
    return NextResponse.json(
      { message: "Password email sent" },
      { status: 200 },
    );
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

import { NextRequest, NextResponse } from "next/server";
import { LoginService } from "./login.service";
import { CustomBaseError } from "../../utils/errors";

const loginService = new LoginService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const token = await loginService.loginUser(body);
    return NextResponse.json({ message: token }, { status: 200 });
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

import { NextRequest, NextResponse } from "next/server";
import { LoginService } from "./login.service";
import { CustomBaseError, ValidateError } from "../../utils/errors";
import { plainToInstance } from "class-transformer";
import { LoginDTO } from "../dtos/login.dto";
import { ValidationError, validateOrReject } from "class-validator";
import { LoginType } from "../../types/auth.types";

const loginService = new LoginService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const loginInfo = plainToInstance(LoginDTO, body);
    try {
      await validateOrReject(loginInfo);
    } catch (error: any) {
      const constraints = error.map((error: ValidationError) => {
        const key = Object.keys(error.constraints as object)[0];
        return error.constraints?.[key];
      });
      throw new ValidateError(constraints);
    }
    let token: string;
    if (loginInfo.type === LoginType.USER) {
      token = await loginService.loginUser(body);
    } else {
      token = await loginService.loginMember(body);
    }
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

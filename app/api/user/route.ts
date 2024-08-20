import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../services/user.service";

const userService = new UserService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    const userCreated = await userService.createUser(body);
    return NextResponse.json({ message: userCreated.userId }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

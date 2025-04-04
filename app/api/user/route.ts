import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../services/user.service";
import { CustomBaseError } from "@/app/api/utils/errors";

const userService = new UserService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    const userCreated = await userService.createUser(body);
    return NextResponse.json({ message: userCreated.userId }, { status: 201 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const userList = await userService.getAllUsers();
    return NextResponse.json({ message: userList }, { status: 200 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    const { id, updatedBy } = body;
    await userService.deleteUser(id, true, updatedBy);
    return NextResponse.json({ message: id }, { status: 200 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

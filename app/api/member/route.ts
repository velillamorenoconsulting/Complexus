import { NextRequest, NextResponse } from "next/server";
import { MemberService } from "../services/member.service";
import { CustomBaseError } from "@/app/api/utils/errors";

const memberService = new MemberService();

export async function GET(): Promise<NextResponse> {
  try {
    const memberList = await memberService.getAllMembers();
    return NextResponse.json({ message: memberList }, { status: 200 });
  } catch (error) {
    const e = error as CustomBaseError;
    return NextResponse.json(
      { error: e.message },
      { status: e.statusCode || 400 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const memberResult = await memberService.createMember(body);
    return NextResponse.json({ message: memberResult }, { status: 201 });
  } catch (error) {
    const e = error as CustomBaseError;
    return NextResponse.json(
      { error: e.message },
      { status: e.statusCode || 400 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    await memberService.deleteMember(body.id, true, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 200 });
  } catch (error) {
    const e = error as CustomBaseError;
    return NextResponse.json(
      { error: e.message },
      { status: e.statusCode || 400 },
    );
  }
}

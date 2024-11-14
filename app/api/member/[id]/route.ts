import { NextRequest, NextResponse } from "next/server";
import { MemberService } from "../../services/member.service";
import { CustomBaseError } from "../../utils/errors";

const memberService = new MemberService();

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
): Promise<NextResponse> {
  const { id: memberId } = params;
  try {
    const event = await memberService.getMemberById(memberId);
    return NextResponse.json({ message: event }, { status: 200 });
  } catch (error: any) {
    if (error instanceof CustomBaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    return NextResponse.json(
      { error: "Internal server error: " + error.message },
      { status: 500 },
    );
  }
}

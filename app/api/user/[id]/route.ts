import { NextRequest, NextResponse } from "next/server";
import { UserService } from "../../services/user.service";
import { CustomBaseError } from "../../utils/errors";

const userService = new UserService();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
): Promise<NextResponse> {
  const { id: userId } = params;
  try {
    const user = await userService.getUserById(userId);
    return NextResponse.json({ message: user }, { status: 200 });
  } catch (error) {
    if (error instanceof CustomBaseError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode },
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

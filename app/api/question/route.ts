import { NextRequest, NextResponse } from "next/server";
import { QuestionService } from "../services/question.service";

const questionService = new QuestionService();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const questionCreated = await questionService.createQuestion(body);
    return NextResponse.json(
      { message: questionCreated.questionId },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 }
    );
  }
}

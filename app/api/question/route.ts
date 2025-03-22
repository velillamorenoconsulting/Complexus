import { NextRequest, NextResponse } from "next/server";
import { QuestionService } from "../services/question.service";
import { CustomBaseError } from "@/app/api/utils/errors";

const questionService = new QuestionService();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const questionCreated = await questionService.createQuestion(body);
    return NextResponse.json(
      { message: questionCreated.questionId },
      { status: 201 },
    );
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 400 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const questionList = await questionService.findAllQuestions();
    return NextResponse.json({ message: questionList }, { status: 200 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 400 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    await questionService.deleteQuestion(body.id, true, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 200 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 400 },
    );
  }
}

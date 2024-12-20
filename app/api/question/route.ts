import { NextRequest, NextResponse } from "next/server";
import { QuestionService } from "../services/question.service";

const questionService = new QuestionService();

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const questionCreated = await questionService.createQuestion(body);
    return NextResponse.json(
      { message: questionCreated.questionId },
      { status: 201 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    const questionList = await questionService.findAllQuestions();
    return NextResponse.json({ message: questionList }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    await questionService.deleteQuestion(body.id, true, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: e.status || 400 });
  }
}

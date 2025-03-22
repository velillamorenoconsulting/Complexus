import { NextRequest, NextResponse } from "next/server";
import { ItemService } from "../services/item.service";
import { CustomBaseError } from "@/app/api/utils/errors";

const itemService = new ItemService();

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const url = new URL(req.url);
    const valid = url.searchParams.get("valid");
    const itemList = await itemService.getAllItems(!!valid);
    return NextResponse.json(
      {
        message: itemList,
      },
      { status: 200 },
    );
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode ?? 400 },
    );
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    const itemCreated = await itemService.createItem(body);
    return NextResponse.json({ message: itemCreated.itemId }, { status: 201 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: error.statusCode ?? 400 },
    );
  }
}

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  const body = await req.json();
  try {
    await itemService.deleteItem(body.id, true, body.updatedBy);
    return NextResponse.json({ message: body.id }, { status: 200 });
  } catch (e) {
    const error = e as CustomBaseError;
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 400 },
    );
  }
}

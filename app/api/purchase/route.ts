import { NextRequest, NextResponse } from "next/server";
import { PurchaseService } from "../services/purchase.service";
import { CustomBaseError } from "@/app/api/utils/errors";

const purchaseService = new PurchaseService();

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json();
  try {
    const purchaseCreated = await purchaseService.createPurchase(body);
    return NextResponse.json(
      {
        message: purchaseCreated.purchaseId,
      },
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

import { NextRequest, NextResponse } from "next/server";
import { PurchaseService } from "../services/purchase.service";

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
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status ?? 400 },
    );
  }
}

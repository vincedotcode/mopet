// app/api/create-checkout-session/route.ts

import { createStripeSession } from "@/lib/actions/stripe.actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { donationId, amount } = await request.json();

    const session = await createStripeSession({ donationId, amount });
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error creating Stripe session:", error);
    return NextResponse.json({ error: "Failed to create Stripe session" }, { status: 500 });
  }
}

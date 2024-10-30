"use server";

import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia",
});

interface CreateCheckoutSessionParams {
  donationId: string;
  amount: number;
}

export async function createStripeSession({ donationId, amount }: CreateCheckoutSessionParams) {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Donation",
              description: `Donation for ${donationId}`,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.BASE_URL}/donations?success=true?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BASE_URL}/donations?cancel`,
    });

    return { url: session.url };
  } catch (error) {
    console.error("Stripe session error:", error);
    throw new Error("Failed to create Stripe session");
  }
}

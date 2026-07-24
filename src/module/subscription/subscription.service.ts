import { stripe } from "../../lib/stripe";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import Stripe from "stripe";
import { subscriptionUtils } from "./subscription.utils";
const checkout = async (userId: string) => {
  const transactionResult = await prisma.$transaction(async (tx) => {
    const user = await tx.user.findFirstOrThrow({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
      omit: {
        password: true,
      },
    });

    let stripeCustomerId = user.subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      let customer = await stripe.customers.create({
        name: user.name,
        email: user.email,
        metadata: {
          userId: user.id,
        },
      });
      console.log("created stripe customer", customer);
      stripeCustomerId = customer.id;
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: "price_1ToR173NZ7eZz1kRHqIXa5pZ",
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: stripeCustomerId,
      payment_method_types: ["card"],
      success_url: `${config.app_url}/premium`,
      cancel_url: `${config.app_url}/pricing`,
      metadata: {
        userId: user.id,
      },
    });

    return session.url;
  });

  return { checkoutUrl: transactionResult };
};

//check subscription status
const checkSubscriptionStatus = async (userId: string) => {
  const subscription = await prisma.subscription.findUnique({
    where: {
      userId: userId,
    },
  });

  
  return subscription ? {
    subscriptionStatus: subscription?.status,
    StripeSubscriptionId: subscription?.subscriptionId,
    subscriptionCreatedAt: subscription?.createdAt,
    currentPeriodEnd: subscription?.currentPeriodEnd,
    
  } : {
    subscriptionStatus: false,
    currentPeriodEnd: null,
  };
};

const webhookHandler = async (payload: Buffer, signature: string) => {
  const webhookSecret = config.stripe_webhook_secret as string;

  const event: Stripe.Event = stripe.webhooks.constructEvent(
    payload,
    signature!,
    webhookSecret,
  );

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      await subscriptionUtils.handleCheckoutComplete(event.data.object);
    case "customer.subscription.updated":
      await subscriptionUtils.handleSubscriptionChange(
        event.data.object as Stripe.Subscription,
      );
      console.log("customer subscription event triggered ", event.type);
      break;
    case "customer.subscription.deleted":

      await subscriptionUtils.handleSubscriptionChange(
        event.data.object as Stripe.Subscription,
      );
      console.log("customer subscription event triggered ", event.type, event.data.object);
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
};

export const subscriptionService = { checkout, webhookHandler,checkSubscriptionStatus };

import { stripe } from "../../lib/stripe";
import { prisma } from "../../lib/prisma";
import config from "../../config";
import Stripe from "stripe";

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
      success_url: `${config.app_url}/?success=true`,
      cancel_url: `${config.app_url}/?success=false`,
      metadata: {
        userId: user.id,
      },
    });

    return session.url;
  });

  return { checkoutUrl: transactionResult };
};

const webhookHandler = async (payload: Buffer, signature: string) => {
  const webhookSecret = config.stripe_webhook_secret as string;

  const event = stripe.webhooks.constructEvent(
    payload,
    signature!,
    webhookSecret,
  );

  // Handle the event
  switch (event.type) {
    case "checkout.session.completed":
      const session: Stripe.Checkout.Session = event.data.object;
      await handleCheckoutComplete(session);
    case "customer.subscription.updated":
      break;
    case "customer.subscription.deleted":
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
};

const handleCheckoutComplete = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer;
  const stripeSubscriptionId = session.subscription;
  const stripeSubscription = await stripe.subscriptions.retrieve(
    stripeSubscriptionId as string,
  );
  const subscriptionEndInSeconds =
    stripeSubscription.items.data[0].current_period_end;

  const subscriptionEndInDate = new Date(subscriptionEndInSeconds * 1000);

  await prisma.subscription.upsert({
    where: {
      userId: userId,
    },
    create: {
      userId: userId as string,
      stripeCustomerId: stripeCustomerId as string,
      subscriptionId: stripeSubscriptionId as string,
      currentPeriodEnd: subscriptionEndInDate,
      status: "ACTIVE",
    },
    update: {
      stripeCustomerId: stripeCustomerId as string,
      subscriptionId: stripeSubscriptionId as string,
      currentPeriodEnd: subscriptionEndInDate,
      status: "ACTIVE",
    },
  });
  console.log("subscription end in", subscriptionEndInDate);

  console.log("stripe subscription details", stripeSubscription.items.data);
  console.log("session", stripeCustomerId, stripeSubscriptionId);
};
export const subscriptionService = { checkout, webhookHandler };

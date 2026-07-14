import Stripe from "stripe";
import { stripe } from "../../lib/stripe";
import { prisma } from "../../lib/prisma";
import { SubscriptionStatus } from "../../../generated/prisma/enums";

const getCurrentPeriodEnd = async (subscriptionData: Stripe.Subscription) => {
  console.log(subscriptionData);
  const subscriptionEndInSeconds =
    subscriptionData.items?.data[0]?.current_period_end;

  console.log("subscriptions end in second", subscriptionEndInSeconds);

  const subscriptionEndInDate = new Date(subscriptionEndInSeconds! * 1000);

  return subscriptionEndInDate;
};

const handleCheckoutComplete = async (session: Stripe.Checkout.Session) => {
  const userId = session.metadata?.userId;
  const stripeCustomerId = session.customer;
  const stripeSubscriptionId = session.subscription;
  const stripeSubscription = await stripe.subscriptions.retrieve(
    stripeSubscriptionId as string,
  );

  const currentPeriodEnd = await getCurrentPeriodEnd(stripeSubscription);

  await prisma.subscription.upsert({
    where: {
      userId: userId,
    },
    create: {
      userId: userId as string,
      stripeCustomerId: stripeCustomerId as string,
      subscriptionId: stripeSubscriptionId as string,
      currentPeriodEnd: currentPeriodEnd,
      status: "ACTIVE",
    },
    update: {
      stripeCustomerId: stripeCustomerId as string,
      subscriptionId: stripeSubscriptionId as string,
      currentPeriodEnd: currentPeriodEnd,
      status: "ACTIVE",
    },
  });
  console.log("subscription end in", currentPeriodEnd);

  console.log("stripe subscription details", stripeSubscription.items.data);
  console.log("session", stripeCustomerId, stripeSubscriptionId);
};

const handleSubscriptionChange = async (subscription: Stripe.Subscription) => {
  console.log("subscription id in handleSubscriptionCHange",subscription)
  const subscriptionId = subscription.id;

  const status =
    subscription.status === "active" || subscription.status === "trialing"
      ? SubscriptionStatus.ACTIVE
      : subscription.status === "canceled"
        ? SubscriptionStatus.CANCELED
        : SubscriptionStatus.EXPIRED;

  console.log("new subscription status",status)

  const currentPeriodEnd =await getCurrentPeriodEnd(subscription);

  const isSubscriptionExist = await prisma.subscription.findUnique({
    where: {
      subscriptionId: subscriptionId,
    },
  });

  if (!isSubscriptionExist) {
    console.log(
      `Webhook : No Subscription found for subscription id : ${subscriptionId}`,
    );

    return;
  }

  await prisma.subscription.update({
    where :{
      subscriptionId :subscriptionId
    },
    data :{
      status :status,
      currentPeriodEnd :currentPeriodEnd
    }
  })
 
};

export const subscriptionUtils = {
  getCurrentPeriodEnd,
  handleCheckoutComplete,
  handleSubscriptionChange,
};

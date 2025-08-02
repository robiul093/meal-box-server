import Stripe from 'stripe';
import { CreateCustomerInput, PaymentInput } from './payment.interface';
import PaymentModel from './payment.model';
import config from '../../config';

const stripe = new Stripe(config.stripe_api_key!, {
  apiVersion: '2022-11-15',
});

export const createStripeCustomer = async ({
  name,
  email,
  payment_method_id,
}: CreateCustomerInput) => {
  const customer = await stripe.customers.create({
    name,
    email,
    payment_method: payment_method_id,
    invoice_settings: {
      default_payment_method: payment_method_id,
    },
  });

  const paymentMethod = await stripe.paymentMethods.retrieve(payment_method_id);
  const card = paymentMethod.card;

  const saved = await PaymentModel.create({
    customerId: customer.id,
    paymentMethodId: payment_method_id,
    name,
    email,
    last4: card?.last4,
    brand: card?.brand,
    exp_month: card?.exp_month,
    exp_year: card?.exp_year,
  });

  return saved;
};

export const chargeCustomer = async ({ customerId, amount }: PaymentInput) => {
  const paymentIntent = await stripe.paymentIntents.create({
    customer: customerId,
    amount: amount * 100,
    currency: 'usd',
    confirm: true,
    automatic_payment_methods: { enabled: true },
  });

  return paymentIntent;
};

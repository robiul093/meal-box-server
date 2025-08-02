import { Request, Response } from "express";
import { chargeCustomer, createStripeCustomer } from "./payment.service";

export const handleCreateCustomer = async (req: Request, res: Response) => {
  try {
    const data = await createStripeCustomer(req.body);
    res.status(200).json({ success: true, customer: data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const handleChargeCustomer = async (req: Request, res: Response) => {
  try {
    const data = await chargeCustomer(req.body);
    res.status(200).json({ success: true, paymentIntent: data });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

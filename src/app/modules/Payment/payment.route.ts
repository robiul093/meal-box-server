import express from "express";
import { handleChargeCustomer, handleCreateCustomer } from "./payment.controller";

const router = express.Router();

router.post("/create-customer", handleCreateCustomer);
router.post("/pay", handleChargeCustomer);

export const PaymentRoutes = router;

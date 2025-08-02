import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    paymentMethodId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    last4: String,
    brand: String,
    exp_month: Number,
    exp_year: Number,
  },
  {
    timestamps: true,
  }
);

const PaymentModel = mongoose.model("Payment", PaymentSchema);
export default PaymentModel;

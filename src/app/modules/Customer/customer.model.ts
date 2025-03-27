import mongoose, { Schema } from 'mongoose';
import { TOrder } from './customer.interface';

const orderSchema = new Schema<TOrder>({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  mealSelection: [
    {
      mealId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Meal',
        required: true,
      },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  dietaryPreferences: {
    type: String,
    enum: ['vegan', 'keto', 'gluten-free', 'normal'],
    default: 'normal',
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'delivered', 'cancelled'],
    default: 'pending',
  },
});

export const Order = mongoose.model('Order', orderSchema);

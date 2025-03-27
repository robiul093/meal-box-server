import { Types } from 'mongoose';

export type TOrder = {
  customer: Types.ObjectId;
  provider: Types.ObjectId;
  mealSelection: [
    {
      mealId: Types.ObjectId;
      quantaty: number;
    },
  ];
  dietaryPreferences: 'vegan' | 'keto' | 'gluten-free' | 'normal';
  totalPrice: number;
  status: 'pending' | 'in-progress' | 'delivered' | 'cancelled';
};

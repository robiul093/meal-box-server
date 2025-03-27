import { Types } from 'mongoose';

export type TMeal = {
  name: string;
  description: string;
  provider: Types.ObjectId;
  image?: string;
  price: number;
  dietaryCategory: 'vegan' | 'keto' | 'gluten-free' | 'normal';
  ingredients: string[];
  available: boolean;
};

export const USER_ROLE = {
  customer: 'customer',
  provider: 'provider',
};

export type TUserRole = keyof typeof USER_ROLE;

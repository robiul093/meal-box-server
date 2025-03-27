import mongoose, { Schema } from 'mongoose';
import { TMeal } from './provider.interface';

const mealSchema = new Schema<TMeal>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    dietaryCategory: {
      type: String,
      enum: ['vegan', 'keto', 'gluten-free', 'normal'],
      required: [true, 'Dietary category is required'],
    },
    ingredients: [
      {
        type: String,
        required: [true, 'Ingredients are required'],
        trim: true,
      },
    ],
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export const Meal = mongoose.model('Meal', mealSchema);

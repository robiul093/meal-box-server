import mongoose, { Schema } from 'mongoose';
import { TUser } from './auth.interface';
import bcript from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true,
    },
    phoneNumber: {
      type: String,
    },
    password: {
      type: String,
      required: [true, 'Password is Required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    role: {
      type: String,
      enum: ['customer', 'provider'],
      default: 'customer',
    },
    status: {
      type: String,
      required: [true, 'Status is Required'],
      enum: ['active', 'blocked'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre('save', async function (next) {
  // const user = this;

  this.password = await bcript.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

export const User = mongoose.model('User', userSchema);

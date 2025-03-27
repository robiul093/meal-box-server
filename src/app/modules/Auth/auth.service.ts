import config from '../../config';
import { TUser } from './auth.interface';
import { User } from './auth.model';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createUserIntoDb = async (payload: TUser) => {
  const result = await User.create(payload);

  return result;
};

const userLoginIntoDb = async (payload: TUser) => {
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new Error('User not found!');
  }

  if (user.status === 'blocked') {
    throw new Error('User is blocked');
  }

  if (user.isDeleted === true) {
    throw new Error('User is deleted');
  }

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new Error('Password not match');
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '30d',
  });

  return accessToken;
};


const updateUserNameIntoDb = async (user: JwtPayload, payload: { name?: string, email?: string }) => {
  const result = await User.findByIdAndUpdate({ _id: user.userId }, { $set: payload }, { new: true });

  return result;
};

export const authService = {
  createUserIntoDb,
  userLoginIntoDb,
  updateUserNameIntoDb,
};

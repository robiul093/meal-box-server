import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/Auth/auth.model';
import { TUserRole } from '../modules/MealProvider/provider.interface';

export interface DecodedUser extends JwtPayload {
  userId: string;
  name: string;
  email: string;
  role: 'customer' | 'mealProvider';
}

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // console.log(token)
    if (!token) {
      throw new Error('You are not authorize token');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email, role } = decoded;
    // console.log(decoded)
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error('User is not exist');
    }

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new Error('This user is deleted');
    }

    const status = user?.status;

    if (status === 'blocked') {
      throw new Error('This user is blocked');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      // console.log(requiredRole , !requiredRole.includes(role))
      throw new Error('You role is not authorized');
    }

    req.user = decoded;

    next();
  });
};

export default auth;

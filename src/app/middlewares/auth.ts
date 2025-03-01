import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from "../config";
import { User } from "../modules/Auth/auth.model";

type TuserRole = {
    customer: string,
    provider: string
}

const auth = (...requiredRole: TuserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {

        const token = req.headers.authorization;

        if (!token) {
            throw new Error('You are not authorize');
        };


        const decoded = jwt.verify(
            token,
            config.jwt_access_secret as string,
        ) as JwtPayload;

        const { name, email, phoneNumber, role, userId } = decoded;

        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User is not exist');
        };

        const isDeleted = user?.isDeleted;

        if (isDeleted) {
            throw new Error('This user is deleted');
        };

        const status = user?.status;

        if (status === 'blocked') {
            throw new Error('This user is blocked');
        };


        if (requiredRole && !requiredRole.includes(role)) {
            throw new Error('You are not authorized')
        };

        req.user = decoded;

        next();
    })
}
import { Router } from "express";
import { loginSchema, signUpSchema } from "../types/userSchema.js";
import { sendError, sendSuccess } from "../utils/apiResponse.js";
import { STATUS_CODES } from "../utils/statusCodes.js";
import User from "../models/user.model.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken.js";

const userRouter = Router();

userRouter.post("/register", async (req, res) => {
    try {
        const { success } = signUpSchema.safeParse(req.body);
        if (!success) {
            return sendError(res, "Invalid body", STATUS_CODES.BAD_REQUEST);
        }
        const { firstName, lastName, username, email, phoneNumber, password } =
            req.body;

        const user = await User.findOne({
            $or: [{ username }, { email }, { phoneNumber }],
        });

        if (user) {
            return sendError(
                res,
                "User already exists",
                STATUS_CODES.FORBIDDEN
            );
        }
        const refreshToken = generateRefreshToken({
            username,
            email,
        });

        const newUser = await User.create({
            firstName,
            lastName,
            username,
            email,
            phoneNumber,
            password,
            refreshToken,
        });

        const token = generateAccessToken({
            _id: newUser._id,
            username,
            email,
        });

        return sendSuccess(
            res,
            "User succesfully created",
            STATUS_CODES.SUCCESS,
            { token }
        );
    } catch (err) {
        console.log(err);
        return sendError(
            res,
            "Error in server",
            STATUS_CODES.SERVER_ERROR,
            err
        );
    }
});

userRouter.post("/login", async (req, res) => {
    try {
        const { success } = loginSchema.safeParse(req.body);

        if (!success) {
            return sendError(res, "Invalid body", STATUS_CODES.BAD_REQUEST);
        }
        const { identifier, password } = req.body;

        const query = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier)
            ? { email: identifier }
            : { username: identifier };

        const user = await User.findOne(query);

        if (!user) {
            return sendError(res, "User not found", STATUS_CODES.NOT_FOUND);
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return sendError(res, "Invalid password", STATUS_CODES.FORBIDDEN);
        }

        user.refreshToken = generateRefreshToken({
            username: user.username,
            email: user.email,
        });

        await user.save();

        const token = generateAccessToken({
            _id: user._id,
            username: user.username,
            email: user.email,
        });

        sendSuccess(res, "Logged in successfully", STATUS_CODES.SUCCESS, {
            token,
        });
    } catch (err) {
        console.log(err);
        return sendError(
            res,
            "Error in server",
            STATUS_CODES.SERVER_ERROR,
            err
        );
    }
});

userRouter.post("/logout", async (req, res) => {});

export default userRouter;

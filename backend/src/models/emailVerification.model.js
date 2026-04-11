import mongoose from "mongoose";

const emailVerificationSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
        },
        username: {
            type: String,
            required: [true, "Email is required"],
            trim: true,
        },
        otp: {
            type: String,
            required: [true, "OTP is required"],
        },
        otpExpiry: {
            type: Date,
            required: [true, "OTP expiry is required"],
            index: { expires: 0 },
        },
        attempts: {
            type: Number,
            default: 0,
        },
        maxAttempts: {
            type: Number,
            default: 5,
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        verifiedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

const EmailVerification = mongoose.model(
    "EmailVerification",
    emailVerificationSchema
);

export default EmailVerification;

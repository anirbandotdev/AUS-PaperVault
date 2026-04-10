import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        username: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            required: [true, "Name is required"],
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;

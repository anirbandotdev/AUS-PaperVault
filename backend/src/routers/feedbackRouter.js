import { Router } from "express";
import { sendError, sendSuccess } from "../utils/apiResponse.js";
import { STATUS_CODES } from "../utils/statusCodes.js";
import { feedbackSchema } from "../types/feedbackSchema.js";
import Feedback from "../models/feedback.model.js";

const feedbackRouter = Router();

feedbackRouter.post("/send", async (req, res) => {
    try {
        const { success, error, data } = feedbackSchema.safeParse(req.body);

        if (!success) {
            return sendError(
                res,
                "Invalid body",
                STATUS_CODES.BAD_REQUEST,
                error.message
            );
        }

        await Feedback.create({
            name: data.name,
            email: data.email,
            message: data.message,
        });

        sendSuccess(res, "Feedback sent successfully", STATUS_CODES.SUCCESS);
    } catch (err) {
        sendError(
            res,
            "Error in sending feedback",
            STATUS_CODES.SERVER_ERROR,
            err
        );
    }
});

export default feedbackRouter;

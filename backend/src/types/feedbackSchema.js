import z from "zod";

export const feedbackSchema = z.object({
    message: z.string(),
});

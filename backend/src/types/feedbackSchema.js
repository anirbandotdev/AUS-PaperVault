import z from "zod";

export const feedbackSchema = z.object({
    name: z.string(),
    email: z.email(),
    message: z.string(),
});

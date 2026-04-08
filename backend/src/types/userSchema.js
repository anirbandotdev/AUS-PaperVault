import z from "zod";

export const signUpSchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    username: z
        .string()
        .refine((val) => !val.includes("@"), {
            message: "Username cannot contain @",
        }),
    email: z.email(),
    phoneNumber: z.string(),
    password: z.string(),
});

export const loginSchema = z.object({
    identifier: z.string(),
    password: z.string(),
});

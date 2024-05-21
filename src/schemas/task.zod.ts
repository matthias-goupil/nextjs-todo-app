import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string().trim().min(1, {
        message: "Le champs est requis"
    }),
    content: z.string().nullable(),
});

import { Router } from "express";
import { z } from "zod";

const router = Router();

const bodySchema = z.object({
    value: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .refine((n) => n >= 1 && n <= 1000, "out-of-range")
});

router.post("/option", (req, res) => {
    const parsed = bodySchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({ error: "Некорректное значение" });
    }

    const n = parsed.data.value;
    return res.json({
        message: `Выбранная опция ${n} успешно принята.`
    });
});

export default router;

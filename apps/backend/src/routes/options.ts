import { Router } from "express";
const router = Router();

// Генерируем массив 1…1000
const OPTIONS = Array.from({ length: 1000 }, (_, i) => {
    const n = (i + 1).toString();
    return { name: n, value: n };
});

router.get("/", (_req, res) => res.json(OPTIONS));

export default router;

import { createServer } from "./app.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

createServer().listen(PORT, () =>
    console.log(`API ready ➜ http://localhost:${PORT}`)
);

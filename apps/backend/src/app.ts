import express from "express";
import cors from "cors";
import optionsRoute from "./routes/options.js";
import selectedRoute from "./routes/selected.js";

export function createServer() {
    const app = express();
    app.use(cors({ origin: "http://localhost:3000" }));
    app.use(express.json());

    app.use("/options", optionsRoute);
    app.use("/selected", selectedRoute);   // /selected/option

    return app;
}

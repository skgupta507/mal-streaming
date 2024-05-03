import express from "express";
import helmet from "helmet";
import cors from "cors";
import router from "./router.js";

const API = express();

API.use(express.json());
API.use(helmet());
API.use(cors());

API.get("/", (req, res) => {
    res.json({ message: "MAL Streaming API 🎉" });
});

API.use("/api", router);

export default API
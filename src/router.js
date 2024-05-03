import { Router } from "express";
import { getList } from "./modules.js";
const router = Router();

router.get("/airing", async (req, res) => {
    const page = req.query.page || 1
    res.json(await getList("airing", page));
});

router.get("/popular", async (req, res) => {
    const page = req.query.page || 1
    res.json(await getList("bypopularity", page));
});

router.get("/favorite", async (req, res) => {
    const page = req.query.page || 1
    res.json(await getList("favorite", page));
});

router.get("/upcoming", async (req, res) => {
    const page = req.query.page || 1
    res.json(await getList("upcoming", page));
});

export default router
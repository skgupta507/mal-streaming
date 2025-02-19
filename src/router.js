import { Router } from "express";
import { getList, getGenres, getSearch, getInfo, getStream } from "./modules.js";
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

router.get("/genres", async (req, res) => {
    res.json(await getGenres());
});

router.get("/search", async (req, res) => {
    const query = req.query.query
    const page = req.query.page || 1
    res.json(await getSearch(query, page));
});

router.get("/info/:id", async (req, res) => {
    const id = req.params.id
    res.json(await getInfo(id));
});

router.get("/stream/:id", async (req, res) => {
    const id = req.params.id
    res.json(await getStream(id));
});

export default router
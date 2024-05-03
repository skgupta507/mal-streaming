import axios from "axios";
import { getEpisodes, getGOGO, getSource, encode } from "./utils.js"

export const getList = async (type, page) => {
    const data = [];
    const req = (await axios.get(`https://api.jikan.moe/v4/top/anime?filter=${type}&page=${page}`)).data

    const pagination = {
        total: req.pagination.last_visible_page,
        current: req.pagination.current_page,
        next: req.pagination.has_next_page
    }

    req.data.map(i => {
        data.push({
            id: i.mal_id,
            url: i.url,
            title: i.title,
            cover: i.images.webp.image_url,
            type: i.type,
            synopsis: i.synopsis,
            status: i.status,
            score: i.score,
            season: i.season,
            year: i.year,
            genres: i.genres.map(genre => {
                return genre.name
            }),
            episodes: i.episodes,
            source: i.source,
            studios: i.studios[0].name,
            producers: i.producers.map(producer => {
                return producer.name
            }),
            trailer: i.trailer.url
        });
    });

    return { pagination, data }
}

export const getInfo = async (id) => {
    const req = (await axios.get(`https://api.jikan.moe/v4/anime/${id}/full`)).data
    const data = {
        id: req.data.mal_id,
        url: req.data.url,
        title: req.data.title,
        cover: req.data.images.webp.image_url,
        type: req.data.type,
        synopsis: req.data.synopsis,
        status: req.data.status,
        score: req.data.score,
        season: req.data.season,
        year: req.data.year,
        genres: req.data.genres.map(genre => {
            return genre.name
        }),
        episode: req.data.episodes,
        source: req.data.source,
        studios: req.data.studios[0].name,
        producers: req.data.producers.map(producer => {
            return producer.name
        }),
        trailer: req.data.trailer.url,
        episodes: await getEpisodes(await getGOGO(id))
    }

    return data
}

export const getStream = async (id) => {
    const res = await getSource(id);
    const data = {
        id: res.info.id,
        title: res.info.title,
        episode: res.info.episode,
        sources: {
            default: res.sources[0].file,
            backup: res.sources[1].file
        },
        iframes: {
            plyr: `https://plyr.link/p/player.html#${encode(res.sources[0].file)}`,
            nspl: `https://nspl.nyt92.eu.org/player?p=${encode(`file=${res.sources[0].file}`)}`
        }
    }
    
    return data
}
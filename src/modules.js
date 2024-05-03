import axios from "axios";

export const getList = async (type, page) => {
    const req = (await axios.get(`https://api.jikan.moe/v4/top/anime?filter=${type}&page=${page}`)).data

    const pagination = {
        total: req.pagination.last_visible_page,
        current: req.pagination.current_page,
        next: req.pagination.has_next_page
    }

    const data = [];
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
            trailer: i.trailer.url
        });
    });

    return { pagination, data }
}
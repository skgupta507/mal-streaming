import axios from "axios";
import { load } from "cheerio";
import crypto from "crypto-js";

export const getEpisodes = async (id) => {
    try {
        const res = await (await axios.get(`https://anitaku.so/category/${id}`)).data
        const $ = load(res);
        const start = $("#episode_page > li").first().find("a").attr("ep_start");
        const end = $("#episode_page > li").last().find("a").attr("ep_end");
        const movie = $("#movie_id").attr("value");
        const alias = $("#alias_anime").attr("value");
        const episode_url = "https://ajax.gogocdn.net/ajax/load-list-episode"
        const episode = (await axios.get(`${episode_url}?ep_start=${start}&ep_end=${end}&id=${movie}&default_ep=${0}&alias=${alias}`)).data
        const $$ = load(episode);
        const data = [];
        $$("#episode_related > li").each((i, e) => {
            data.push({
                id: $(e).find("a").attr("href").split("/")[1],
                episode: "Episode " + $(e).find("div.name").text().replace("EP ", "")
            });
        });
        return data
    } catch (error) {
        return []
    }
}

export const getGOGO = async (id) => {
    try {
        const url = `https://raw.githubusercontent.com/bal-mackup/mal-backup/master/mal/anime/${id}.json`;
        const res = await axios.get(url);
        const gogoanime = res.data.Sites.Gogoanime
        const key = Object.keys(gogoanime)[0];
        const identifier = gogoanime[key].identifier
        return identifier
    } catch (error) {
        return null
    }
}

export const getSource = async (id) => {
    let response
    try {
        const res = (await axios.get(`https://anitaku.so/${id}`, {
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
            }
        })).data
        response = res
    } catch (error) {
        if (error.response) {
            return { message: error.message }
        }
        throw error
    }
    const $$ = load(response);
    const anime_title = $$(".anime_video_body_cate > .anime-info > a").attr("title");
    const anime_id = $$(".anime_video_body_cate > .anime-info > a").attr("href").replace("/category/", "");
    const server = $$("#load_anime > div > div > iframe").attr("src");
    const video_url = new URL(server);

    const res = await axios.get(video_url.href, {
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36"
        }
    });

    const $ = load(res.data);
    const iframes = [];
    $("#list-server-more > ul > li").each((index, element) => {
        const video_url = $(element).attr("data-video");
        iframes.push({
            name: $(element).text(),
            iframe: video_url
        });
    });


    if (!iframes.some(item => item.name.includes("Vidstreaming"))) {
        return {
            info: {
                id: anime_id,
                title: anime_title,
                episode: anime_id.split("-episode-")[1]
            },
            sources: null,
            tracks: "",
            iframe: iframes
        }
    }

    const encrypted = await axios.get(`${video_url.protocol}//${video_url.hostname}/encrypt-ajax.php?${await encrypt($, video_url.searchParams.get("id") ?? "")}`,
        {
            headers: {
                "X-Requested-With": "XMLHttpRequest"
            }
        }
    )

    const decrypted = await decrypt(encrypted.data.data);
    if (!decrypted.source)
        throw new Error("No source found. Try a different server.");

    let sources = [];
    decrypted.source.forEach((source) => {
        sources.push({
            file: source.file,
            source: "Default"
        });
    });

    decrypted.source_bk.forEach((source) => {
        sources.push({
            file: source.file,
            source: "Backup"
        });
    });

    return {
        info: {
            id: anime_id,
            title: anime_title,
            episode: id.split("-episode-")[1] ? "Episode " + id.split("-episode-")[1] : "Episode 0"
        },
        sources: sources,
        tracks: decrypted?.track.tracks,
        iframe: iframes.slice(1)
    }
}

const key = {
    primary: crypto.enc.Utf8.parse("37911490979715163134003223491201"),
    secondary: crypto.enc.Utf8.parse("54674138327930866480207815084989"),
    iv: crypto.enc.Utf8.parse("3134003223491201")
}

export const encode = (source) => {
    return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(source));
}

const encrypt = async ($, id) => {
    const encrypted = crypto.AES.encrypt(id, key.primary, { iv: key.iv });
    const scripted = $("script[data-name='episode']").data().value
    const token = crypto.AES.decrypt(scripted, key.primary, { iv: key.iv }).toString(crypto.enc.Utf8);

    return `id=${encrypted}&alias=${id}&${token}`
}

const decrypt = async (encrypted) => {
    const data = crypto.enc.Utf8.stringify(crypto.AES.decrypt(encrypted, key.secondary, { iv: key.iv }));
    return JSON.parse(data);
}
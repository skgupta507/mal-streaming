<div align="center">
<img src="https://files.catbox.moe/m9chz4.png" alt="image" width="150"/>

### <samp>MAL Streaming API</samp>
<samp>A free anime streaming restful API serving anime from [MyAnimeList](https://myanimelist.net) & using [Gogoanime](https://anitaku.so) as a provider</samp>
</div>

## Installation
### Local
Run the following command to clone the repository, and install the dependencies:

```sh
git clone https://github.com/sckoorp/mal-streaming.git
cd mal-streaming
npm install #or pnpm install
```

Start the server with the following command:

```sh
npm start #or pnpm start
```
Now the server is running on http://localhost:3000

### Deploy to Vercel
To deploy on vercel, simply click the button below to fork and deploy your own instance of the api

[![Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sckoorp/mal-streaming)

## Routes
Below you'll find examples using [Axios](https://axios-http.com) but you can use any other http library out there.

### Get Top Airing Anime

| Query | Description                 | Required |
| ----- | --------------------------- | -------- |
| page  | by default page is set to 1 | No       |

`Request`
```ts
const data = (await axios.get("https://malstream.vercel.app/api/airing")).data
console.log(data);
```

`Output`
```ts
{
    "pagination": {
        "total": number,
        "current": number,
        "next": boolean
    },
    "data": [
        {
            "id": number,
            "url": string,
            "title": string,
            "cover": string,
            "type": string,
            "synopsis": string,
            "status": string,
            "score": number,
            "season": string,
            "year": number,
            "genres": [string],
            "episodes": number,
            "source": string,
            "trailer": string
        }
    ]
}
```

### Get Most Popular Anime

| Query | Description                 | Required |
| ----- | --------------------------- | -------- |
| page  | by default page is set to 1 | No       |

`Request`
```ts
const data = (await axios.get("https://malstream.vercel.app/api/popular")).data
console.log(data);
```

`Output`
```ts
{
    "pagination": {
        "total": number,
        "current": number,
        "next": boolean
    },
    "data": [
        {
            "id": number,
            "url": string,
            "title": string,
            "cover": string,
            "type": string,
            "synopsis": string,
            "status": string,
            "score": number,
            "season": string,
            "year": number,
            "genres": [string],
            "episodes": number,
            "source": string,
            "trailer": string
        }
    ]
}
```

### Get Most Favorited Anime

| Query | Description                 | Required |
| ----- | --------------------------- | -------- |
| page  | by default page is set to 1 | No       |

`Request`
```ts
const data = (await axios.get("https://malstream.vercel.app/api/favorite")).data
console.log(data);
```

`Output`
```ts
{
    "pagination": {
        "total": number,
        "current": number,
        "next": boolean
    },
    "data": [
        {
            "id": number,
            "url": string,
            "title": string,
            "cover": string,
            "type": string,
            "synopsis": string,
            "status": string,
            "score": number,
            "season": string,
            "year": number,
            "genres": [string],
            "episodes": number,
            "source": string,
            "trailer": string
        }
    ]
}
```

### Get Upcoming Anime

| Query | Description                 | Required |
| ----- | --------------------------- | -------- |
| page  | by default page is set to 1 | No       |

`Request`
```ts
const data = (await axios.get("https://malstream.vercel.app/api/upcoming")).data
console.log(data);
```

`Output`
```ts
{
    "pagination": {
        "total": number,
        "current": number,
        "next": boolean
    },
    "data": [
        {
            "id": number,
            "url": string,
            "title": string,
            "cover": string,
            "type": string,
            "synopsis": string,
            "status": string,
            "score": number,
            "season": string,
            "year": number,
            "genres": [string],
            "episodes": number,
            "source": string,
            "trailer": string
        }
    ]
}
```

### Get Anime Info

| Parameters | Description         | Required |
| ---------- | ------------------- | -------- |
| id         | anime mal id        | Yes      |

`Request`
```ts
const data = (await axios.get("https://malstream.vercel.app/api/info/21")).data
console.log(data);
```

`Output`
```ts
{
    "id": number,
    "url": string,
    "title": string,
    "cover": string,
    "type": string,
    "synopsis": string,
    "status": string,
    "score": number,
    "season": string,
    "year": number,
    "genres": [string],
    "episode": number,
    "source": string,
    "studios": string,
    "producers": [string],
    "trailer": string,
    "episodes": [{id: string, episode: string}]
}
```

### Get Stream Episode

| Parameters | Description             | Required |
| ---------- | ----------------------- | -------- |
| id         | episode id of the anime | Yes      |

`Request`
```ts
const data = (await axios.get("https://malstream.vercel.app/api/stream/one-piece-episode-1100")).data
console.log(data);
```

`Output`
```ts
{
    "id": string,
    "title": string,
    "episode": string,
    "sources": { // M3u8 file source
        "default": string,
        "backup": string
    },
    "iframes": {
        "plyr": string,
        "nspl": string
    }
}
```

## License
This project is licensed under [GPL-3.0](LICENSE) License
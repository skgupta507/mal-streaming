import API from "./src/index.js";

const port = 3000

API.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
import API from "./src/index.js";
import { config } from "dotenv"; config();

const port = 3000

API.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
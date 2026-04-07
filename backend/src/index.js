import express from "express";
import { PORT } from "./config.js";
import router from "./routers/router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}))

app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
});

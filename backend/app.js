import bodyParser from "body-parser";
import express from "express";

import placesRoutes from "./routes/places.js";
import errorRoutes from "./routes/error.js";

import setCorsHeaders from "./middleware/corsMiddleware.js";

const HOSTNAME = process.env.HOST;
const PORT = process.env.PORT;

const app = express();

app.use(express.static("images"));
app.use(bodyParser.json());

app.use(setCorsHeaders);

app.use(placesRoutes);
app.use(errorRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening at http://${HOSTNAME}:${PORT}`);
}).on("error", (error) => {
    if (error.code === "EADDRINUSE") {
        console.error(`Port ${PORT} is already in use!`);
    } else {
        throw new Error(`Fatal error: ${error}`);
    }
});

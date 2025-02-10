import express from "express";
import mongoose from "mongoose";
import config from "./config/config.js";
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { RedisStore } from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const redisClient = createClient({
    socket: {
        host: config.REDIS_URL,
        port: config.REDIS_PORT,
    },
});
redisClient.connect().catch(console.error);

redisClient.on("error", (err) => console.error("Redis error:", err));

app.use(cors({

}));

app.use(
    session({
        store: new RedisStore({
            client: redisClient,
        }),
        secret: config.SESSION_SECRET,
        resave: false,
        saveUninitialized: true, // ✅ Исправили
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 30000,
        },
    })
);

const connectWithRetry = () => {
    mongoose
        .connect(
            `mongodb://${config.MONGO_USER}:${config.MONGO_PASSWORD}@${config.MONGO_IP}:${config.MONGO_PORT}/?authSource=admin`,
        )
        .then(() => console.log("Successfully connected to db"))
        .catch(() => {
            console.error("ERROR OCCURRED, retrying...");
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

app.use("/api/v1/posts/", postRoutes);
app.use("/api/v1/users/", userRoutes);

app.get("/api/v1/", (req, res) => {
    console.log("it works")

    res.status(200).json({
        message: "req sent"
    })
});

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
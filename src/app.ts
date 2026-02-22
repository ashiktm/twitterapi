import express from "express";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiReference } from "@scalar/express-api-reference";
import { readFileSync, existsSync } from 'fs';
import { passportAuth } from "./middleware/jwt-middleware.js";

// Routes
import userRoutes from "./modules/user/user.routes.js";
import tweetRoutes from "./modules/tweet/tweet.routes.js";
import likeRoutes from "./modules/like/like.routes.js";
import commentRoutes from "./modules/comment/comment.routes.js";

const app = express();

let swaggerDocument: any;
try {
    const fileUrl = new URL('../swagger-output.json', import.meta.url);
    swaggerDocument = JSON.parse(readFileSync(fileUrl, 'utf-8'));
} catch (e) {
    console.log("Swagger file not found initially. Run 'npm run swagger' to generate it.");
    swaggerDocument = {};
}

app.use('/api-docs', apiReference({ spec: { content: swaggerDocument } } as any));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept,Authorization,Set-Cookie,Keep-Alive"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

// Register Feature Modules
app.use("/api", userRoutes);
app.use("/api", tweetRoutes);
app.use("/api", likeRoutes);
app.use("/api", commentRoutes);

export default app;

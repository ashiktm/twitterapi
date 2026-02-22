import express from "express";

import connect from "./config/database-config.js";
import Hashtag from "./modules/hashtag/hashtag.model.js";
import Tweet from "./modules/tweet/tweet.model.js";
import router from "./routes/index.js";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import { apiReference } from "@scalar/express-api-reference";
import { readFileSync } from 'fs';

// Load swagger file synchronously
const swaggerDocument = JSON.parse(readFileSync(new URL('../swagger-output.json', import.meta.url), 'utf-8'));

import { passportAuth } from "./middleware/jwt-middleware.js";
const app = express();
app.use('/api-docs', apiReference({ spec: { content: swaggerDocument } }));

app.use(cookieParser());
// app.use(cors());
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

app.use("/api", router);

app.listen(3000, async () => {
  console.log("server started at 3000");
  // mongodb connection
  connect();
  console.log("db connected");
  //   const data = await Hashtag.create({
  //     text: "travel",
  //     tweets: ["64a93573e499d55a40775259"],
  //   });
  //   console.log(data);
});

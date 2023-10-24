import express from "express";

import connect from "./config/database-config.js";
import Hashtag from "./models/hastag.js";
import Tweet from "./models/tweet.js";
import router from "./routes/index.js";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";

import { passportAuth } from "./middleware/jwt-middleware.js";
const app = express();
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

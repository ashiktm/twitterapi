import { Request, Response } from "express";
import { LikeSerivce } from "../like/like.service.js";
import { ToggleLikeBody } from "./like.schema.js";

const likeSerivce = new LikeSerivce();

export const toggleLike = async (req: Request<{}, {}, ToggleLikeBody>, res: Response) => {
  try {
    let data: ToggleLikeBody = req.body;
    const userId = req.user?._id?.toString();
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    console.log(data);
    const response = await likeSerivce.toggleLike({ ...data, user: userId });
    return res.status(200).json({
      success: true,
      message: "data created successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};

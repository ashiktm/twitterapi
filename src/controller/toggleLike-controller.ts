import { Request, Response } from "express";
import { LikeSerivce } from "../service/like-service.js";

const likeSerivce = new LikeSerivce();

export const toggleLike = async (req: Request, res: Response) => {
  try {
    let data = req.body;
    data.user = req.user?._id;
    if (!data.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    console.log(data);
    const response = await likeSerivce.toggleLike(data);
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

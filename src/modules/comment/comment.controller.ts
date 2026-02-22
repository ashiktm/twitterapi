import { Request, Response } from "express";
import CommentService from "../comment/comment.service.js";
import { CreateCommentBody } from "./comment.schema.js";

const commentService = new CommentService();

export const createComment = async (req: Request<{}, {}, CreateCommentBody>, res: Response) => {
  try {
    let data: CreateCommentBody = req.body;
    const userId = req.user?._id?.toString();
    const username = req.user?.username;
    if (!userId) return res.status(401).json({ success: false, message: "Unauthorized" });
    console.log(data);
    const response = await commentService.create({ ...data, user: userId, username: username! });
    return res.status(200).json({
      success: true,
      message: "data created successfully",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};
export const getComment = async (req: Request, res: Response) => {
  try {
    console.log(req.params);
    const data = req.params.id as string;
    const response = await commentService.getComment(data);
    return res.status(200).json({
      success: true,
      message: "data fetched",
      data: response,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "something went wrong",
      data: {},
      err: error,
    });
  }
};

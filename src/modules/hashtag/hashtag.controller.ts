import { Request, Response } from "express";
import { hashtagService } from "./hashtag.service.js";

export const getAllHashtags = async (req: Request, res: Response) => {
    try {
        const hashtags = await hashtagService.getAllHashtags();
        return res.status(200).json({
            success: true,
            message: "Successfully fetched all hashtags",
            data: hashtags,
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: {},
            err: error,
        });
    }
};

export const searchHashtag = async (req: Request, res: Response) => {
    try {
        let name = req.params.name as string;
        if (name.startsWith("#")) {
            name = name.substring(1);
        }
        const hashtags = await hashtagService.searchHashtagByName(name);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched hashtags",
            data: hashtags,
            err: {},
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            data: {},
            err: error,
        });
    }
};

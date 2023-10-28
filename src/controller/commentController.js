import CommentService from "../service/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req, res) => {
  try {
    let data = req.body;
    data.user = req.user._id;
    data.username = req.user.username;
    console.log(data);
    const response = await commentService.create(data);
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
export const getComment = async (req, res) => {
  try {
    console.log(req.params);
    const data = req.params.id;
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

import UserService from "../service/user-service.js";

const userService = new UserService();

export const createUser = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);
    const response = await userService.signup(data);
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
export const loginUser = async (req, res) => {
  try {
    const data = req.body;

    console.log(data);
    const response = await userService.login(data);
    // res.cookie("token", response, {

    //   path:'/',
    //   httpOnly: true,
    //   secure: true, // Set to true for HTTPS environments
    //   sameSite: "strict", // Adjust according to your requirements
    //   maxAge: 3600000, // Token expiration time in milliseconds (1 hour in this case)
    // });
    return res.status(200).json({
      success: true,
      message: "login successfully",
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

import UserRepository from "../repository/userRepository.js";

export default class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    try {
      const user = await this.userRepository.create(data);

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async login(data) {
    try {
      const user = await this.userRepository.findby({ email: data.email });
      console.log("user", user);
      if (!user) {
        throw {
          message: "no  user found",
        };
      }
      const auth = user.comparePassword(data.password);
      if (!auth) {
        throw {
          message: "Incorrect password",
        };
      }
      const token = user.genJWT();

      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

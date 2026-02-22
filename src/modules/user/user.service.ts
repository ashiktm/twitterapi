import UserRepository from "../user/user.repository.js";
import { UserSignupBody, UserLoginBody, UpdateProfileBody } from "./user.schema.js";

export default class UserService {
  userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data: UserSignupBody) {
    try {
      const user = await this.userRepository.create(data);

      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  async login(data: UserLoginBody) {
    try {
      const user = await this.userRepository.findby({ email: data.email });
      console.log("user", user);
      if (!user) {
        throw new Error("no user found");
      }
      const auth = user.comparePassword(data.password);
      if (!auth) {
        throw new Error("Incorrect password");
      }
      const token = user.genJWT();

      return token;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProfile(userId: string, data: Partial<UpdateProfileBody>) {
    try {
      const user = await this.userRepository.update(userId, data);
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProfile(userId: string) {
    try {
      const user = await this.userRepository.get(userId);
      if (!user) {
        throw new Error("no user found");
      }
      return user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

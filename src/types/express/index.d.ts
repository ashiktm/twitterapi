import { IUser } from "../../models/user.js";

declare global {
    namespace Express {
        interface User extends IUser { }
        interface Request {
            user?: User;
        }
    }
}

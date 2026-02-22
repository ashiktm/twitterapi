import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import User from "../modules/user/user.model.js";
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "twitter_secret",
};
export const passportAuth = (passport) => {
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id);
        if (!user) {
            done(null, false);
        }
        else {
            done(null, user);
        }
    }));
};

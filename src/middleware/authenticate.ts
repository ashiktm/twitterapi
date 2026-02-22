import passport from "passport";

export const authenticate = (req: any, res: any, next: any) => {
  passport.authenticate("jwt", (err: any, user: any) => {
    if (err) next(err);
    if (!user) {
      return res.status(401).json({
        messsage: "Unauthorise access ",
      });
    }
    console.log("user", user);
    req.user = user;
    next();
  })(req, res, next);
};

import passport from "passport";
import { Request, Response, NextFunction } from "express";

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", (err: Error, user: any) => {
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

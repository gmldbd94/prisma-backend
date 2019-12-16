import "./env";
import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "../generated/prisma-client";

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const verifyUser = async (payload, done) => {
  // console.log(payload);
  try{
    const user = await prisma.user({ id: payload.id });
    if(user !== null){
      return done(null, user);
    } else{
      return done(null, false);
      //아니면 user계정을 만들어주는 코드를 넣어줘도 된다.
    }
  }catch(error){
    return done(error, false);
  }
};
//미들웨어 함수 
export const authenticateJwt = (req, res, next) =>
  passport.authenticate("jwt", { sessions: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);

passport.use(new Strategy(jwtOptions, verifyUser))
passport.initialize();

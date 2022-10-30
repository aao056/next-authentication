import nextConnect from "next-connect";
import passport from "passport";

import auth from "@/utils/middlewares/authMiddleware";

const handler = nextConnect();

handler.use(auth).get(
  passport.authenticate("github", {
    failureRedirect: "/sign-in",
    successRedirect: "/secret-page",
  })
);

export default handler;

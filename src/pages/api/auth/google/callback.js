import nextConnect from "next-connect";
import passport from "passport";

import auth from "@/utils/middlewares/authMiddleware";

const handler = nextConnect();

handler.use(auth).get(
  passport.authenticate("google", {
    successRedirect: "/secret-page",
  })
);

export default handler;

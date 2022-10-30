import passport from "passport";
import nextConnect from "next-connect";

import auth from "@/utils/middlewares/authMiddleware";

const handler = nextConnect();

handler.use(auth).get(
  passport.authenticate("facebook", {
    successRedirect: "/secret-page",
  })
);

export default handler;

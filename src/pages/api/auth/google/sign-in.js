import nextConnect from "next-connect";

import passport from "@/utils/passport/passport-google";
import auth from "@/utils/middlewares/authMiddleware";

const handler = nextConnect();

handler.use(auth).get((req, res) => {
  return passport(req).authenticate(
    "google",
    {
      scope: ["email"],
    },
    () => {}
  )(req, res);
});

export default handler;

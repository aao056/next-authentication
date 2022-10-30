import nextConnect from "next-connect";

import passport from "@/utils/passport/passport-github";
import auth from "@/utils/middlewares/authMiddleware";

const handler = nextConnect();

handler.use(auth).get((req, res) => {
  return passport(req).authenticate("github", {}, () => {})(req, res);
});

export default handler;

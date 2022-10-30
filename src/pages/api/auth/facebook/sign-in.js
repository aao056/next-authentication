import nextConnect from "next-connect";

import passport from "@/utils/passport/passport-facebook";
import auth from "@/utils/middlewares/authMiddleware";

const handler = nextConnect();

handler.use(auth).get((req, res) => {
  return passport(req).authenticate("facebook", {}, () => {})(req, res);
});

export default handler;

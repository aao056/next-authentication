import nextConnect from "next-connect";
import getAbsolutePath from "@/utils/getAbsolutePath";
import passport from "@/utils/passport/passport-local";

import auth from "@/utils/middlewares/authMiddleware";

const handler = nextConnect();

handler.use(auth).post(passport.authenticate("local"), async (req, res) => {
  try {
    const link = getAbsolutePath(req, "");

    let redirect_to = link + "/secret-page";

    res.json({
      success: true,
      redirect_to,
    });
  } catch (err) {
    res.json({ success: false });
  }
});

export default handler;

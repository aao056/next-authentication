import connectSessionKnex from "connect-session-knex";
import nextConnect from "next-connect";
import session from "express-session";
import passport from "passport";

import knex from "@/utils/knex";

const KnexSessionStore = connectSessionKnex(session);

const store = new KnexSessionStore({
  knex,
  tablename: "sessions",
});

const handler = nextConnect();

export default handler
  .use(
    session({
      resave: true,
      saveUninitialized: true,
      secret: process.env.TOKEN_SECRET,
      cookie: {
        httpOnly: true,
        maxAge: process.env.EXPIRES_IN * 1000,
        secure: false,
      },
      store,
    })
  )
  .use(passport.initialize())
  .use(passport.session());

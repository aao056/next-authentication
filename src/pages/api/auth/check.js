import knex from "@/utils/knex";

export default async function handler(req, res) {
  const token = req.query["token"];

  try {
    const session = await knex("sessions").select("*").where("sid", token);
    // console.log("session", session[0].sess.passport.user);
    let isAuthenticated = session.length > 0;
    res.json({
      authenticated: isAuthenticated,
      user: session[0].sess.passport.user,
    });
  } catch (err) {
    res.json({ authenticated: false });
  }
}

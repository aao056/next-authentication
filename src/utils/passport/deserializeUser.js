import findUserById from "@/utils/user/findUserId";

export default async function deserializeUser(req, user, done) {
  const dbUser = await findUserById(user.user_id);

  if (!dbUser) return done("not_found", null);

  return done(null, user.user_id);
}

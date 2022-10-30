import knex from "@/utils/knex";
import bcrypt from "bcrypt";
import emailAlreadyExists from "@/utils/user/emailAlreadyExists";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

export default async function handler(req, res) {
  if (!validateEmail(req.body.email) || !validatePassword(req.body.password)) {
    return res.json({ success: false });
  }
  const exists = await emailAlreadyExists(req.body.email);

  if (exists)
    return res.json({
      success: false,
      message: "This email already exists. Try a different one",
    });
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await knex("user").insert({
      email: req.body.email,
      password: hashedPassword,
    });

    res.json({ success: true });
  } catch (err) {
    res.json({ success: false });
  }
}

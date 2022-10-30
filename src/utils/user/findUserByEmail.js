import knex from "../knex";

export default async function findUserByEmail(email) {
  return await knex.select("*").from("user").where("email", email).first();
}

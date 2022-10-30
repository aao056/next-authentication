import knex from "../knex";

export default async function findUserById(id) {
  return await knex("user").select("*").where("user_id", id).first();
}

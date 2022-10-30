import knex from "../knex";

export default async function findUserBySocialId(id) {
  return await knex("user").select("*").where("social_id", id).first();
}

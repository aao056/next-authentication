import knex from '../knex'

export default async function emailAlreadyExists(email) {
  const result = await knex.select('*').from('user').where('email', email)

  return result.length > 0
}

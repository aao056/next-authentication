import knex from '@/utils/knex'

export default async function getUser(userId) {
    try {
        return await knex('user')
            .where('user_id', userId)
            .first()
    } catch(err) {
        console.log(err)
        return null
    }
}
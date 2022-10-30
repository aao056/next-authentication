import GithubStrategy from 'passport-github'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import passport from "passport"

import findUserBySocialId from '@/utils/user/findUserBySocialId'
import deserializeUser from "@/utils/passport/deserializeUser"
import serializeUser from "@/utils/passport/serializeUser"
import getAbsolutePath from "@/utils/getAbsolutePath"
import knex from '@/utils/knex'

export default function handle(req) {

    passport.serializeUser(serializeUser)
    passport.deserializeUser(deserializeUser)

    passport.use( new GithubStrategy(
        {
            clientID: process.env.PASSPORT_GITHUB_CLIENT_ID,
            clientSecret: process.env.PASSPORT_GITHUB_CLIENT_SECRET,
            callbackURL: getAbsolutePath(req, '/api/auth/github/callback'),
        },
        async (accessToken, refreshToken, profile, done) => {
            const email_uuid = uuidv4()
            try {
                const user = await findUserBySocialId(profile.id)

                if (!user) {
                    let password = accessToken + process.env.TOKEN_SECRET

                    let hashedPassword = await bcrypt.hash(password, 10)

                    await knex('user').insert({
                        email: email_uuid,
                        password: hashedPassword,
                        social_id: profile.id,
                    })

                    const createdUser = await findUserBySocialId(profile.id)

                    done(null, createdUser)
                } else {
                    done(null, user)
                }
            } catch (err) {
                done(err, false, { message: 'Internal server error' })
            }
        })
    )

    return passport

}
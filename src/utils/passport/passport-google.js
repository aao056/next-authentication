import { Strategy } from 'passport-google-oauth20'
import passport from "passport"
import bcrypt from "bcrypt"

import getAbsolutePath from "@/utils/getAbsolutePath"
import findUserByEmail from '@/utils/user/findUserByEmail'
import deserializeUser from "@/utils/passport/deserializeUser"
import serializeUser from "@/utils/passport/serializeUser"
import knex from '@/utils/knex'

export default function handle(req) {

    passport.serializeUser(serializeUser)

    passport.deserializeUser(deserializeUser)

    passport.use(new Strategy(
        {
            clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
            clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
            callbackURL: getAbsolutePath(req, '/api/auth/google/callback'),
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await findUserByEmail(profile._json.email)

                if (!user) {
                    let password = accessToken + process.env.TOKEN_SECRET

                    let hashedPassword = await bcrypt.hash(password, 10)

                    await knex('user').insert({
                        email: profile._json.email,
                        password: hashedPassword,
                    })

                    const createdUser = await findUserByEmail(profile._json.email)

                    done(null, createdUser)
                } else {
                    done(null, user)
                }
            } catch (err) {
                console.log(err)
                done(err, false, { message: 'Internal server error' })
            }
        })
    )

    return passport

}
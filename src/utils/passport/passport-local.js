import bcrypt from 'bcrypt'
import passport from 'passport'
import LocalStrategy from 'passport-local'

import deserializeUser from "@/utils/passport/deserializeUser"
import serializeUser from "@/utils/passport/serializeUser"
import knex from '@/utils/knex'

passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)

passport.use(
    new LocalStrategy(
        {usernameField: 'email'},
        async (email, password, done) => {
            try {
                const user = await knex
                    .select('*')
                    .from('user')
                    .where('email', email)
                    .first()

                if (!user) return done(null, false, {message: 'Wrong credentials'})

                if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                }
                return done(null, false, {message: 'Wrong credentials'})
            } catch (err) {
                done(err)
            }
        }
    )
)

export default passport

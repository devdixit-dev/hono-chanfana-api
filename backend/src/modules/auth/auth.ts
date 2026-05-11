import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { database } from '../../db';

export const auth = betterAuth({
  database: drizzleAdapter(database, {
    provider: "pg"
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24
  },

  trustedOrigins: [
    "*"
  ],

  secret: 
})
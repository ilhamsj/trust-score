import { createAuthClient } from 'better-auth/react'
import { env } from '@/shared/utils/env'

export const authClient = createAuthClient({
  baseURL: env.APP_URL,
})

export const { signIn, signOut, signUp, useSession } = authClient

export async function signInWithGoogle() {
  await signIn.social({
    provider: 'google',
    callbackURL: '/admin/account',
  })
}

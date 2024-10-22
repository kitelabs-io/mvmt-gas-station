import NextAuth from "next-auth"

import "next-auth/jwt"
import { authConfig } from "./auth.config"

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)

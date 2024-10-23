import type { NextAuthConfig } from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"

declare module "next-auth" {
	interface Session {
		userId?: string
		accessToken?: string
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		accessToken?: string
		userId?: string
	}
}

export const authConfig = {
	providers: [
	 GitHub, Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    })],
	session: { strategy: "jwt" },
	callbacks: {
		async jwt({ token, user, account }) {
			// Initial sign in
			if (account && user) {
				return {
					...token,
					// To persist userId across sessions, we hash the provider + providerAccountId
					// to achieve a unique identifier
					userId: `${account.provider}.${account.providerAccountId}`,
					accessToken: account.access_token,
				}
			}

			// Return previous token if the access token has not expired yet
			return token
		},
		async session({ session, token }) {
			session.userId = token.userId!
			session.accessToken = token.accessToken
			return session
		},
	},
	trustHost: true,
} satisfies NextAuthConfig

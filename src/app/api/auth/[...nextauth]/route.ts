import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"

// This is for the /app folder config
export const authOptions: NextAuthOptions = {
    // define providers here
    // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
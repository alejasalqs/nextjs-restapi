import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth"
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { sigInEmailPassword } from '@/auth/actions/auth-actions'

// This is for the /app folder config
export const authOptions: NextAuthOptions = {
  // auth.js/prisma adaptar
  adapter: PrismaAdapter(prisma) as Adapter,
  // define providers here
  // Configure one or more authentication providers
  providers: [
    // El orden de como se define aqui, es como va a aparecer en e UI
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const user = await sigInEmailPassword(credentials!.email, credentials!.password)

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  session: {
    // metodo de autenticacion
    strategy: 'jwt'
  },
  callbacks: {
    // funciones que se ejecutan en el ciclo de vida de la autenticacion
    // se ejecuta en el BE, si se retorna false se niega la autenticacion
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async signIn({ user, account, credentials, profile, email }) {
      return true
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async jwt({ token, user, account, profile }) {
      // este se ejecuta primero que la session
      // returna el token
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } })
      token.roles = dbUser?.roles ?? ['no-role']
      token.id = dbUser?.id ?? ['no-uuid']
      return token
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async session({ session, token, user }) {
      // retorna session modificada
      if (session && session.user) {
        session.user.roles = token.roles
        session.user.id = token.id
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
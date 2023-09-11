import bcrypt from 'bcrypt'
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import prisma from '@/lib/prismadb';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
          email: { label: "Email", type: "text", placeholder: "Email"},
          password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {    
        // check to see if email and password exists
        if(!credentials?.email || !credentials?.password) {
          throw new Error('Enter email and password')
        }
    
        // check if user exists
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email
          }
        });
    
        // if no user
        if(!user || !user?.hashedPassword) {
          throw new Error('No user found')
        }

        // check to see if password match
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)
    
        // if passwords dont match
        if (!passwordMatch) {
          throw new Error('Incorrect Password')
      }
    
        return user;
      },
    })
  ],
  pages: {
    signIn: '/',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {

    const dbUser = await prisma.user.findFirst({
        where: {
            email: token.email
        },
        })

      if(dbUser) token.role = dbUser.role
      return token
    },
    session({ session, token }) {
      session.user.role = token.role
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST}
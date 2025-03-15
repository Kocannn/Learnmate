import NextAuth, { NextAuthOptions, SessionStrategy } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<any> {
        if (!credentials) {
          throw new Error("Credentials not provided.");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("Email atau password salah.");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );
        if (!isValid) {
          throw new Error("Email atau password salah.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user) {
        const userProfile = await prisma.user.findUnique({
          where: { email: session.user.email! },
          select: { hasCompletedOnboarding: true },
        });

        session.user.hasCompletedOnboarding =
          userProfile?.hasCompletedOnboarding || false;
      }
      return session;
    },
    async jwt({ token, user }) {
      // Get onboarding status from database when creating the token
      const userProfile = await prisma.user.findUnique({
        where: { email: token.email },
        select: { hasCompletedOnboarding: true },
      });

      token.user = {
        ...((token.user as object) || {}),
        hasCompletedOnboarding: userProfile?.hasCompletedOnboarding || false,
      };

      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 24 * 60 * 60, // 24 hours
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

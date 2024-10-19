import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

export const authOptions = {
  adapter: PrismaAdapter(prisma), // Type assertion removed for JS
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email,
          name: token.name,
          image: token.picture,
        };
      }
      return session;
    },
  },
};

export async function getSession(req, res) {
  return await getServerSession(req, res, authOptions);
}

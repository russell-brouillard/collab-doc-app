import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Define the shape of your user
export interface User {
  id: string;
  email: string;
  name?: string;
}

export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // IMPORTANT: Replace this with your actual authentication logic
        // This is a placeholder - you should verify credentials against your database
        if (
          credentials.email === "user@example.com" &&
          credentials.password === "password123"
        ) {
          return {
            id: "1",
            email: credentials.email as string,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

// frontend/app/lib/auth.ts

import Auth0Provider from "next-auth/providers/auth0";
import { NextAuthOptions } from "next-auth";

// Define the shape of your user (optional)
export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

console.log(process.env.AUTH0_CLIENT_ID);
console.log(process.env.AUTH0_CLIENT_SECRET);
console.log(process.env.AUTH0_ISSUER);
console.log(process.env.NEXTAUTH_SECRET);

export const authConfig: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER!, // Must be an absolute URL
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // Ensure this is set
};

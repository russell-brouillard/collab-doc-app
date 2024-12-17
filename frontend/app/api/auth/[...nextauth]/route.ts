import NextAuth from "next-auth";

import { authConfig } from "../../../lib/auth"; // Adjust the import if necessary

const handler = NextAuth(authConfig);

export { handler as GET, handler as POST };

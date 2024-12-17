import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authConfig } from "./auth";

export async function protectedRoute() {
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/login");
  }

  return session.user;
}

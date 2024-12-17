"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/login"); // Redirect if not authenticated
  }, [session, status, router]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="p-8">
      <h1>Dashboard</h1>
      <h4>Welcome, {session?.user?.name}!</h4>
    </div>
  );
}

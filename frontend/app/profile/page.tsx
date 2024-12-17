// app/profile/page.tsx

"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Card, Input } from "@nextui-org/react";

export default function ProfilePage() {
  const { user } = useUser();

  console.log(user);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar
            alt={user.firstName || "User"}
            size="xl"
            src={user.profileImageUrl}
          />
          <div>
            <h2 className="text-xl font-bold">{user.fullName}</h2>
            <p className="text-gray-500">
              {user.emailAddresses[0]?.emailAddress}
            </p>
          </div>
        </div>

        <form className="space-y-4">
          <Input
            fullWidth
            defaultValue={user.firstName || ""}
            label="First Name"
            type="text"
          />

          <Input
            fullWidth
            defaultValue={user.lastName || ""}
            label="Last Name"
            type="text"
          />

          <Input
            fullWidth
            defaultValue={user.emailAddresses[0]?.emailAddress || ""}
            label="Email Address"
            type="email"
          />

          <Button type="submit" color="primary" className="w-full">
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
}

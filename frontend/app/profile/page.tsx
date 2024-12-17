// app/profile/page.tsx

"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, Button, Card, Input } from "@nextui-org/react";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const { user } = useUser();
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    emailAddress: "",
    imageUrl: "",
  });

  useEffect(() => {
    if (user) {
      const fetchedData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        emailAddress: user.emailAddresses[0]?.emailAddress || "",
        imageUrl: user.imageUrl || "",
      };

      setProfileData(fetchedData);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        alert("Profile updated successfully");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Card className="w-full max-w-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <Avatar
            src={profileData.imageUrl}
            alt={profileData.firstName || "User"}
            size="xl"
          />
          <div>
            <h2 className="text-xl font-bold">
              {profileData.firstName} {profileData.lastName}
            </h2>
            <p className="text-gray-500">{profileData.emailAddress}</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            fullWidth
            label="First Name"
            type="text"
            value={profileData.firstName}
            onChange={(e) =>
              setProfileData({ ...profileData, firstName: e.target.value })
            }
          />

          <Input
            fullWidth
            label="Last Name"
            type="text"
            value={profileData.lastName}
            onChange={(e) =>
              setProfileData({ ...profileData, lastName: e.target.value })
            }
          />

          <Input
            fullWidth
            label="Email Address"
            type="email"
            value={profileData.emailAddress}
            onChange={(e) =>
              setProfileData({ ...profileData, emailAddress: e.target.value })
            }
          />

          <Button className="w-full" color="primary" type="submit">
            Update Profile
          </Button>
        </form>
      </Card>
    </div>
  );
}

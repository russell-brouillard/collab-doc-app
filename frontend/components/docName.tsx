import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Avatar,
  Chip,
  Button,
  Input,
} from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";

const API_URL = "http://localhost:3001";

type Email = {
  emailAddress: string;
  primary: boolean;
  verified: boolean;
};

type User = {
  id: number;
  firstName: string;
  lastName: string;
  imageUrl: string;
  emailAddresses: Email[];
};

interface DocNameProps {
  name: string;
  id: string;
}

export default function DocName({ name, id }: DocNameProps) {
  const { getToken } = useAuth();
  const [docName, setDocName] = useState(name);

  useEffect(() => {
    setDocName(name);
  }, [name]);

  const handleSaveDocName = async () => {
    try {
      const token = await getToken();

      // Ensure valid ID is used here
      const res = await fetch(`${API_URL}/documents/${id}/docName`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ docName }),
      });

      if (!res.ok) {
        console.error(
          `Failed to save document name: ${res.status} ${res.statusText}`
        );
      } else {
        console.log("Document name updated successfully");
      }
    } catch (error) {
      console.error("Error saving document name:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Input
        label="Name"
        value={docName}
        onChange={(e) => setDocName((e.target as HTMLInputElement).value)}
      />
      <Button
        color="primary"
        isDisabled={!docName}
        variant="ghost"
        onPress={handleSaveDocName}
      >
        Save
      </Button>
    </div>
  );
}

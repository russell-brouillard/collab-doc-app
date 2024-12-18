import React, { useEffect, useState } from "react";
import {
  Select,
  SelectItem,
  Avatar,
  Chip,
  SelectedItems,
} from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";

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

const API_URL = "http://localhost:3001";

export default function UserDropDown() {
  const { getToken } = useAuth();

  const [users, setUsers] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    fetchDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDocument = async () => {
    setLoading(true);
    setError(null); // Reset error state before fetching
    try {
      const token = await getToken();

      const res = await fetch(`${API_URL}/documents/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure correct headers
        },
      });

      if (res.ok) {
        const data = await res.json();

        console.log("Fetched document:", data.data);
        setUsers(data.data);
      } else {
        const errorMessage = `Failed to fetch document: ${res.status} ${res.statusText}`;
        console.error(errorMessage);
        setError(errorMessage);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      setError("An unexpected error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Select
      classNames={{
        base: "max-w-xs",
        trigger: "min-h-12 py-2",
      }}
      isMultiline={true}
      items={users}
      label="Add Collaborators"
      labelPlacement="outside"
      placeholder="Select a user"
      renderValue={(items: SelectedItems<User>) => {
        return (
          <div className="flex flex-wrap gap-2">
            {items.map((item) => (
              <Chip
                key={item.key}
              >{`${item?.data?.firstName} ${item?.data?.lastName}`}</Chip>
            ))}
          </div>
        );
      }}
      selectionMode="multiple"
      variant="bordered"
    >
      {(user) => (
        <SelectItem key={user.id} textValue={user.firstName}>
          <div className="flex gap-2 items-center">
            <Avatar
              alt={user.firstName}
              className="flex-shrink-0"
              size="sm"
              src={user.imageUrl}
            />
            <div className="flex flex-col">
              <span className="text-small">{`${user.firstName} ${user.lastName}`}</span>
              <span className="text-tiny text-default-400">
                {user.emailAddresses[0].emailAddress}
              </span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  );
}

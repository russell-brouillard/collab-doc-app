import React, { useEffect, useState } from "react";
import { Select, SelectItem, Avatar, Chip, Button } from "@nextui-org/react";
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

export default function UserDropDown({ id }: { id: string }) {
  const { getToken } = useAuth();

  // State for all available users
  const [users, setUsers] = useState<User[]>([]);

  // State for the currently selected users
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/documents/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Fetched users:", data.data);
        setUsers(data.data);
      } else {
        console.error(`Failed to fetch users: ${res.status} ${res.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSaveSelectedUsers = async () => {
    try {
      const token = await getToken();

      console.log(
        "Saving selected users:",
        selectedUsers.map((u) => u.id)
      );

      const res = await fetch(`${API_URL}/documents/${id}/collaborators`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // Send only the user ids or the entire user objects depending on your API
        body: JSON.stringify({
          collaborators: selectedUsers.map((u) => u.id),
        }),
      });

      if (res.ok) {
        console.log("Collaborators updated successfully");
      } else {
        console.error(
          `Failed to save collaborators: ${res.status} ${res.statusText}`
        );
      }
    } catch (error) {
      console.error("Error saving selected users:", error);
    }
  };

  return (
    <div className="flex items-center gap-4">
      <Button
        color="primary"
        isDisabled={selectedUsers.length === 0}
        variant="ghost"
        onPress={handleSaveSelectedUsers}
      >
        Save
      </Button>
      <Select
        classNames={{
          base: "max-w-lg",
          trigger: "min-h-12 py-2",
        }}
        isMultiline
        items={users}
        label="Add Collaborators"
        labelPlacement="outside"
        placeholder="Select a user"
        // The renderValue callback receives the selected items with both key and data.
        // Here, `items` is of type SelectedItems<User>.
        renderValue={(items) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>
                  {item.data.firstName} {item.data.lastName}
                </Chip>
              ))}
            </div>
          );
        }}
        selectionMode="multiple"
        variant="bordered"
        // When selection changes, we get a set of keys or "all".
        // Map these keys back to user objects:
        onSelectionChange={(selectedKeys) => {
          if (selectedKeys === "all") {
            // If "all" is selected, just set all users
            setSelectedUsers(users);
          } else {
            // selectedKeys is a Set<React.Key>, convert it to an array and map
            const selected = Array.from(selectedKeys).map((key) =>
              users.find((user) => user.id === key)
            );
            // Filter out any undefined values in case no match was found
            setSelectedUsers(selected.filter(Boolean) as User[]);
          }
        }}
      >
        {(user: User) => (
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
                  {user.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </div>
  );
}

"use client";

import { useAuth } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

const columns = [
  {
    key: "firstName",
    label: "FIRST",
  },
  {
    key: "lastName",
    label: "LAST",
  },
  {
    key: "id",
    label: "ID",
  },
];

const API_URL = "http://localhost:3001/documents";

export default function App() {
  const { getToken } = useAuth();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDocument();
  }, []);

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();

        console.log("Fetched document:", data.data);
        setContent(data.data);
      } else {
        console.error("Failed to fetch document:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={content}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

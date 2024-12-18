"use client";

import { useAuth } from "@clerk/nextjs";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner, // Import Spinner for loading state
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

// Adjust the API_URL as needed
const API_URL = "http://localhost:3001";

export default function App() {
  const { getToken } = useAuth();

  const [content, setContent] = useState([]); // Initialize as an empty array
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
        setContent(data.data);
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

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spinner />
        <h1>Loading...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "20px", color: "red" }}>
        <h1>{error}</h1>
      </div>
    );
  }

  if (content.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h1>No data available.</h1>
      </div>
    );
  }

  return (
    <Table aria-label="Example table with dynamic content">
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={content}>
        {(item) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell>{item[columnKey]}</TableCell> // Directly access item properties
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

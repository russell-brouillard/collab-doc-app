"use client";

import React, { use, useEffect, useState } from "react";
import { Textarea, Button, User } from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";
import UserDropDown from "@/components/userDropDown";

const API_URL = "http://localhost:3001/documents";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getToken } = useAuth();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setContent(data.content);
      } else {
        console.error("Failed to fetch document:", res.statusText);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveDocument = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        console.error("Failed to save document:", res.statusText);
      }
    } catch (error) {
      console.error("Error saving document:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Document</h1>
      <UserDropDown />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        rows={10}
        disabled={loading}
      />
      <div className="mt-4 flex space-x-4">
        <Button color="primary" onPress={fetchDocument} disabled={loading}>
          Refresh
        </Button>
        <Button color="success" onPress={saveDocument} disabled={loading}>
          Save
        </Button>
      </div>
    </div>
  );
}

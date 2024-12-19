"use client";

import React, { use, useEffect, useState } from "react";
import { Textarea } from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";

import UserDropDown from "@/components/userDropDown";
import DocName from "@/components/docName";

const API_URL = "http://localhost:3001/documents";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getToken } = useAuth();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [docTitle, setDocTitle] = useState("");

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (content && !loading) {
        saveDocument();
      }
    }, 1000); // Auto-save after 1 second of inactivity

    return () => clearTimeout(timeout);
  }, [content]);

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

        console.log("Document data:", data);
        setContent(data.content);
        setDocTitle(data.title);
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
    <div className="flex flex-col items-center h-full">
      <h1 className="text-2xl font-bold mb-4">Edit Document</h1>
      <div className="flex justify-between w-full mb-4">
        <DocName id={id} name={docTitle} />
        <UserDropDown id={id} />
      </div>

      <div className="h-full w-full">
        <Textarea
          fullWidth
          disabled={loading}
          rows={10}
          value={content || ""}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

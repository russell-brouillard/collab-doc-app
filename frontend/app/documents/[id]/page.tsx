//frontend/app/documents/[...id]/page.tsx

"use client";

import React, { use, useEffect, useState } from "react";
import { Textarea, Button } from "@nextui-org/react";

const API_URL = "http://localhost:3001/documents";

export default function Page({
  params,
  // searchParams,
}: {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { id } = use(params);
  // const { query } = use(searchParams)

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Document ID:", id);

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  const fetchDocument = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${id}`);

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

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Document</h1>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        fullWidth
        rows={10}
        disabled={loading}
      />
      <Button
        className="mt-4"
        color="primary"
        onPress={fetchDocument}
        disabled={loading}
      >
        Refresh
      </Button>
    </div>
  );
}

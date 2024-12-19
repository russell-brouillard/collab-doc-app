"use client";

import React, { use, useEffect, useState, useRef } from "react";
import { Textarea } from "@nextui-org/react";
import { useAuth } from "@clerk/nextjs";
import { io } from "socket.io-client";

import UserDropDown from "@/components/userDropDown";
import DocName from "@/components/docName";

const API_URL = "http://localhost:3001/documents";
const SOCKET_URL = "http://localhost:3001"; // Your Socket.io endpoint

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { getToken } = useAuth();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [docTitle, setDocTitle] = useState("");

  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (id) {
      fetchDocument();
    }
  }, [id]);

  useEffect(() => {
    // Connect to the socket when the component mounts
    // Only do this if we have an id
    if (id) {
      const socket = io(SOCKET_URL, {
        transports: ["websocket"],
      });
      socketRef.current = socket;

      // Join the document room
      socket.emit("joinDocument", { documentId: id });

      // Listen for updates from other users
      socket.on(
        "documentContentUpdated",
        (data: { documentId: string; content: string }) => {
          if (data.documentId === id) {
            // Update content as soon as another client changes it
            setContent(data.content);
          }
        }
      );

      return () => {
        socket.emit("leaveDocument", { documentId: id });
        socket.off("documentContentUpdated");
        socket.disconnect();
      };
    }
  }, [id]);

  // Auto-save after 1 second of inactivity
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (content && !loading) {
        saveDocument();
      }
    }, 1000);

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);

    // Emit the change to other connected clients
    if (socketRef.current) {
      socketRef.current.emit("updateDocumentContent", {
        documentId: id,
        content: newContent,
      });
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <h1 className="text-2xl font-bold mb-4">Edit Document</h1>
      <div className="flex justify-between w-full mb-4">
        <DocName id={id} name={docTitle} />
        <UserDropDown id={id} />
      </div>

      {/* <div className="h-full w-full">
        <Textarea
          fullWidth
          disabled={loading}
          rows={10}
          value={content || ""}
          onChange={handleChange}
          variant="bordered"
          className="h-full"
        />
      </div> */}

      <div className="h-screen w-full">
        <textarea
          value={content || ""}
          className="h-full w-full resize-none"
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

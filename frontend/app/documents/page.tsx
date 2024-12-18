"use client";

import React, { SVGProps, useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  User,
} from "@nextui-org/react";
import { useAuth, useUser } from "@clerk/nextjs";

import { DeleteIcon, EditIcon, EyeIcon, PlusIcon } from "@/components/icons";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const API_URL = "http://localhost:3001/documents";

export default function Documents() {
  const { getToken } = useAuth();
  const { user } = useUser();
  const [documents, setDocuments] = useState<any[]>([]);

  // Fetch documents on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        const res = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setDocuments(data);
          console.log("Fetched documents:", data);
        } else {
          console.error("Failed to fetch documents:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };

    fetchData();
  }, [getToken]);

  // Add new document
  const handleAddDocument = async () => {
    try {
      const token = await getToken();

      console.log("Adding new document...");
      console.log("User:", user);
      const newDocument = {
        title: "New Document",
        content: "Document content goes here.",
        owner: user?.id,
        collaborators: [],
        user: user,
      };

      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newDocument),
      });

      if (res.ok) {
        const addedDoc = await res.json();
        setDocuments((prevDocs) => [...prevDocs, addedDoc]);
        console.log("Document added successfully:", addedDoc);
      } else {
        console.error("Failed to add document:", res.statusText);
      }
    } catch (error) {
      console.error("Error adding document:", error);
    }
  };

  const renderCell = React.useCallback((doc: any, columnKey: React.Key) => {
    const cellValue = doc[columnKey as keyof typeof doc];

    switch (columnKey) {
      case "title":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-sm capitalize">{doc.title}</p>
            <p className="text-bold text-sm capitalize text-default-400">
              Word Doc
            </p>
          </div>
        );

      case "owner":
        return (
          <User
            avatarProps={{ radius: "lg", src: doc.user.imageUrl }}
            description={doc.user.emailAddresses?.[0].emailAddress}
            name={`${doc.user.firstName} ${doc.user.lastName}`}
          >
            {doc.user.emailAddresses?.[0].emailAddress}
          </User>
        );

      case "actions":
        return (
          <div className="flex justify-end gap-2">
            <a href={`/documents/${doc._id}`}>
              <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <EyeIcon />
                </span>
              </Tooltip>
            </a>
            <Tooltip content="Edit">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip color="danger" content="Delete user">
              <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <div className="flex flex-col w-full ">
      {/* Header Row */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">Document Management</h1>
        <Button
          className="flex"
          color="primary"
          endContent={<PlusIcon />}
          onPress={handleAddDocument}
        >
          Add New
        </Button>
      </div>
      <Table aria-label="Document Table">
        <TableHeader
          columns={[
            { name: "TITLE", uid: "title" },
            { name: "OWNER", uid: "owner" },
            { name: "ACTIONS", uid: "actions", align: "end" },
          ]}
        >
          {(column) => (
            <TableColumn key={column.uid} align={column.align || "start"}>
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={documents}>
          {(item) => (
            <TableRow key={item._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

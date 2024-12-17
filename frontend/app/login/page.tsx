//frontend/app/login/page.tsx

"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
} from "@nextui-org/react";

export default function LoginPage() {
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string | string[]>
  >({});

  const handleSubmit = async (formData: FormData) => {
    // Extract form values
    const username = formData.get("username")?.toString().trim() || "";
    const password = formData.get("password")?.toString().trim() || "";

    // Basic client-side validation
    if (!username || !password) {
      const errors: Record<string, string> = {};

      if (!username) errors.username = "Username is required.";
      if (!password) errors.password = "Password is required.";
      setValidationErrors(errors);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Login failed:", errorText);
        // Show a generic error message or parse more specific ones
        setValidationErrors({ password: "Invalid username or password." });
        return;
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Handle success (e.g., redirect, store token)
    } catch (error) {
      console.error("Network error:", error);
      setValidationErrors({
        password: "An unexpected error occurred. Please try again.",
      });
    }
  };

  return (
    <Card className="min-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">Login</div>
      </CardHeader>
      <CardBody className="gap-3">
        <Form
          aria-label="Login Form"
          style={{
            maxWidth: "300px",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          validationBehavior="aria"
          validationErrors={validationErrors}
          onSubmit={handleSubmit}
        >
          <Input
            errorMessage={validationErrors.username}
            isInvalid={!!validationErrors.username}
            label="Username"
            name="username"
            placeholder="Enter your username"
          />

          <Input
            errorMessage={validationErrors.password}
            isInvalid={!!validationErrors.password}
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />

          <Button type="submit">Log In</Button>
        </Form>
      </CardBody>
    </Card>
  );
}

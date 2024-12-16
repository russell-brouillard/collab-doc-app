"use client";

import React, { useState, FormEvent } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Link,
  Checkbox,
} from "@nextui-org/react";

import { MailIcon } from "@/components/icons/MailIcon";
import { LockIcon } from "@/components/icons/LockIcon";

interface LoginFormState {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formState, setFormState] = useState<LoginFormState>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Add your login logic here
      console.log("Login attempt:", formState);
      // Example of potential authentication call
      // const response = await fetch('/api/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formState)
      // });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleInputChange =
    (field: keyof LoginFormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    };

  return (
    <Card className="max-w-md w-full p-4">
      <CardBody>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            value={formState.email}
            onChange={handleInputChange("email")}
            type="email"
            label="Email"
            placeholder="Enter your email"
            startContent={<MailIcon />}
            required
          />
          <Input
            value={formState.password}
            onChange={handleInputChange("password")}
            type="password"
            label="Password"
            placeholder="Enter your password"
            startContent={<LockIcon />}
            required
          />
          <div className="flex justify-between items-center">
            <Checkbox>Remember me</Checkbox>
            <Link href="/forgot-password" size="sm" color="primary">
              Forgot password?
            </Link>
          </div>
          <Button color="primary" type="submit" className="mt-4">
            Sign In
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don't have an account?{" "}
            <Link href="/signup" color="primary">
              Sign Up
            </Link>
          </p>
        </div>
      </CardBody>
    </Card>
  );
}

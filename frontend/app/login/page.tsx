"use client";

import React from "react";
import { Button, Card, CardHeader, CardBody } from "@nextui-org/react";

export default function LoginPage() {
  const handleSignIn = () => {
    console.log("Sign in with Auth0");
  };

  const handleSignUp = () => {
    // Redirect to Auth0's sign-up page by specifying the screen_hint parameter
    console.log("Sign up with Auth0");
  };

  return (
    <div className="flex items-center  ">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex justify-center">
          <h3>Welcome to CollabDocApp</h3>
        </CardHeader>
        <CardBody className="flex flex-col items-center gap-4">
          <Button fullWidth color="primary" size="lg" onPress={handleSignIn}>
            Sign In with Auth0
          </Button>
          <Button fullWidth color="secondary" size="lg" onPress={handleSignUp}>
            Sign Up with Auth0
          </Button>
        </CardBody>
      </Card>
    </div>
  );
}

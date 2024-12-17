//frontend/app/login/page.tsx

"use client";

import {
  Form,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Link,
} from "@nextui-org/react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <Card className="min-w-[400px]">
      <CardHeader className="flex gap-3">
        <div className="flex flex-col">Sign Up</div>
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
          onSubmit={() =>
            signIn("auth0", { callbackUrl: "/", screen_hint: "signup" })
          }
        >
          <Input
            label="Username"
            name="username"
            placeholder="Enter your username"
          />

          <Input
            label="Password"
            name="password"
            placeholder="Enter your password"
            type="password"
          />

          <Button type="submit">Sign Up</Button>
        </Form>
      </CardBody>
      <CardFooter>
        <Link href="/login"> or Sign In</Link>
      </CardFooter>
    </Card>
  );
}

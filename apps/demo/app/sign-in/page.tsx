"use client";
import { Button, Input } from "@/components/components/ui";
import { createAuthClient } from "better-auth/react";
import { authClient } from "lib/auth-client";
import { useState } from "react";

function Page() {
  return <DemoSignup />;
}

export default Page;

function DemoSignup() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Password1234");
  const { data, error, isPending } = authClient.useSession();

  const signIn = async () => {
    const start = Date.now();
    const { data, error } = await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onSuccess: async () => {
          const duration = Date.now() - start;
          alert("SUCCESS! " + duration);
        },
        onError: (ctx) => {
          const duration = Date.now() - start;
          console.log(`Duration: ${duration}`);
          console.error(ctx.error);
        },
      }
    );
    console.log(`DONE!`, data, error);
  };

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="max-w-[300px] flex flex-col w-screen h-screen items-center justify-center gap-3">
        <div className="mb-5 text-center">
          Your session:{" "}
          {error
            ? "error"
            : isPending
              ? "loading..."
              : JSON.stringify(data, null, 2)}
        </div>
        <Input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={signIn}>Sign in</Button>
      </div>
    </div>
  );
}

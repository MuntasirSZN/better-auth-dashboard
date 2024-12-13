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
  const [pfp, setPfp] = useState(
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
  );
  const [name, setName] = useState("Test user");
  const { data, error, isPending } = authClient.useSession();

  const signUp = async () => {
    const start = Date.now();
    localStorage.removeItem("bearer_token");
    const { data, error } = await authClient.signUp.email(
      {
        email,
        password,
        name,
        image: pfp,
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
    // if (!error) {
    //   sendVerificationOTP(data!.user.email);
    // }
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
          type="name"
          value={name}
          placeholder="fullname"
          onChange={(e) => setName(e.target.value)}
        />
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
        <Input
          value={pfp}
          placeholder="User pfp"
          onChange={(e) => setPfp(e.target.value)}
        />
        <Button onClick={signUp}>Sign Up</Button>
      </div>
    </div>
  );
}

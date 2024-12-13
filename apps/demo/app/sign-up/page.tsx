"use client";
import { Button, Input } from "@/components/components/ui";
import { createAuthClient } from "better-auth/react";
import { authClient } from "lib/auth-client";
import { useState } from "react";
import names from "humannames";

function Page() {
  return <DemoSignup />;
}

export default Page;

function DemoSignup() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("Password123");
  const [pfp, setPfp] = useState(
    "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
  );
  const [name, setName] = useState("Test user");
  const { data, error, isPending } = authClient.useSession();

  const signUp = async () => {
    const start = Date.now();
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
  };

  const createRandomAccounts = async (count: number) => {
    const start = Date.now();
    const namesArr = Object.keys(names);
    createAcc(0);
    async function createAcc(index: number) {
      const firstName = namesArr[getRandomInt(namesArr.length - 1)];
      const lastName = namesArr[getRandomInt(namesArr.length - 1)];
      namesArr.splice(namesArr.indexOf(firstName), 1);

      const { data, error } = await authClient.signUp.email(
        {
          email: `${firstName}@example.com`,
          password: "Password123",
          name: firstName + " " + lastName,
          image: pfp,
        },
        {
          onSuccess: async () => {
            const duration = Date.now() - start;
          },
          onError: (ctx) => {
            const duration = Date.now() - start;
            console.log(`Duration: ${duration}`);
            console.error(ctx.error);
          },
        }
      );
      if (error) {
        console.error(error);
        throw alert(`Failed to create user, read console for more info.`);
      }

      console.log(`User ${index} created: ${firstName} ${lastName}`);
      if (count - 1 === index) {
        alert(
          `Successfully created ${count} users in ${Date.now() - start}ms.`
        );
      } else {
        createAcc(index + 1);
      }
    }
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
        <hr />
        <Button onClick={() => createRandomAccounts(10)}>
          Create 10 random accounts
        </Button>
      </div>
    </div>
  );
}
function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

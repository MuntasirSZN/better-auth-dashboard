"use client";
import { useState } from "react";
import type { RequiredComponents } from "../../../types";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";

export function CreateUserDialog({
  components,
}: {
  components: RequiredComponents;
}) {
  const {
    Button,
    Input,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Label,
  } = components;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [extraData, setExtraData] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-[35.99] ml-2" color="primary">
          Create User
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
          <DialogDescription>
            Create a new user here. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
              className="col-span-3"
              placeholder="John Doe"
              autoComplete="off"
              type="text"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              className="col-span-3"
              placeholder="john@example.com"
              autoComplete="off"
              type="email"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input
              id="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              className="col-span-3"
              type="password"
              placeholder="Password123"
              autoComplete="off"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <Input
              value={role}
              onChange={(e) => setRole(e.currentTarget.value.toLowerCase())}
              className="col-span-3"
              placeholder="user"
            />
          </div>
          <div className="grid items-center grid-cols-4 gap-4">
            <Label htmlFor="extraData" className="flex flex-col text-right">
              Extra Data
              <span className="text-sm font-thin text-muted-foreground">
                (optional)
              </span>
            </Label>
            <CodeMirror
              id="extraData"
              value={extraData}
              height="200px"
              theme="dark"
              className="col-span-3 overflow-hidden rounded-md"
              style={{
                zoom: "80%",
              }}
              extensions={[json()]}
              onChange={setExtraData}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

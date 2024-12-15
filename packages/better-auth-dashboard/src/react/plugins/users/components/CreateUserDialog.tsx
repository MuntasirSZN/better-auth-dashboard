"use client";
import { useCallback, useState } from "react";
import type { RequiredComponents } from "../../../types";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import { authClient } from "../UsersComponent";

function getExtraData(jsonStr: string) {
  try {
    if (jsonStr.trim() === "") {
      return { success: true, data: {}, error: null };
    }

    const parsedJson = JSON.parse(jsonStr);
    return { success: true, data: parsedJson, error: null };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return { success: false, data: null, error: "Invalid extra data field." };
  }
}

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
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } = components;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [extraData, setExtraData] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [error, setError] = useState("");

  const createUser = useCallback(async () => {
    const extraDataResult = getExtraData(extraData);
    if (!extraDataResult.success) {
      setError(extraDataResult.error as string);
      setAlertOpen(true);
      return;
    }

    const { data, error } = await authClient.admin.createUser({
      name: name,
      email: email,
      password: password,
      role: role,
      data: extraDataResult.data,
    });

    if (error) {
      setError(error.statusText);
      setAlertOpen(true);
      return;
    }

    console.log(`User created: `, data);
  }, [extraData, name, email, password, role]);

  return (
    <>
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {error.trim().length === 0 ? "Success!" : "An error occured"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {error.trim().length === 0
                ? "You've successfully created a new user!"
                : error}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ------------------------- */}

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
            <Button type="submit" onClick={createUser}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

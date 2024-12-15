"use client";
import { toast } from "sonner";
import { useCallback, useState } from "react";
import type { RequiredComponents } from "../../../types";
import { authClient } from "../UsersComponent";
import { CircleX } from "lucide-react";

function getExtraData(jsonStr: string) {
  try {
    if (jsonStr.trim() === "") {
      return { success: true, data: {}, error: null };
    }

    const parsedJson = JSON.parse(jsonStr);
    return { success: true, data: parsedJson, error: null };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return {
      success: false,
      data: null,
      error: "Invalid JSON format in extra data field.",
    };
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
    Textarea,
  } = components;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");
  const [extraData, setExtraData] = useState("{}");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const createUser = useCallback(async () => {
    setIsLoading(true);
    const extraDataResult = getExtraData(extraData);
    if (!extraDataResult.success) {
      setError(extraDataResult.error as string);
      setIsLoading(false);
      toast.error("Error creating user: " + extraDataResult.error as string);
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
      const err = error.message || error.statusText;
      setError(err);
      setIsLoading(false);
      toast.error("Error creating user: " + err);
      return;
    }

    console.log(`User created: `, data);
    setError("");
    setName("");
    setEmail("");
    setExtraData("");
    setPassword("");
    setIsLoading(false);
    toast.success("User successfully created");
  }, [extraData, name, email, password, role]);

  return (
    <>
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
            {error.trim().length === 0 ? null : (
              <div className="flex items-center gap-2 px-3 py-4 mb-3 text-sm border rounded-md text-destructive bg-destructive/10 border-destructive">
                <CircleX size={20} />
                {error}
              </div>
            )}
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
              <Textarea
                id="extraData"
                value={extraData}
                onChange={(e) => setExtraData(e.currentTarget.value)}
                className="col-span-3"
                placeholder={'{\n  "someField": true\n}'}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={createUser} disabled={isLoading}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

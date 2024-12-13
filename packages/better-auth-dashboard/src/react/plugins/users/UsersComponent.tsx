import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import {
  memo,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import type { RequiredComponents } from "../../types";
import type { User } from "better-auth";

const authClient = createAuthClient({
  plugins: [adminClient()],
});

export const UsersComponent = memo(
  ({ components }: { components: RequiredComponents }) => {
    const { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } =
      components;
    const [open, setOpen] = useState(false);
    const selectedUser = useRef<User | null>(null);

    return (
      <div className="flex justify-center w-full h-full sm:pt-[100px]">
        <div className="sm:min-w-[800px] max-w-[800px] w-full h-full overflow-hidden p-5">
          <Sheet open={open} onOpenChange={setOpen}>
            <UsersNavigation components={components} />
            <UsersTable
              components={components}
              selectedUser={selectedUser}
              setOpen={setOpen}
            />
            <SheetContent className="min-w-[300px] md:min-w-[800px]">
              <SheetHeader className="relative">
                <UserPFP
                  image={selectedUser.current?.image}
                  size="lg"
                  className="absolute inset-0"
                />
                <SheetTitle className="ml-20">
                  {selectedUser.current?.name}
                </SheetTitle>
                <SheetDescription className="ml-20 !mt-0">
                  {selectedUser.current?.email}
                </SheetDescription>
              </SheetHeader>
              <div className="w-[500px] my-5">
                <pre>{JSON.stringify(selectedUser.current, null, 2)}</pre>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
);

function UsersNavigation({ components }: { components: RequiredComponents }) {
  const {
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Label,
    DialogFooter,
  } = components;
  return (
    <div className="flex flex-col w-full gap-2 mb-5 sm:flex-row">
      <Dialog>
        <Input placeholder="Search for users" className="sm:w-[500px]" />
        <Select>
          <SelectTrigger className="min-w-[190px] w-[190px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email" className="text-left">
              Sort by: email
            </SelectItem>
            <SelectItem value="name">Sort by: name</SelectItem>
            <SelectItem value="updatedAt">Sort by: updated-at</SelectItem>
            <SelectItem value="createdAt">Sort by: created-at</SelectItem>
          </SelectContent>
        </Select>
        <div className="sm:hidden">
          <DialogTrigger asChild>
            <Button>Create user</Button>
          </DialogTrigger>
        </div>
        <div className="items-center justify-end hidden w-full gap-2 sm:flex">
          <DialogTrigger asChild>
            <Button>Create user</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function UsersTable({
  components,
  setOpen,
  selectedUser,
}: {
  components: RequiredComponents;
  selectedUser: MutableRefObject<User | null>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } =
    components;

  const [users, setusers] = useState<User[]>([]);
  const [pagination, setPagination] = useState(0);

  useEffect(() => {
    authClient.admin
      .listUsers({
        query: {
          limit: 50,
          offset: pagination,
        },
      })
      .then((result) => {
        if (result.data) {
          setusers(result.data.users);
        } else {
          console.error(`Failed to fetch list of users:`, result.error);
          throw `${result.error.status} ${result.error.code}: ${result.error.statusText}. ${result.error.message}`;
        }
      });
  }, [pagination]);

  return (
    <div className="overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead className="text-right">Name</TableHead>
            <TableHead className="hidden text-right md:table-cell">
              Updated at
            </TableHead>
            <TableHead className="hidden text-right md:table-cell">
              Joined at
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              className="cursor-pointer"
              onClick={() => {
                selectedUser.current = user;
                setOpen(true);
              }}
            >
              <TableCell className="flex items-center gap-2">
                <UserPFP image={user.image} />
                {user.email}
              </TableCell>
              <TableCell className="text-right">{user.name}</TableCell>
              <TableCell className="hidden text-right md:table-cell">
                {user.updatedAt.toDateString()}
              </TableCell>
              <TableCell className="hidden text-right md:table-cell">
                {user.createdAt.toDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function UserPFP({
  image,
  size = "sm",
  className,
}: {
  image: string | null | undefined;
  size?: "sm" | "lg";
  className?: string;
}) {
  return image ? (
    <img
      src={image}
      width={size === "sm" ? 32 : 64}
      height={size === "sm" ? 32 : 64}
      className={"rounded-full" + (className ? ` ${className}` : "")}
    />
  ) : null;
}

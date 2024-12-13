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
    const {
      Input,
      Sheet,
      SheetContent,
      SheetDescription,
      SheetHeader,
      SheetTitle,
    } = components;
    const [open, setOpen] = useState(false);
    const sheetTitle = useRef<string>("");
    const sheetDescription = useRef<string>("");
    const sheetBody = useRef<string>("");

    return (
      <div className="flex justify-center w-full h-full pt-[100px]">
        <div className="md:min-w-[800px] h-full overflow-hidden p-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <UsersNavigation Input={Input} />
            <UsersTable
              components={components}
              sheetDescription={sheetDescription}
              sheetTitle={sheetTitle}
              setOpen={setOpen}
              sheetBody={sheetBody}
            />
            <SheetContent>
              <SheetHeader>
                <SheetTitle>{sheetTitle.current}</SheetTitle>
                <SheetDescription>{sheetDescription.current}</SheetDescription>
              </SheetHeader>
              <div className="w-[500px] my-5">
                <pre>{sheetBody.current}</pre>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
);

function UsersNavigation({ Input }: { Input: RequiredComponents["Input"] }) {
  return (
    <div className="flex w-full gap-2 mb-5">
      <Input placeholder="Search for users" />
    </div>
  );
}

function UsersTable({
  components,
  setOpen,
  sheetDescription,
  sheetTitle,
  sheetBody,
}: {
  components: RequiredComponents;
  sheetTitle: MutableRefObject<string>;
  sheetDescription: MutableRefObject<string>;
  sheetBody: MutableRefObject<string>;
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
                sheetTitle.current = `${user.name}`;
                sheetDescription.current = `${user.email}`;
                sheetBody.current = JSON.stringify(user, null, 2);
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

function UserPFP({ image }: { image: string | null | undefined }) {
  return image ? (
    <img src={image} width={32} height={32} className="rounded-full" />
  ) : null;
}

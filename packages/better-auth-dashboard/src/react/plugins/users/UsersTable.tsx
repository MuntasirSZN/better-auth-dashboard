"use client";
import {
  useEffect,
  useState,
  type Dispatch,
  type MutableRefObject,
  type SetStateAction,
} from "react";
import type { RequiredComponents } from "../../types";
import type { User } from "better-auth";
import { UserPFP } from "./UserPFP";
import type { AuthClient } from "./UsersComponent";

export function UsersTable({
  components,
  setOpen,
  selectedUser,
  pagination,
  limit,
  authClient,
}: {
  components: RequiredComponents;
  selectedUser: MutableRefObject<User | null>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pagination: number;
  limit: number;
  authClient: AuthClient;
}) {
  const {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } = components;

  const [users, setusers] = useState<User[]>([]);

  useEffect(() => {
    console.log(`Getting users with pag: ${pagination}`);
    authClient.admin
      .listUsers({
        query: {
          limit: limit,
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
    <Table>
      <TableCaption>
        Page {pagination / limit + 1} ({users.length} / {limit})
      </TableCaption>
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
  );
}

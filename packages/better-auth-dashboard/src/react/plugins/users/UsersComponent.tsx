"use client";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { memo, useEffect, useRef, useState } from "react";
import type { RequiredComponents } from "../../types";
// import type { User } from "better-auth";
// import { PaginationUI } from "./PaginationUI";
// import { UsersNavigation } from "./UsersNavigation";
// import { UsersTable } from "./UsersTable";
import { UserView } from "./UserView";
import { DataTable } from "./UsersTable/data-table";
// import tasks from "./data/tasks.json";
import { columns } from "./UsersTable/columns";

const authClient = createAuthClient({
  plugins: [adminClient()],
});

export type User = typeof authClient.$Infer.Session["user"]

export type AuthClient = typeof authClient;

export const UsersComponent = memo(
  ({ components }: { components: RequiredComponents }) => {
    const { Sheet, SheetContent } = components;
    const [open, setOpen] = useState(false);
    const selectedUser = useRef<User | null>(null);
    const [pagination, setPagination] = useState(0);
    const [limit, setLimit] = useState(10);
    const [sortBy, setSortBy] = useState<
      "email" | "name" | "updated-at" | "created-at"
    >("email");
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
      <div className="flex items-center justify-center w-full h-full overflow-y-auto">
        <div className="max-w-[1000px] w-full p-5 ">
          <Sheet open={open} onOpenChange={setOpen}>
            <div className=""></div>
            {/* <UsersNavigation
              components={components}
              setSortBy={setSortBy}
              sortBy={sortBy}
              setLimit={setLimit}
            /> */}
            {/* <UsersTable
              components={components}
              selectedUser={selectedUser}
              setOpen={setOpen}
              pagination={pagination}
              limit={limit}
              authClient={authClient}
            /> */}
            <DataTable data={users} columns={columns} components={components} />
            {/* <PaginationUI
              components={components}
              setPagination={setPagination}
              pagination={pagination}
              limit={limit}
            /> */}
            <SheetContent className="min-w-[300px] md:min-w-[800px]">
              <UserView components={components} selectedUser={selectedUser} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
);

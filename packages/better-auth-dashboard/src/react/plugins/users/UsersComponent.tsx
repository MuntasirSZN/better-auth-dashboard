"use client";
import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { memo, useRef, useState } from "react";
import type { RequiredComponents } from "../../types";
import { UserView } from "./UserView";
import { DataTable } from "./UsersTable/data-table";
import { columns } from "./UsersTable/columns";

const authClient = createAuthClient({
  plugins: [adminClient()],
});

export type User = (typeof authClient.$Infer.Session)["user"];
export type AuthClient = typeof authClient;

export const UsersComponent = memo(
  ({ components }: { components: RequiredComponents }) => {
    const { Sheet, SheetContent } = components;
    const [open, setOpen] = useState(false);
    const selectedUser = useRef<User | null>(null);
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // Track if more users can be loaded

    // Function to fetch users
    const fetchUsers = async (pageIndex: number, pageSize: number) => {
      setIsLoading(true);
      try {
        const result = await authClient.admin.listUsers({
          query: {
            limit: pageSize,
            offset: pageIndex * pageSize,
          },
        });

        if (result.data) {
          // If we received fewer users than requested, we've reached the end
          if (result.data.users.length < pageSize) {
            setHasMore(false);
          }
          
          if (pageIndex === 0) {
            // First page - replace existing users
            setUsers(result.data.users);
          } else {
            // Subsequent pages - append to existing users
            setUsers(prevUsers => [...prevUsers, ...result.data.users]);
          }
        } else {
          console.error(`Failed to fetch list of users:`, result.error);
          throw `${result.error.status} ${result.error.code}: ${result.error.statusText}. ${result.error.message}`;
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="flex items-center justify-center w-full h-full overflow-y-auto">
        <div className="max-w-[1000px] w-full p-5 ">
          <Sheet open={open} onOpenChange={setOpen}>
            <DataTable 
              data={users}
              columns={columns}
              components={components}
              onPaginationChange={fetchUsers}
              isLoading={isLoading}
              hasMore={hasMore}
            />
            <SheetContent className="min-w-[300px] md:min-w-[800px]">
              <UserView components={components} selectedUser={selectedUser} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    );
  }
);
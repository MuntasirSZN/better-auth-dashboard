import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";
import { memo, useRef, useState } from "react";
import type { RequiredComponents } from "../../types";
import type { User } from "better-auth";
import { PaginationUI } from "./PaginationUI";
import { UsersNavigation } from "./UsersNavigation";
import { UsersTable } from "./UsersTable";
import { UserView } from "./UserView";

const authClient = createAuthClient({
  plugins: [adminClient()],
});

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

    return (
      <div className="flex justify-center w-full h-full overflow-y-auto">
        <div className="max-w-[800px] w-full h-full p-5 ">
          <Sheet open={open} onOpenChange={setOpen}>
            <UsersNavigation
              components={components}
              setSortBy={setSortBy}
              sortBy={sortBy}
              setLimit={setLimit}
            />
            <UsersTable
              components={components}
              selectedUser={selectedUser}
              setOpen={setOpen}
              pagination={pagination}
              limit={limit}
              authClient={authClient}
            />
            <PaginationUI
              components={components}
              setPagination={setPagination}
              pagination={pagination}
              limit={limit}
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

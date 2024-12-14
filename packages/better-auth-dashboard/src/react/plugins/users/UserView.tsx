import type { User } from "better-auth";
import type { RequiredComponents } from "../../types";
import { UserPFP } from "./UserPFP";
import type { MutableRefObject } from "react";

export function UserView({
  components,
  selectedUser,
}: {
  components: RequiredComponents;
  selectedUser: MutableRefObject<User | null>;
}) {
  const { SheetHeader, SheetTitle, SheetDescription } = components;
  return (
    <>
      <SheetHeader className="relative">
        <UserPFP
          image={selectedUser.current?.image}
          size="lg"
          className={{
            wrapper: "absolute inset-0",
          }}
          components={components}
          name={selectedUser.current?.name}
        />
        <SheetTitle className="ml-20">{selectedUser.current?.name}</SheetTitle>
        <SheetDescription className="ml-20 !mt-0">
          {selectedUser.current?.email}
        </SheetDescription>
      </SheetHeader>
      <div className="w-[500px] my-5">
        <pre>{JSON.stringify(selectedUser.current, null, 2)}</pre>
      </div>
    </>
  );
}

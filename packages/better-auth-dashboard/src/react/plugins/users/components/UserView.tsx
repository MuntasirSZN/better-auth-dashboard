import type { User } from "better-auth";
import type { RequiredComponents } from "../../../types";
import { UserPFP } from "./UserPFP";
import { useState, type MutableRefObject } from "react";

export function UserView({
  components,
  selectedUser,
}: {
  components: RequiredComponents;
  selectedUser: MutableRefObject<User | null>;
}) {
  const {
    SheetHeader,
    SheetTitle,
    SheetDescription,
    Table,
    TableBody,
    // TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
  } = components;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tableContent, setTableContent] = useState(selectedUser.current ?? {});

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
        <Table>
          <TableCaption>Hello world</TableCaption>
          <TableHeader>
            <TableRow>
              {Object.keys(tableContent).map((key, i) => {
                return <TableHead key={i}>{key}</TableHead>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {Object.values(tableContent).map((vals, i) => {
              <TableRow key={i}>
                <TableCell className="flex items-center gap-2">
                  <UserPFP
                    image={user.image}
                    name={user.name}
                    components={components}
                  />
                  {user.email}
                </TableCell>
                <TableCell className="text-right">{user.name}</TableCell>
                <TableCell className="hidden text-right md:table-cell">
                  {user.updatedAt.toDateString()}
                </TableCell>
                <TableCell className="hidden text-right md:table-cell">
                  {user.createdAt.toDateString()}
                </TableCell>
              </TableRow>;
            })} */}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

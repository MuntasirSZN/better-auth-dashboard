import type { User } from "better-auth";
import type { RequiredComponents } from "../../../types";
import { UserPFP } from "./UserPFP";
import { useState, type MutableRefObject } from "react";

function formatDateAndTime(date: Date) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  }).format(date);
}

export function UserView({
  components,
  selectedUser,
}: {
  components: RequiredComponents;
  selectedUser: MutableRefObject<User | null>;
}) {
  const { SheetHeader, SheetTitle, SheetDescription } = components;

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
      <div className="my-10">
        <DataTable data={selectedUser.current} />
      </div>
    </>
  );
}

function DataTable({ data }: { data: Record<string, unknown> | null }) {
  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md border-border">
      {data === null
        ? null
        : Object.entries(data).map(([key, value], index) => {
            let valueJsx: JSX.Element | string | null = JSON.stringify(value);

            if (value === null) {
              valueJsx = "null";
            } else if (value instanceof Date) {
              valueJsx = formatDateAndTime(value);
            } else if (Array.isArray(value)) {
              valueJsx = JSON.stringify(value);
            } else if (typeof value === "object") {
              valueJsx = JSON.stringify(value);
            } else if (typeof value === "boolean") {
              valueJsx = value.toString();
            } else if (typeof value === "string") {
              valueJsx = value;
            }

            return (
              <div key={index} className="flex flex-col gap-2 ">
                <div className="flex items-center justify-center w-full gap-5">
                  <div className="text-left w-fit text-muted-foreground">
                    {key}
                  </div>
                  <div className="w-full font-mono text-[.8rem] text-right truncate">
                    {valueJsx}
                  </div>
                </div>
                {index !== Object.entries(data!).length - 1 ? (
                  <div className="w-full border-b border-border"></div>
                ) : null}
              </div>
            );
          })}
    </div>
  );
}

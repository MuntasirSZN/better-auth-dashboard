import type { RequiredComponents } from "../../../types";
import { UserPFP } from "./UserPFP";
import { useEffect, useState, type MutableRefObject } from "react";
import { Copy } from "lucide-react";
import { authClient, type User, type Session } from "../UsersComponent";

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

  const [sessions, setSessions] = useState<Session[] | null>(null);

  useEffect(() => {
    (async () => {
      if (selectedUser.current === null) return;
      const sessions = await authClient.admin.listUserSessions({
        userId: selectedUser.current.id,
      });
      if (sessions.data) {
        setSessions(sessions.data.sessions);
      } else {
        console.log(
          `Failed to fetch sessions for user: ${selectedUser.current?.name}`
        );
      }
    })();
    return () => {};
  }, []);

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
        <h2 className="my-3 ml-2 text-lg">
          User Details
        </h2>
        <DataTable data={selectedUser.current} components={components} />
        <h2 className="my-3 ml-2 text-lg">
          Session Details
        </h2>
        {sessions
          ? sessions.map((session, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <h3 className="my-3 ml-2 text-md">
                    Session {index + 1}
                  </h3>
                  <DataTable components={components} data={session} />
                </div>
              );
            })
          : null}
      </div>
    </>
  );
}

function DataTable({
  data,
  components,
}: {
  data: Record<string, unknown> | null;
  components: RequiredComponents;
}) {
  const { Button } = components;

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      return true; // Indicate success
    } catch (err) {
      console.error("Failed to copy text: ", err);
      return false; // Indicate failure
    }
  }

  return (
    <div className="flex flex-col gap-2 p-4 border rounded-md border-border">
      {data === null
        ? null
        : Object.entries(data).map(([key, value], index) => {
            let valueJsx: string = JSON.stringify(value);

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
                    <span>{valueJsx}</span>
                  </div>
                  <div className="w-fit">
                    <Button
                      className="bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground size-[12px]"
                      onClick={() => {
                        copyToClipboard(valueJsx).then((success) => {
                          if (success) {
                            console.log("Text copied to clipboard!");
                          } else {
                            console.log("Failed to copy text.");
                          }
                        });
                      }}
                    >
                      <Copy />
                    </Button>
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

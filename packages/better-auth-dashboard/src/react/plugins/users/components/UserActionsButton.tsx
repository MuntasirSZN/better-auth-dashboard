import type { RequiredComponents } from "../../../types";

export function UserActionsButton({
  components,
  rowSelection,
}: {
  components: RequiredComponents;
  rowSelection: object;
}) {
  const {
    Button,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
  } = components;

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="h-[35.99] ml-2"
          color="accent"
          onClick={() => {
            console.log(`Hello!`);
          }}
        >
          Perform Actions
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>{selectedCount} user{selectedCount > 1 ? "s" : ""} selected</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          Ban User{selectedCount > 1 ? "s" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem>
          Unban User
          {selectedCount > 1 ? "s" : ""}
        </DropdownMenuItem>
        <DropdownMenuItem>
          Remove User
          {selectedCount > 1 ? "s" : ""}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

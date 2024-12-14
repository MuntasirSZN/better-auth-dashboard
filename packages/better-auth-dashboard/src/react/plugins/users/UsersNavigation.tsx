import type { Dispatch, SetStateAction } from "react";
import type { RequiredComponents } from "../../types";

export function UsersNavigation({
  components,
  setSortBy,
  sortBy,
}: {
  components: RequiredComponents;
  sortBy: "email" | "name" | "created-at" | "updated-at";
  setSortBy: Dispatch<
    SetStateAction<"email" | "name" | "created-at" | "updated-at">
  >;
  setLimit: Dispatch<SetStateAction<number>>;
}) {
  const {
    Input,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    Label,
    DialogFooter,
  } = components;
  return (
    <div className="sticky top-0 py-5 z-10 flex flex-col w-full gap-2 mb-5 sm:flex-row bg-background sm:mt-[20px]">
      <Dialog>
        <Input placeholder="Search for users" className="lg:w-[500px]" />
        <Select
          value={sortBy}
          onValueChange={(
            val: "email" | "name" | "updated-at" | "created-at"
          ) => setSortBy(val)}
        >
          <SelectTrigger className="min-w-[190px] w-[190px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="email" className="text-left">
              Sort by: email
            </SelectItem>
            <SelectItem value="name">Sort by: name</SelectItem>
            <SelectItem value="updated-at">Sort by: updated-at</SelectItem>
            <SelectItem value="created-at">Sort by: created-at</SelectItem>
          </SelectContent>
        </Select>
        <div className="sm:hidden">
          <DialogTrigger asChild>
            <Button>Create user</Button>
          </DialogTrigger>
        </div>
        <div className="items-center justify-end hidden w-full gap-2 sm:flex">
          <DialogTrigger asChild>
            <Button>Create user</Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid items-center grid-cols-4 gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

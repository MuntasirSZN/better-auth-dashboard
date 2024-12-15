import type { RequiredComponents } from "../../../types";

export function UserActionsButton({
  components,
}: {
  components: RequiredComponents;
}) {
  const { Button } = components;
  return (
    <>
      <Button className="h-[35.99] ml-2" color="primary">
        Perform Actions
      </Button>
    </>
  );
}

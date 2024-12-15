import type { Dispatch, SetStateAction } from "react";
import type { RequiredComponents } from "../../../types";

export function PaginationUI({
  components,
  setPagination,
  pagination,
  limit,
}: {
  components: RequiredComponents;
  setPagination: Dispatch<SetStateAction<number>>;
  pagination: number;
  limit: number;
}) {
  const { Button } = components;
  return (
    <div className="w-full mt-10 h-[100px] flex">
      <Button
        // @ts-expect-error - intentional
        variant="outline"
        disabled={pagination === 0 ? true : false}
        onClick={() => {
          if (pagination === 0) return;
          setPagination((x) => x - limit);
        }}
      >
        Previous
      </Button>
      <div className="flex items-start justify-end w-full">
        <Button
          // @ts-expect-error - intentional
          variant="outline"
          onClick={() => {
            setPagination((x) => x + limit);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

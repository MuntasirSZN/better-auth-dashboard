import type { LucideProps } from "lucide-react";
import type {
  ForwardRefExoticComponent,
  MemoExoticComponent,
  RefAttributes,
} from "react";
import type { RequiredComponents } from "./components";

export type Plugin = {
  title: string;
  slug: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  // subItems: {
  //   title: string;
  //   slug: string;
  //   icon: ForwardRefExoticComponent<
  //     Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  //   >;
  //   component: () => ReactNode;
  // }[];
  component: MemoExoticComponent<
    ({ components }: { components: RequiredComponents }) => JSX.Element
  >;
};

import type { LucideProps } from "lucide-react";
import type {
  ForwardRefExoticComponent,
  ReactNode,
  RefAttributes,
} from "react";

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
  component: () => ReactNode;
};

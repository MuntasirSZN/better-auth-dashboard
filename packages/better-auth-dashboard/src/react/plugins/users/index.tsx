import { Users as UsersIcon } from "lucide-react";
import { useDashboard } from "../../components";
import { useEffect, useRef } from "react";

export const Users = () => {
  const dashbaord = useDashboard();
  const ranOnce = useRef(false);

  useEffect(() => {
    if(ranOnce.current === true) return;
    ranOnce.current = true;
    dashbaord.initPlugin({
      icon: UsersIcon,
      title: "Users",
      slug: "users",
    });
  }, []);

  const component = <div>Hello from users plugin!</div>;

  return component;
};

import type { RequiredComponents } from "../../../types";

export function UserPFP({
  components,
  image,
  size = "sm",
  name,
  className,
}: {
  components: RequiredComponents;
  image: string | null | undefined;
  name: string | null | undefined;
  size?: "sm" | "lg";
  className?: {
    image?: string;
    wrapper?: string;
  };
}) {
  const { Avatar, AvatarFallback, AvatarImage } = components;
  return image && name ? (
    <Avatar
      className={className?.wrapper}
      style={{
        width: size === "sm" ? 25 : 64,
        height: size === "sm" ? 25 : 64,
      }}
    >
      <AvatarImage
        width={size === "sm" ? 25 : 64}
        height={size === "sm" ? 25 : 64}
        src={image}
        className={className?.image}
      />
      <AvatarFallback>{name}</AvatarFallback>
    </Avatar>
  ) : null;
}

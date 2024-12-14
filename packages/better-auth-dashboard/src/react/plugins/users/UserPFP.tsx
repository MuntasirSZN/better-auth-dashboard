export function UserPFP({
  image,
  size = "sm",
  className,
}: {
  image: string | null | undefined;
  size?: "sm" | "lg";
  className?: string;
}) {
  return image ? (
    <img
      src={image}
      width={size === "sm" ? 32 : 64}
      height={size === "sm" ? 32 : 64}
      className={"rounded-full" + (className ? ` ${className}` : "")}
    />
  ) : null;
}

"use client";
import { authClient } from "../lib/auth-client";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  return <div>{isPending ? "Loading" : JSON.stringify(data, null, 4)}</div>;
}

import { cookies } from "next/headers";
import DeleteClient from "./ui";
import { verifySessionToken } from "@/lib/auth";

export default async function Page() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const session = token ? await verifySessionToken(token) : null;
  return <DeleteClient initialAuthed={!!session} />;
}

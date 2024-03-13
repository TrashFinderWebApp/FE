import Link from "next/link";

export default async function Home() {
  return (
    <div className="flex flex-row">
      <Link href="/">HOME</Link>
      <Link href="/location">MAP</Link>
      <Link href="/login">LOGIN</Link>
    </div>
  );
}

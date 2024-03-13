import Link from "next/link";

export default function Home(): JSX.Element {
  return (
    <div className="flex flex-col">
      <Link href="/">HOME</Link>
      <Link href="/location">MAP</Link>
      <Link href="/login">LOGIN</Link>
    </div>
  );
}

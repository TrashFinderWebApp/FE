import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Link href="/">HOME</Link>
      <Link href="/location">MAP</Link>
      <Link href="/login">LOGIN</Link>
    </div>
  );
}

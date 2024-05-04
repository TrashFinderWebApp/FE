"use client";

import { SessionProvider, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

function DetectLoginCookie() {
  const session = useSession();

  useEffect(() => {
    if (session.data?.error) {
      signOut();
    }
  }, [session]);

  return null;
}

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <DetectLoginCookie />
      {children}
    </SessionProvider>
  );
}

'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}


// What is SessionProvider?
// It is a React Context Provider that:
// -> Fetches session info from /api/auth/session
// -> Stores it in React context
// -> Makes it available to all children


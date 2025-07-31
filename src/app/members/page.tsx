'use client';

import withAuth from '@/components/withAuth';

function MembersPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Members</h1>
      <p>This is a protected page.</p>
    </main>
  );
}

export default withAuth(MembersPage);

'use client';

export default function AccountClient({
  username,
}: {
  username: string | undefined;
}) {
  return (
    <div className="font-semibold text-lg text-purple-600">
      <h1>Welcome, {username}</h1>
    </div>
  );
}

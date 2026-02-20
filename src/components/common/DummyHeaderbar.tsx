// export function DummyHeaderBar() {
//   return <header className="h-16 w-full bg-gray-200" />;
// }

export function DummyHeaderBar() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-neutral-300 px-6">
      <h1 className="text-lg font-semibold text-neutral-900">Title</h1>
      <div className="flex items-center gap-4">
        <span>User Profile</span>
      </div>
    </header>
  );
}

// export function DummySideBar() {
//   return <aside className="h-screen w-70 bg-gray-300" />;
// }

export function DummySideBar() {
  return (
    <aside className="text-neutral-0 bg-primary-900 flex w-64 shrink-0 flex-col">
      {/* aside 태그에 필요 시 h-full 추가 */}
      <div className="border-b border-neutral-700 p-4 text-xl font-bold">Admin Logo</div>
      <nav className="flex-1 p-4">
        {/* 메뉴 아이템들 */}
        <ul className="space-y-2">
          <li className="rounded p-2 hover:bg-neutral-700">Dashboard</li>
          <li className="rounded p-2 hover:bg-neutral-700">Users</li>
        </ul>
      </nav>
    </aside>
  );
}

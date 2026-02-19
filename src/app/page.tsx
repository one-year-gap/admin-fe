import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="ml-[280px] flex flex-1 flex-col">
        <Header pageName="고객 통합 관리" userName="관리자 님" />
        <main className="flex h-full w-full overflow-hidden bg-neutral-200"></main>
      </div>
    </div>
  );
}

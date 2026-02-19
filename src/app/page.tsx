import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");

  // 배포 테스트용
  const handleTestRequest = async () => {
    setLoading(true);
    setResult("");

    try {
      const response = await fetch(TEST_API_URL, {
        method: "GET",
      });

      const text = await response.text();

      setResult(`status: ${response.status}\n${text || "(empty response body)"}`);
    } catch (error) {
      setResult(`request failed: ${error instanceof Error ? error.message : "unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

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

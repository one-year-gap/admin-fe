type TopPlan = {
  name: string;
  users: number;
  percent: number;
};

type Props = {
  title: string;
  topPlans: TopPlan[];
  totalUsers: number;
};

export default function PersonaHoverCard({ title, topPlans, totalUsers }: Props) {
  return (
    <div
      className="absolute z-50 w-65 rounded-md border border-gray-200 bg-white p-4 text-sm"
      style={{
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}>
      <p className="mb-1 font-semibold text-gray-800">{title}</p>

      <p className="mb-3 text-xs text-gray-400">데이터 절약 유저의 요금제 Top 3</p>

      <div className="space-y-2">
        {topPlans.map((plan, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-blue-600" />
              <span className="text-gray-700">{plan.name}</span>
            </div>

            <div className="flex gap-1">
              <span className="text-gray-700">{plan.users.toLocaleString()}명</span>
              <span className="text-blue-600">({plan.percent}%)</span>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-gray-200" />

      <div className="flex justify-between">
        <span className="text-gray-600">총 사용자수</span>
        <span className="font-semibold text-gray-800">{totalUsers.toLocaleString()}명</span>
      </div>
    </div>
  );
}

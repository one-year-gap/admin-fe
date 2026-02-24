type TopPlan = {
  name: string;
  users: number;
  percent: number;
};

type Props = {
  title: string;
  topPlans: TopPlan[];
  totalUsers: number;
  position: { x: number; y: number };
};

export default function PersonaHoverCard({ title, topPlans, totalUsers, position }: Props) {
  return (
    <div
      className="pointer-events-none absolute z-50 w-64 rounded-md border border-neutral-200 bg-white p-4 text-sm shadow-lg"
      style={{
        top: position.y,
        left: position.x,
      }}>
      <p className="mb-1 font-semibold text-neutral-800">{title}</p>

      <p className="mb-3 text-xs text-neutral-400">해당 유형의 요금제 Top 3</p>

      <div className="space-y-2">
        {topPlans.map((plan, i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="bg-primary-500 h-2 w-2 rounded-full" />
              <span className="text-neutral-700">{plan.name}</span>
            </div>

            <div className="flex gap-1">
              <span className="text-neutral-700">{plan.users.toLocaleString()}명</span>
              <span className="text-primary-500">({plan.percent}%)</span>
            </div>
          </div>
        ))}
      </div>

      <div className="my-3 border-t border-neutral-200" />

      <div className="flex justify-between">
        <span className="text-neutral-600">총 사용자수</span>
        <span className="font-semibold text-neutral-800">{totalUsers.toLocaleString()}명</span>
      </div>
    </div>
  );
}

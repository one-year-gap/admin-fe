import { api } from "@/lib/axios";
import type { CounselTrafficDailyItem, CounselTrafficResponse } from "@/models/counselTraffic";

export async function getCounselTrafficMonthly(month: string) {
  const { data } = await api.get("/api/v1/admin/counsel-traffic/monthly", {
    params: { month },
  });

  return data.data as CounselTrafficResponse<CounselTrafficDailyItem>;
}

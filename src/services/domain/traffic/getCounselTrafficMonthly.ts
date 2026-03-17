import { api } from "@/lib/axios";
import type {
  ApiResponse,
  CounselTrafficDailyItem,
  CounselTrafficResponse,
} from "@/models/counselTraffic";

export async function getCounselTrafficMonthly(month: string) {
  const { data } = await api.get<ApiResponse<CounselTrafficResponse<CounselTrafficDailyItem>>>(
    "/api/v1/admin/counsel-traffic/monthly",
    {
      params: { month },
    },
  );

  return data.data;
}

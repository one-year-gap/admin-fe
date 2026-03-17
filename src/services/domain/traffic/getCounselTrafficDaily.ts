import { api } from "@/lib/axios";
import type {
  ApiResponse,
  CounselTrafficHourlyItem,
  CounselTrafficResponse,
} from "@/models/counselTraffic";

export async function getCounselTrafficHourly(date: string) {
  const { data } = await api.get<ApiResponse<CounselTrafficResponse<CounselTrafficHourlyItem>>>(
    "/api/v1/admin/counsel-traffic/daily",
    {
      params: { date },
    },
  );

  return data.data;
}

import { api } from "@/lib/axios";
import type { CounselTrafficResponse } from "@/models/counselTraffic";

export async function getCounselTrafficDaily(date: string) {
  const { data } = await api.get("/api/v1/admin/counsel-traffic/daily", {
    params: { date },
  });

  return data.data as CounselTrafficResponse;
}

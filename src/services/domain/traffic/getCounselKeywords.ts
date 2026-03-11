import { api } from "@/lib/axios";
import type { CounselKeywordItem, CounselKeywordResponse } from "@/models/counselKeyword";

export async function getCounselKeywords(
  year: number,
  month: number,
): Promise<CounselKeywordItem[]> {
  const { data } = await api.get<CounselKeywordResponse>(
    "/api/v1/admin/dashboard/supports/keywords",
    {
      params: { year, month },
    },
  );

  return data.data;
}

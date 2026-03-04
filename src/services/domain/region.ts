import { api } from "@/lib/axios";
import type { RegionResponseDTO } from "@/models/region";

export const getRegionArpu = async (yyyymm: string): Promise<RegionResponseDTO> => {
  const response = await api.get("/api/v1/admin/analytics/regions/arpu", {
    params: { yyyymm },
  });
  return response.data.data;
};

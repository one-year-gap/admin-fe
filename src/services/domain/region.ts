import { api } from "@/lib/axios";
import type { RegionResponseDTO, RegionTopResponseDTO } from "@/models/region";

export const getRegionArpu = async (yyyymm: string): Promise<RegionResponseDTO> => {
  const response = await api.get("/api/v1/admin/analytics/regions/arpu", {
    params: { yyyymm },
  });
  return response.data.data;
};

export const getRegionTop = async (): Promise<RegionTopResponseDTO> => {
  const response = await api.get("/api/v1/admin/analytics/regions/plans/top3");
  return response.data.data;
};

import { api } from "@/lib/axios";
import type { membershipChartResponseDTO } from "@/models/customers/membershipChart";

export async function getMembershipChart(): Promise<membershipChartResponseDTO> {
  const response = await api.get("/api/v1/admin/members/membership");
  return response.data.data;
}

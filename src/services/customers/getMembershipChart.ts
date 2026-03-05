import { api } from "@/lib/axios";
import type { ApiResponse } from "@/models/common/apiResponse";
import type { membershipChartResponseDTO } from "@/models/customers/membershipChart";

export async function getMembershipChart(): Promise<membershipChartResponseDTO> {
  const response = await api.get<ApiResponse<membershipChartResponseDTO>>(
    "/api/v1/admin/members/membership",
  );
  return response.data.data;
}

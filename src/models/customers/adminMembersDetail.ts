export interface MemberDetailResponseDTO {
  name: string;
  age: number;
  membership: "GOLD" | "VIP" | "VVIP";
  gender: "M" | "F";

  fullAddress: string;
  email: string;
  phone: string;

  birthDate: string;

  currentMobilePlan: string;

  joinDate: string;
  joinDurationText: string;

  status: "ACTIVE" | "BANNED" | "DELETED" | "PROCESSING";

  isContracted: boolean;
  contractMonths: number | null;
  contractStartDate: string | null;
  contractEndDate: string | null;
  remainingDays: number | null;
  isExpired: boolean | null;

  totalSupportCount: number;
  lastSupportDate: string | null;
}

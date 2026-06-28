import type { SubscriptionPlan } from "./vendor";

export type SubRequestStatus = "PENDING" | "APPROVED" | "REJECTED";
export type AdminVendorStatus = "ACTIVE" | "PENDING" | "SUSPENDED";

export interface AdminVendor {
  id: string;
  name: string;
  category: string;
  city: string;
  plan: SubscriptionPlan;
  status: AdminVendorStatus;
  joined: string;
  revenue: number;
}

export interface SeoPage {
  id: string;
  type: "home" | "category" | "city" | "vendor" | "static";
  path: string;
  label: string;
  title: string;
  description: string;
  indexed: boolean;
  hasSchema: boolean;
}

export interface SubRequest {
  id: string;
  vendor: string;
  city: string;
  fromPlan: SubscriptionPlan;
  toPlan: SubscriptionPlan;
  requestedAt: string;
  status: SubRequestStatus;
  monthlyRevenue: number;
}

export interface ActiveSub {
  id: string;
  vendor: string;
  plan: SubscriptionPlan;
  since: string;
  nextBilling: string;
  amount: number;
  status: "ACTIVE" | "CANCELLED";
}

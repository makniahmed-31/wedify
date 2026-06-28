import type { SubscriptionPlan } from "./vendor";

export interface SubscriptionPlanConfig {
  id: string;
  name: SubscriptionPlan;
  label: string;
  description: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
  rankBoost: number;
  isPopular?: boolean;
}

export interface VendorSubscription {
  id: string;
  vendorId: string;
  plan: SubscriptionPlan;
  status: "ACTIVE" | "CANCELLED" | "PAST_DUE" | "TRIALING";
  currentPeriodStart: string;
  currentPeriodEnd: string;
  cancelAtPeriodEnd: boolean;
}

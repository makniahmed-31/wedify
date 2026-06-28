import type { SubscriptionPlan } from "./vendor";

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface TrafficSource {
  source: string;
  percentage: number;
  visits: number;
}

export interface FunnelStep {
  step: string;
  count: number;
  percentage: number;
}

export interface PlatformStats {
  totalVendors: number;
  totalCities: number;
  totalBookings: number;
  totalUsers: number;
}

export interface VendorAnalytics {
  vendorId: string;
  period: string;
  profileViews: number;
  bookingRequests: number;
  confirmedBookings: number;
  conversionRate: number;
  averageRating: number;
  reviewCount: number;
}

export interface AdminAnalytics {
  mrr: number;
  mrrChange: number;
  arr: number;
  totalVendors: number;
  totalVendorsChange: number;
  activeSubscriptions: number;
  totalBookings: number;
  totalRevenue: number;
  revenueOverTime: TimeSeriesPoint[];
  vendorsByPlan: { plan: SubscriptionPlan; count: number }[];
  revenueByCategory: { category: string; revenue: number }[];
  conversionFunnel: FunnelStep[];
}

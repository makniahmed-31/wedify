import type { Vendor, SubscriptionPlan } from "./vendor";

export interface SearchFilters {
  query?: string;
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  plan?: SubscriptionPlan;
  languages?: string[];
  sort?: "RANK" | "RATING" | "PRICE_ASC" | "PRICE_DESC" | "NEWEST";
  page?: number;
  limit?: number;
}

export interface SearchResult {
  vendors: Vendor[];
  total: number;
  page: number;
  totalPages: number;
  filters: SearchFilters;
}

import type { User } from "./user";

export type ReviewStatus = "PENDING" | "APPROVED" | "REJECTED" | "FLAGGED";

export interface Review {
  id: string;
  vendorId: string;
  customer: Pick<User, "id" | "name" | "avatar">;
  rating: number;
  title?: string;
  body: string;
  photos?: string[];
  isVerified: boolean;
  createdAt: string;
  vendorReply?: string;
}

export interface LatestReview {
  id: string;
  rating: number;
  title?: string;
  body: string;
  customer: { name: string };
  vendorName?: string;
}

export interface AdminReview {
  id: string;
  vendor: string;
  reviewer: string;
  rating: number;
  comment: string;
  date: string;
  status: ReviewStatus;
  category: string;
}

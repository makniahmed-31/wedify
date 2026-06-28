import type { User } from "./user";
import type { Vendor } from "./vendor";

export type BookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "REFUNDED";

export interface Booking {
  id: string;
  vendor: Pick<Vendor, "id" | "businessName" | "slug" | "coverImage" | "category">;
  customer: Pick<User, "id" | "name" | "email" | "phone">;
  serviceId?: string;
  packageId?: string;
  date: string;
  time?: string;
  guestCount?: number;
  status: BookingStatus;
  totalAmount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface VendorBooking {
  id: string;
  name?: string;
  coupleName?: string;
  phone?: string;
  couplePhone?: string;
  date?: string;
  eventDate?: string;
  status: string;
  amount?: number;
  totalAmount?: number;
  service?: string;
  serviceName?: string;
  notes?: string;
}

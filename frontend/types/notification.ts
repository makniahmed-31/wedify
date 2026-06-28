export type NotificationChannel = "EMAIL" | "SMS" | "WHATSAPP" | "IN_APP";

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  body: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

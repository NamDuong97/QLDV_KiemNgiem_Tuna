export type NotificationType = "comment" | "friend" | "like" | "event";

export interface NotificationProps {
  id: string;
  type: NotificationType;
  avatar?: string;
  avatarClass: string;
  name: string;
  content: string;
  time: string;
  icon: React.ReactNode;
  buttons?: boolean;
  isEvent?: boolean;
}

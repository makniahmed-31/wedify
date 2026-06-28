export type BlockType =
  | "HERO"
  | "ABOUT"
  | "SERVICES"
  | "GALLERY"
  | "PRICING"
  | "TESTIMONIALS"
  | "FAQ"
  | "CONTACT"
  | "CTA"
  | "VIDEO";

export interface PageBlock {
  id: string;
  type: BlockType;
  order: number;
  isVisible: boolean;
  config: Record<string, unknown>;
}

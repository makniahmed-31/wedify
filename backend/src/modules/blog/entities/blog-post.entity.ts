import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("blog_posts")
export class BlogPost {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ unique: true })
  slug: string;

  @Column({ type: "text", nullable: true })
  excerpt: string;

  @Column({ type: "text", nullable: true })
  content: string;

  @Column({ name: "cover_image", nullable: true })
  coverImage: string;

  @Column({ type: "json", nullable: true })
  tags: string[];

  @Column({ name: "author_name", nullable: true })
  authorName: string;

  @Column({ default: "DRAFT" })
  status: string;

  @Column({ name: "published_at", nullable: true })
  publishedAt: Date;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { BlogPost } from "./entities/blog-post.entity";
import { CreateBlogPostDto, UpdateBlogPostDto } from "./dto/blog.dto";

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(BlogPost)
    private readonly repo: Repository<BlogPost>,
  ) {}

  async findAll(limit = 10, status = "PUBLISHED"): Promise<BlogPost[]> {
    return this.repo.find({
      where: { status },
      order: { publishedAt: "DESC", createdAt: "DESC" },
      take: limit,
    });
  }

  async findBySlug(slug: string): Promise<BlogPost> {
    const post = await this.repo.findOne({
      where: { slug, status: "PUBLISHED" },
    });
    if (!post) throw new NotFoundException("Blog post not found");
    return post;
  }

  async findById(id: string): Promise<BlogPost> {
    const post = await this.repo.findOne({ where: { id } });
    if (!post) throw new NotFoundException("Blog post not found");
    return post;
  }

  async create(dto: CreateBlogPostDto): Promise<BlogPost> {
    const post = this.repo.create({
      ...dto,
      publishedAt: dto.status === "PUBLISHED" ? new Date() : null,
    });
    return this.repo.save(post);
  }

  async update(id: string, dto: UpdateBlogPostDto): Promise<BlogPost> {
    const post = await this.findById(id);
    const updates: Partial<BlogPost> = { ...dto };
    if (dto.status === "PUBLISHED" && post.status !== "PUBLISHED") {
      updates.publishedAt = new Date();
    }
    await this.repo.update(id, updates);
    return this.findById(id);
  }

  async remove(id: string): Promise<void> {
    await this.findById(id);
    await this.repo.delete(id);
  }
}

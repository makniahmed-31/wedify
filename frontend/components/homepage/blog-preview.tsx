"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";
import { useT } from "@/lib/i18n";

const TAG_LABELS: Record<string, string> = {
  conseils: "CONSEILS",
  inspiration: "INSPIRATIONS",
  guide: "GUIDES",
  budget: "BUDGET",
};

export function BlogPreview() {
  const t = useT();
  const posts = MOCK_BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-14 lg:py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground">{t("blog.title")}</h2>
            <div className="divider-heart" />
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-secondary hover:underline shrink-0">
            {t("blog.viewAll")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {posts.map((post) => (
            <Link key={post.id} href={`/blog/${post.slug}`}
              className="group block rounded-xl bg-white border overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            >
              <div className="relative h-44 overflow-hidden">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-4">
                <p className="text-xs font-semibold text-secondary tracking-wider mb-1.5">
                  {post.tags[0] ? (TAG_LABELS[post.tags[0]] ?? post.tags[0].toUpperCase()) : "ARTICLE"}
                </p>
                <h3 className="font-semibold text-sm text-foreground leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                <p className="text-xs text-muted-foreground">
                  {new Date(post.publishedAt ?? "").toLocaleDateString("fr-TN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

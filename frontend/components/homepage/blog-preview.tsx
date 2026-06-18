import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "lucide-react";
import { MOCK_BLOG_POSTS } from "@/lib/mock-data";

export function BlogPreview() {
  const posts = MOCK_BLOG_POSTS.slice(0, 3);

  return (
    <section className="py-16 lg:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Wedding <span className="text-gradient-gold">Inspiration</span>
            </h2>
            <p className="text-muted-foreground mt-2">Tips, trends, and ideas for your perfect day</p>
          </div>
          <Link href="/blog" className="hidden sm:flex items-center gap-2 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {posts.map((post, idx) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`group block rounded-2xl bg-card border overflow-hidden hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5 ${idx === 0 ? "sm:col-span-1" : ""}`}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-semibold text-base leading-snug group-hover:text-primary transition-colors mb-2 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {post.readingTime} min read
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Star, Quote } from "lucide-react";
import { MOCK_REVIEWS, MOCK_VENDORS } from "@/lib/mock-data";

export function LatestReviews() {
  const reviews = MOCK_REVIEWS.slice(0, 3);

  return (
    <section className="py-16 lg:py-20 bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold mb-3">
            What Couples <span className="text-bg-primary">Say</span>
          </h2>
          <p className="text-muted-foreground">
            Real stories from real weddings across Tunisia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => {
            const vendor = MOCK_VENDORS.find((v) => v.id === review.vendorId);
            return (
              <div
                key={review.id}
                className="bg-card rounded-lg border p-6 relative"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < review.rating ? "fill-primary text-primary" : "text-muted"}`}
                    />
                  ))}
                </div>
                {/* Review */}
                {review.title && (
                  <h4 className="font-semibold mb-2 text-sm">{review.title}</h4>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-4 mb-4">
                  {review.body}
                </p>
                {/* Customer + Vendor */}
                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                      {review.customer.name[0]}
                    </div>
                    <span className="text-sm font-medium">
                      {review.customer.name}
                    </span>
                  </div>
                  {vendor && (
                    <span className="text-xs text-muted-foreground">
                      {vendor.businessName}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

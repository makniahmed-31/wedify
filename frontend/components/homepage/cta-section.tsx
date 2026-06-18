import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl gradient-gold p-10 lg:p-16 text-center">
          {/* Decorative circles */}
          <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/10" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white/10" />

          <div className="relative z-10">
            <Heart className="h-10 w-10 fill-white text-white mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
              Ready to List Your Business?
            </h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Join 1,850+ wedding vendors already growing their business on Wedify. Get discovered by thousands of couples every month.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/register/vendor"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-primary shadow-lg hover:shadow-xl transition-shadow"
              >
                Start Free Trial <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors"
              >
                View Pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-white/60">No credit card required · Cancel anytime</p>
          </div>
        </div>
      </div>
    </section>
  );
}

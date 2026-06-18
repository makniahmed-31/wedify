import Link from "next/link";
import { Heart } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left panel — illustration */}
      <div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden gradient-gold text-white p-12">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1200')] bg-cover bg-center" />
        <div className="relative z-10 text-center max-w-sm">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <Heart className="h-8 w-8 fill-white text-white" />
            <span className="text-2xl font-bold">Wedify</span>
          </Link>
          <h2 className="text-3xl font-bold mb-4">Grow your wedding business</h2>
          <p className="text-white/80 leading-relaxed">
            Join 1,850+ vendors already growing with Wedify. Get discovered by thousands of couples every month.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 text-left">
            {["12K+ Monthly visitors", "1,850+ Active vendors", "8,700+ Bookings made", "4.8★ Average rating"].map((item) => (
              <div key={item} className="rounded-xl bg-white/10 px-4 py-3 text-sm font-medium">{item}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
            <Heart className="h-6 w-6 fill-primary text-primary" />
            <span className="text-xl font-bold text-gradient-gold">Wedify</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
}

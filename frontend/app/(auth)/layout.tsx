import Link from "next/link";
import Image from "next/image";
import { Shield, Star, Headphones, Lock, CreditCard } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 grid lg:grid-cols-2">
        {/* Left panel — wedding photo */}
        <div className="hidden lg:flex flex-col relative overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=85"
            alt="Mariage en Tunisie"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20" />

          {/* Content over image */}
          <div className="relative z-10 flex flex-col h-full p-10">
            <Link href="/" className="flex items-center gap-2 mb-auto">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 24s-10-6.5-10-13a6 6 0 0 1 10-4.47A6 6 0 0 1 24 11c0 6.5-10 13-10 13z"
                  fill="#D88C70"
                  stroke="#D88C70"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-xl font-bold">
                <span className="text-white">BonPlanMariage</span>
                <span className="text-primary">.tn</span>
              </span>
            </Link>

            <div className="mt-auto">
              <h2 className="text-3xl font-bold text-white mb-3">
                Bienvenue sur
                <br />
                <span className="text-white">BonPlan</span>
                <span className="text-primary">Mariage.tn</span>
              </h2>
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xs">
                La plateforme qui connecte les futurs mariés aux meilleurs
                prestataires en Tunisie.
              </p>

              <div className="space-y-3">
                {[
                  {
                    icon: <Shield className="h-4 w-4" />,
                    title: "Prestataires vérifiés",
                    desc: "Des professionnels de confiance",
                  },
                  {
                    icon: <Star className="h-4 w-4" />,
                    title: "Avis authentiques",
                    desc: "Des retours d'expérience fiables",
                  },
                  {
                    icon: <Headphones className="h-4 w-4" />,
                    title: "Support dédié",
                    desc: "À votre écoute à chaque étape",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-white/60">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-md border border-white/20 bg-white/10 backdrop-blur-sm p-4">
                <p className="text-sm text-white/80">
                  En créant un compte, profitez d&apos;
                  <span className="text-primary font-semibold">
                    offres exclusives
                  </span>{" "}
                  et d&apos;avantages personnalisés !
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel — form */}
        <div className="flex flex-col">
          {/* Mobile logo */}
          <div className="lg:hidden p-4 border-b">
            <Link href="/" className="flex items-center gap-2">
              <svg width="24" height="24" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 24s-10-6.5-10-13a6 6 0 0 1 10-4.47A6 6 0 0 1 24 11c0 6.5-10 13-10 13z"
                  fill="#D88C70"
                  stroke="#D88C70"
                  strokeWidth="1.5"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-lg font-bold">
                <span className="text-foreground">BonPlanMariage</span>
                <span className="text-primary">.tn</span>
              </span>
            </Link>
          </div>

          <div className="flex-1 flex items-start justify-center p-6 lg:p-10 pt-8 lg:pt-10">
            <div className="w-full max-w-md">{children}</div>
          </div>

          {/* Bottom trust bar */}
          <div className="border-t border-border/40 px-6 py-4">
            <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
              {[
                {
                  icon: <Lock className="h-4 w-4" />,
                  label: "Plateforme sécurisée",
                  desc: "Vos données sont protégées",
                },
                {
                  icon: <CreditCard className="h-4 w-4" />,
                  label: "Paiements sécurisés",
                  desc: "Transactions 100% sécurisées",
                },
                {
                  icon: <Star className="h-4 w-4" />,
                  label: "+5000 prestataires",
                  desc: "Partout en Tunisie",
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center gap-1"
                >
                  <span className="text-primary">{item.icon}</span>
                  <p className="text-xs font-semibold text-foreground leading-tight">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground leading-tight">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

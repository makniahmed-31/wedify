import type { Metadata } from "next";
import { CheckCircle, AlertCircle, XCircle, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "SEO Settings" };

const SEO_CHECKS = [
  {
    label: "Meta Title",
    status: "good",
    message: "Your meta title is 58 characters — ideal length.",
  },
  {
    label: "Meta Description",
    status: "warning",
    message: "Meta description is 124 characters. Aim for 150–160.",
  },
  { label: "Business Name", status: "good", message: "Business name is set." },
  {
    label: "Category Keywords",
    status: "good",
    message: "Category page linked correctly.",
  },
  {
    label: "Gallery Images",
    status: "error",
    message: "No alt text on gallery images. Add descriptions.",
  },
  {
    label: "Phone Number",
    status: "good",
    message: "Phone number is visible on your profile.",
  },
  {
    label: "City / Location",
    status: "good",
    message: "City is set to Tunis.",
  },
  {
    label: "Schema Markup",
    status: "good",
    message: "LocalBusiness schema is auto-generated.",
  },
  {
    label: "Reviews Count",
    status: "warning",
    message: "You have 128 reviews. More reviews = better ranking.",
  },
  {
    label: "Response Time",
    status: "good",
    message: "Responding within 1 hour boosts your ranking.",
  },
];

function StatusIcon({ status }: { status: string }) {
  if (status === "good")
    return <CheckCircle className="h-4 w-4 text-green-500 shrink-0" />;
  if (status === "warning")
    return <AlertCircle className="h-4 w-4 text-yellow-500 shrink-0" />;
  return <XCircle className="h-4 w-4 text-red-500 shrink-0" />;
}

export default function SEOPage() {
  const score = 92;
  const good = SEO_CHECKS.filter((c) => c.status === "good").length;
  const warnings = SEO_CHECKS.filter((c) => c.status === "warning").length;
  const errors = SEO_CHECKS.filter((c) => c.status === "error").length;

  return (
    <div className="space-y-8 ">
      <div>
        <h1 className="text-2xl font-bold">SEO Settings</h1>
        <p className="text-muted-foreground mt-1">
          Optimize your profile to rank higher in search results.
        </p>
      </div>

      {/* Score card */}
      <div className="rounded-lg border bg-card p-6 flex items-center gap-6">
        <div className="relative w-24 h-24 shrink-0">
          <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="hsl(var(--muted))"
              strokeWidth="12"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#C9A84C"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${(2 * Math.PI * 40 * score) / 100} ${2 * Math.PI * 40}`}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{score}</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">SEO Score: {score}/100</h2>
          <p className="text-muted-foreground text-sm mb-3">
            Your profile is well-optimized. Fix remaining issues to reach 100.
          </p>
          <div className="flex gap-4 text-sm">
            <span className="text-green-600 font-medium">{good} Good</span>
            <span className="text-yellow-600 font-medium">
              {warnings} Warnings
            </span>
            <span className="text-red-500 font-medium">{errors} Errors</span>
          </div>
        </div>
      </div>

      {/* Edit form */}
      <div className="rounded-lg border bg-card p-6 space-y-5">
        <h2 className="font-semibold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" /> SEO Configuration
        </h2>
        <div>
          <label className="block text-sm font-medium mb-1.5">Meta Title</label>
          <input
            defaultValue="Elegance Hall - Premier Wedding Venue in Tunis"
            className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
          />
          <p className="text-xs text-muted-foreground mt-1">58/70 characters</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Meta Description
          </label>
          <textarea
            defaultValue="Book Tunisia's finest wedding hall. Capacity 800 guests. Luxury décor, professional team. Available for 2025 bookings."
            rows={3}
            className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
          />
          <p className="text-xs text-muted-foreground mt-1">
            124/160 characters
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">
            Keywords (comma separated)
          </label>
          <input
            defaultValue="wedding hall tunis, salle des fêtes tunis, mariage tunis"
            className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <button className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-gold hover:opacity-90">
          Save SEO Settings
        </button>
      </div>

      {/* Checklist */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-4">SEO Checklist</h2>
        <div className="space-y-3">
          {SEO_CHECKS.map((check) => (
            <div key={check.label} className="flex items-start gap-3">
              <StatusIcon status={check.status} />
              <div>
                <p className="text-sm font-medium">{check.label}</p>
                <p className="text-xs text-muted-foreground">{check.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

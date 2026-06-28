import type { Metadata } from "next";

export const metadata: Metadata = { title: "Ranking Control" };

const WEIGHT_FIELDS = [
  {
    key: "subscription",
    label: "Subscription Tier",
    description: "Premium=100, Pro=50, Basic=10",
    value: 35,
  },
  {
    key: "profileCompleteness",
    label: "Profile Completeness",
    description: "100% complete profile",
    value: 15,
  },
  {
    key: "reviewScore",
    label: "Review Score",
    description: "Average star rating × weight",
    value: 25,
  },
  {
    key: "reviewCount",
    label: "Review Count",
    description: "Number of verified reviews",
    value: 10,
  },
  {
    key: "responseTime",
    label: "Response Time",
    description: "Speed of replying to inquiries",
    value: 10,
  },
  {
    key: "recentActivity",
    label: "Recent Activity",
    description: "Profile updated, new photos",
    value: 5,
  },
];

export default function RankingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Ranking Algorithm</h1>
        <p className="text-muted-foreground mt-1">
          Adjust the weights that determine vendor search ranking.
        </p>
      </div>

      <div className="rounded-lg border bg-card p-6">
        <p className="text-sm text-muted-foreground mb-6">
          Total weight must equal 100%. Current total: <strong>100%</strong>
        </p>

        <div className="space-y-6">
          {WEIGHT_FIELDS.map((field) => (
            <div key={field.key}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <p className="font-medium text-sm">{field.label}</p>
                  <p className="text-xs text-muted-foreground">
                    {field.description}
                  </p>
                </div>
                <span className="font-bold text-primary">{field.value}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={50}
                defaultValue={field.value}
                className="w-full accent-primary"
              />
            </div>
          ))}
        </div>

        <button className="mt-8 rounded-full gradient-gold px-5 py-2.5 text-sm font-semibold text-white shadow-gold hover:opacity-90">
          Save Ranking Configuration
        </button>
      </div>

      {/* Ranking formula */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="font-semibold mb-3">Ranking Formula</h2>
        <div className="rounded-md bg-muted p-4 font-mono text-sm leading-relaxed">
          <span className="text-primary">Score</span> = <br />
          &nbsp;&nbsp;<span className="text-blue-500">
            subscriptionWeight
          </span>{" "}
          × planScore + <br />
          &nbsp;&nbsp;<span className="text-green-500">profileWeight</span> ×
          completeness + <br />
          &nbsp;&nbsp;<span className="text-yellow-500">reviewWeight</span> ×
          (avgRating × reviewCount) + <br />
          &nbsp;&nbsp;<span className="text-purple-500">responseWeight</span> ×
          responseScore + <br />
          &nbsp;&nbsp;<span className="text-orange-500">activityWeight</span> ×
          recentActivityScore
        </div>
      </div>
    </div>
  );
}

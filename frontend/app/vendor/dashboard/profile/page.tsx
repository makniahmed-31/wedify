"use client";

import { useState } from "react";
import {
  Save,
  Camera,
  Globe,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { CATEGORIES, CITIES, LANGUAGES } from "@/lib/constants";

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Business Profile</h1>
        <p className="text-muted-foreground mt-1">
          Update your public profile information.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Cover & Logo */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Media</h2>
          <div className="relative h-40 rounded-md bg-muted overflow-hidden mb-4 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <Camera className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">Click to upload cover image</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full border px-4 py-2 text-sm hover:bg-muted"
          >
            Upload Cover Photo
          </button>
        </div>

        {/* Basic Info */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Basic Information</h2>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Business Name *
            </label>
            <input
              defaultValue="Elegance Hall"
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Tagline</label>
            <input
              defaultValue="Where Dreams Become Reality"
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              placeholder="A short catchphrase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Category *
              </label>
              <select
                defaultValue="wedding-halls"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">City *</label>
              <select
                defaultValue="tunis"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              >
                {CITIES.map((city) => (
                  <option key={city.id} value={city.slug}>
                    {city.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Description
            </label>
            <textarea
              rows={4}
              defaultValue="Elegance Hall is Tunisia's premier wedding venue..."
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">
              Years in Business
            </label>
            <input
              type="number"
              defaultValue={12}
              min={0}
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Contact Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                <Phone className="h-4 w-4" /> Phone
              </label>
              <input
                type="tel"
                defaultValue="+216 71 234 567"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </label>
              <input
                type="tel"
                defaultValue="+21671234567"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
              <Globe className="h-4 w-4" /> Website
            </label>
            <input
              type="url"
              defaultValue="https://elegancehall.tn"
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> Address
            </label>
            <input
              defaultValue="15 Avenue Habib Bourguiba, Tunis 1001"
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* Languages */}
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold mb-4">Languages Spoken</h2>
          <div className="flex flex-wrap gap-2">
            {LANGUAGES.map((lang) => (
              <label
                key={lang}
                className="flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm cursor-pointer hover:border-primary/50"
              >
                <input
                  type="checkbox"
                  defaultChecked={["Arabic", "French", "English"].includes(
                    lang,
                  )}
                  className="accent-primary"
                />
                {lang}
              </label>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Price Range</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Starting From (TND)
              </label>
              <input
                type="number"
                defaultValue={5000}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">
                Up To (TND)
              </label>
              <input
                type="number"
                defaultValue={25000}
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-full gradient-gold px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90 transition-opacity"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

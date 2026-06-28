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

function GalleryEditor() {
  const [urls, setUrls] = useState<string[]>([""]);

  function updateUrl(i: number, val: string) {
    setUrls((prev) => prev.map((u, idx) => (idx === i ? val : u)));
  }

  function addRow() {
    setUrls((prev) => [...prev, ""]);
  }

  function removeRow(i: number) {
    setUrls((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="space-y-2">
      {urls.map((url, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            type="url"
            name={`gallery[${i}]`}
            value={url}
            onChange={(e) => updateUrl(i, e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="flex-1 rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
          />
          {url && (
            <img
              src={url}
              alt=""
              className="h-10 w-10 rounded object-cover border"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
          )}
          <button
            type="button"
            onClick={() => removeRow(i)}
            className="text-muted-foreground hover:text-destructive text-lg leading-none px-1"
            aria-label="Remove"
          >
            ×
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addRow}
        className="text-sm text-primary hover:underline"
      >
        + Add photo URL
      </button>
    </div>
  );
}

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

        {/* Social Media */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Social Media &amp; Online Presence</h2>
          <p className="text-sm text-muted-foreground">
            Add your social links so clients can find and share your page.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook URL
              </label>
              <input
                type="url"
                name="facebook"
                placeholder="https://facebook.com/yourpage"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                <svg className="h-4 w-4 text-pink-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
                Instagram URL
              </label>
              <input
                type="url"
                name="instagram"
                placeholder="https://instagram.com/yourprofile"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                <svg className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                YouTube Channel URL
              </label>
              <input
                type="url"
                name="youtube"
                placeholder="https://youtube.com/@yourchannel"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
                </svg>
                TikTok URL
              </label>
              <input
                type="url"
                name="tiktok"
                placeholder="https://tiktok.com/@yourprofile"
                className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
              <svg className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              Promo / Portfolio Video (YouTube link)
            </label>
            <input
              type="url"
              name="videoUrl"
              placeholder="https://www.youtube.com/watch?v=..."
              className="w-full rounded-md border bg-background px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Paste a YouTube link — it will be embedded on your public page.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="rounded-lg border bg-card p-6 space-y-4">
          <h2 className="font-semibold">Photo Gallery</h2>
          <p className="text-sm text-muted-foreground">
            Add public image URLs to showcase your work. Use image hosting like Google Drive (shared), Imgur, or Cloudinary.
          </p>
          <GalleryEditor />
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-gold hover:opacity-90 transition-opacity"
        >
          <Save className="h-4 w-4" />
          {saved ? "Saved!" : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

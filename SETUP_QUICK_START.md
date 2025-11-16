# 🚀 Quick Start: PostHog & Google Analytics Setup

## ⚡ 5-Minute Setup

### 1️⃣ PostHog (Already Done! ✅)

**PostHog is already configured!** The landing page uses the **same PostHog project** as your mobile app.

- **API Key**: `phc_n5IVXNCgQe9a2tT4VfPIeGDNdOgNT9NMBmPFZ5wkGLN` (pre-configured)
- **No setup needed** - it works out of the box!

**Note:** PostHog automatically tags events:

- Web events: `$lib = posthog-js` (landing page)
- Mobile events: `$lib = posthog-react-native` (mobile app)

You can filter by `$lib` in PostHog to see web vs mobile events separately.

### 2️⃣ Google Analytics (2 minutes)

1. **Create Account:** [https://analytics.google.com/](https://analytics.google.com/) → Sign in
2. **Create Property:** Admin → Create Property → Name: "HandyPay Landing Page"
3. **Add Web Stream:** Data Streams → Add stream → Web → Enter URL
4. **Get Measurement ID:** Copy the ID (format: `G-XXXXXXXXXX`)
5. **Add to `.env.local`:**
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

### 3️⃣ Restart & Test (1 minute)

1. **Restart dev server:**

   ```bash
   pnpm dev
   ```

2. **Test:**
   - Open `http://localhost:3000`
   - Open DevTools → Network tab
   - Filter: `posthog.com` or `google-analytics.com`
   - Scroll/click around → See requests? ✅ Working!

---

## 📝 Your `.env.local` File Should Look Like:

```env
# Google Analytics 4 Measurement ID (required)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABCDEFGHIJ

# PostHog (optional - already configured with mobile app's key)
# NEXT_PUBLIC_POSTHOG_KEY=phc_AbCdEfGhIjKlMnOpQrStUvWxYz1234567890
```

**Only Google Analytics needs to be set up!** PostHog is already working.

---

## ✅ Verify It's Working

### PostHog:

- Go to [app.posthog.com](https://app.posthog.com) → Your project → Activity
- Should see events like `$pageview`, `app_download_clicked`

### Google Analytics:

- Go to [analytics.google.com](https://analytics.google.com) → Your property → Realtime
- Should see active users and events

---

## 🎯 That's It!

Once both are working, you're done. All events are automatically tracked to both platforms.

**For detailed instructions:** See `docs/SETUP_CHECKLIST.md`

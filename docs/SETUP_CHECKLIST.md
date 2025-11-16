# PostHog & Google Analytics Setup Checklist

## ✅ What's Already Done

**PostHog is already configured!** The landing page uses the **same PostHog project** as your mobile app. No setup needed for PostHog.

**You only need to set up Google Analytics.**

---

## 📋 Step-by-Step Setup Instructions

### Part 1: PostHog ✅ (Already Configured!)

**PostHog is pre-configured and working!**

- **API Key**: `phc_n5IVXNCgQe9a2tT4VfPIeGDNdOgNT9NMBmPFZ5wkGLN` (mobile app's key)
- **Host**: `https://app.posthog.com`
- **Status**: ✅ Ready to use

**How it works:**

- PostHog automatically tags events with library type
- Web events: `$lib = posthog-js` (landing page)
- Mobile events: `$lib = posthog-react-native` (mobile app)
- Filter by `$lib` in PostHog dashboard to see web vs mobile separately

**No action needed!** PostHog tracking is already working.

---

### Part 2: Google Analytics 4 Setup (Required)

#### Step 2.1: Create Google Analytics Account

1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Sign in with your Google account
3. Click **"Start measuring"** or **"Admin"** → **"Create Property"**

#### Step 2.2: Create GA4 Property

1. Click **"Admin"** (gear icon in bottom left)
2. In the **Property** column, click **"Create Property"**
3. Fill in:
   - **Property name**: `HandyPay Landing Page` (or similar)
   - **Reporting time zone**: Select your timezone
   - **Currency**: USD or JMD (your preference)
4. Click **"Next"**
5. Fill in business information (optional)
6. Click **"Create"**

#### Step 2.3: Create Web Data Stream

1. After creating property, you'll see **"Data Streams"**
2. Click **"Add stream"** → **"Web"**
3. Fill in:
   - **Website URL**: `https://tryhandypay.org` (or your actual domain)
   - **Stream name**: `HandyPay Landing Page`
4. Click **"Create stream"**

#### Step 2.4: Get GA4 Measurement ID

1. After creating the stream, you'll see the stream details
2. Find **"Measurement ID"** (format: `G-XXXXXXXXXX`)
3. **Copy this ID** - you'll need it in the next step

**Example:** `G-ABC123XYZ`

#### Step 2.5: Add to Environment Variables

1. **Create `.env.local` file** in your project root (if it doesn't exist)
2. **Add this line:**
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. **Replace `G-XXXXXXXXXX`** with your actual Measurement ID from Step 2.4

---

### Part 3: Complete Environment Variables File

Your `.env.local` file should look like this:

```env
# Google Analytics 4 Measurement ID (REQUIRED)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR_GA_MEASUREMENT_ID_HERE

# PostHog (OPTIONAL - already configured with mobile app's key)
# Only add this if you want to use a different PostHog project
# NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_POSTHOG_API_KEY_HERE

# Optional: Override PostHog host (default: https://app.posthog.com)
# NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# Optional: Site URL for structured data (default: https://tryhandypay.org)
# NEXT_PUBLIC_SITE_URL=https://tryhandypay.org
```

**Important:**

- Replace `G-YOUR_GA_MEASUREMENT_ID_HERE` with your actual GA4 Measurement ID
- PostHog is already configured - you don't need to add `NEXT_PUBLIC_POSTHOG_KEY` unless you want a different project
- Don't commit `.env.local` to git (it should be in `.gitignore`)

---

### Part 4: Restart Development Server

1. Stop your current dev server (Ctrl+C)
2. Start it again:
   ```bash
   pnpm dev
   ```

---

### Part 5: Testing & Verification

#### Test PostHog (Already Working!)

1. **Open your landing page** in browser: `http://localhost:3000`
2. **Open DevTools** (F12 or Right-click → Inspect)
3. **Go to Network tab**
4. **Filter for:** `posthog.com` or `app.posthog.com`
5. **Perform actions:**
   - Scroll down the page
   - Click a download button
   - Click "More Features" button
   - Click navigation links
6. **Verify:** You should see requests to PostHog in the Network tab
7. **Check PostHog Dashboard:**
   - Go to [https://app.posthog.com](https://app.posthog.com)
   - Open your project (same one as mobile app)
   - Go to **"Activity"** or **"Events"**
   - Filter by `$lib = posthog-js` to see only landing page events
   - You should see events appearing (may take 1-2 minutes)

#### Test Google Analytics

1. **Keep DevTools open** (Network tab)
2. **Filter for:** `google-analytics.com` or `googletagmanager.com`
3. **Perform actions:**
   - Scroll down the page
   - Click download buttons
   - Navigate to different sections
4. **Verify:** You should see requests to Google Analytics
5. **Check Google Analytics Dashboard:**
   - Go to [https://analytics.google.com/](https://analytics.google.com/)
   - Select your property
   - Go to **"Reports"** → **"Realtime"**
   - You should see active users and events (may take a few seconds)

---

### Part 6: Verify Events Are Tracking

#### PostHog Events to Check

In PostHog dashboard, filter by `$lib = posthog-js` and look for:

- ✅ `$pageview` - Page views
- ✅ `app_download_clicked` - Download button clicks
- ✅ `scroll_depth` - Scroll progress
- ✅ `feature_reaction` - Feature thumbs up
- ✅ `more_features_clicked` - More Features button
- ✅ `navigation_clicked` - Header navigation
- ✅ `social_link_clicked` - Social media clicks

#### Google Analytics Events to Check

In GA4 Realtime reports, look for:

- ✅ `page_view` - Page views
- ✅ `app_download_clicked` - Download clicks
- ✅ `scroll_depth` - Scroll progress
- ✅ `time_on_page` - Time tracking
- ✅ `drop_off` - Drop-off tracking

---

### Part 7: Production Deployment

When deploying to production:

1. **Add environment variables** to your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Other: Check your platform's docs

2. **Add this variable:**

   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. **PostHog is already configured** - no need to add PostHog key unless you want a different project

4. **Redeploy** your site

---

## 🎯 Quick Checklist

- [x] PostHog - Already configured! ✅
- [ ] Google Analytics account created
- [ ] GA4 property created
- [ ] GA4 Measurement ID copied
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` added to `.env.local`
- [ ] Development server restarted
- [ ] PostHog events visible in dashboard (filter by `$lib = posthog-js`)
- [ ] Google Analytics events visible in Realtime reports
- [ ] Environment variables added to production hosting platform

---

## 🐛 Troubleshooting

### PostHog Not Working

**PostHog should already be working!** If not:

1. Check browser console for errors
2. Check Network tab for PostHog requests
3. Verify PostHog is initialized (check console for `posthog.__loaded`)
4. Check PostHog dashboard - filter by `$lib = posthog-js` to see web events

**Common Issues:**

- ✅ PostHog is pre-configured - should work out of the box
- ❌ No events in PostHog → Check Network tab, verify API key is correct
- ❌ Events not appearing → Wait 1-2 minutes, check PostHog dashboard filters

### Google Analytics Not Working

**Check:**

1. Is `NEXT_PUBLIC_GA_MEASUREMENT_ID` set in `.env.local`?
2. Did you restart the dev server after adding it?
3. Check browser console for errors
4. Check Network tab for GA requests
5. Verify Measurement ID format (`G-XXXXXXXXXX`)

**Common Issues:**

- ❌ No GA script loading → Check `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set
- ❌ No events in GA → Check Network tab, verify Measurement ID
- ❌ Events not in Realtime → Wait a few seconds, check Realtime report

---

## 📚 Next Steps (Optional)

### Google Ads Conversion Tracking

1. **In Google Ads:**
   - Go to Tools & Settings → Conversions
   - Create conversion action
   - Choose "Website"
   - Copy conversion label

2. **In your code:**

   ```typescript
   import { trackConversion } from "@/lib/unified-tracking";

   // Track conversion when user downloads app
   trackConversion("AW-XXXXXXXXX/AbC-dEfGhIjKlMnOpQrStUvWxYz");
   ```

### Link Google Ads to Google Analytics

1. In Google Analytics: Admin → Property Settings → Google Ads Linking
2. Link your Google Ads account
3. This enables conversion import and better campaign tracking

---

## ✅ You're Done When:

- ✅ PostHog events appear in dashboard (filter by `$lib = posthog-js`)
- ✅ Google Analytics events appear in Realtime reports
- ✅ Both platforms tracking the same events
- ✅ No console errors
- ✅ Network requests visible in DevTools

---

## 📞 Need Help?

- **PostHog Docs:** [https://posthog.com/docs](https://posthog.com/docs)
- **Google Analytics Docs:** [https://developers.google.com/analytics](https://developers.google.com/analytics)
- **Check implementation:** See `docs/POSTHOG_SETUP.md` and `docs/GOOGLE_ANALYTICS_SETUP.md`

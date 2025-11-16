# Google Analytics 4 (GA4) Setup - Complete Guide

## 🎯 Overview

Google Analytics 4 is configured for **Google Ads integration** and additional analytics. All events tracked to PostHog are also tracked to Google Analytics for consistency.

**Purpose:**

- Google Ads conversion tracking
- Cross-reference analytics data
- Google Marketing Platform integration

---

## 📋 Step-by-Step Setup

### Step 1: Create Google Analytics Account

1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Sign in with your Google account
3. If you don't have an account, click **"Start measuring"**

### Step 2: Create GA4 Property

1. Click **"Admin"** (gear icon in bottom left)
2. In the **Property** column, click **"Create Property"**
3. Fill in:
   - **Property name**: `HandyPay Landing Page` (or similar)
   - **Reporting time zone**: Select your timezone
   - **Currency**: USD or JMD (your preference)
4. Click **"Next"**
5. Fill in business information (optional):
   - Industry category
   - Business size
6. Click **"Create"**
7. Accept terms if prompted

### Step 3: Create Web Data Stream

1. After creating property, you'll see **"Data Streams"**
2. Click **"Add stream"** → **"Web"**
3. Fill in:
   - **Website URL**: `https://tryhandypay.org` (or your actual domain)
   - **Stream name**: `HandyPay Landing Page`
4. Click **"Create stream"**

### Step 4: Get Measurement ID

1. After creating the stream, you'll see the stream details
2. Find **"Measurement ID"** (format: `G-XXXXXXXXXX`)
3. **Copy this ID** - you'll need it in the next step

**Example:** `G-ABC123XYZ`

### Step 5: Add Measurement ID to Environment Variables

1. **Create `.env.local` file** in your project root (if it doesn't exist)
2. **Add this line:**
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
3. **Replace `G-XXXXXXXXXX`** with your actual Measurement ID from Step 4

**Example:**

```env
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-ABC123XYZ
```

### Step 6: Restart Development Server

```bash
# Stop current server (Ctrl+C)
# Then restart:
pnpm dev
```

---

## ✅ Verification

### Quick Test

1. **Open your landing page**: `http://localhost:3000`
2. **Open DevTools** (F12)
3. **Go to Network tab**
4. **Filter for**: `google-analytics.com` or `googletagmanager.com`
5. **Perform actions**: Scroll, click buttons, navigate
6. **You should see**: Requests to Google Analytics

### Check Google Analytics Dashboard

1. Go to [https://analytics.google.com/](https://analytics.google.com/)
2. Select your property
3. Go to **"Reports"** → **"Realtime"**
4. **You should see**: Active users and events appearing in real-time

---

## 📊 What's Being Tracked

### Automatic Events

These are tracked automatically:

1. **`page_view`** - Page views on route changes
2. **`time_on_page`** - Time spent on each page
3. **`drop_off`** - Where users leave
4. **`scroll_depth`** - Scroll progress (25%, 50%, 75%, 100%)
5. **`email_link_clicked`** - Email link clicks
6. **`external_link_clicked`** - External link clicks

### Manual Events

These are tracked when users interact:

- **`app_download_clicked`** - Download button clicks
- **`app_download_redirected`** - App store redirects
- **`feature_reaction`** - Feature thumbs up/down
- **`more_features_clicked`** - More Features button
- **`navigation_clicked`** - Header navigation
- **`social_link_clicked`** - Social media links
- **`footer_link_clicked`** - Footer links
- **`logo_clicked`** - Logo clicks
- **`get_app_button_clicked`** - Header Get App button
- **`qr_code_shown`** - QR code display

### Event Properties

All events include:

- **Device info**: `device_type`, `os`, `browser`, `screen_width`, `screen_height`
- **UTM parameters**: `utm_source`, `utm_medium`, `utm_campaign`, etc.
- **Page info**: `page`, `page_path`

---

## 🎯 Google Ads Integration

### Step 1: Create Conversion Action in Google Ads

1. Go to [https://ads.google.com/](https://ads.google.com/)
2. Sign in to your Google Ads account
3. Click **"Tools & Settings"** (wrench icon)
4. Under **"Measurement"**, click **"Conversions"**
5. Click **"+"** to create new conversion
6. Select **"Website"**
7. Fill in:
   - **Category**: Choose (e.g., "Download", "Sign-up")
   - **Conversion name**: `App Download` (or similar)
   - **Value**: Set if you want to track value
   - **Count**: One or Every
8. Click **"Create and continue"**
9. **Copy the conversion label** (format: `AW-XXXXXXXXX/AbC-dEfGhIjKlMnOpQrStUvWxYz`)

### Step 2: Track Conversions in Code

When a user clicks download, track the conversion:

```typescript
import { trackConversion } from "@/lib/unified-tracking";

// In your download button handler
trackConversion("AW-XXXXXXXXX/AbC-dEfGhIjKlMnOpQrStUvWxYz");
```

**Example:** Add to download button click handlers:

```typescript
// Track conversion when user clicks download
trackConversion("AW-XXXXXXXXX/YOUR_CONVERSION_LABEL");
```

### Step 3: Link Google Ads to Google Analytics

1. **In Google Analytics:**
   - Admin → Property Settings → Google Ads Linking
   - Click **"Link"**
   - Select your Google Ads account
   - Click **"Next"** → **"Submit"**

2. **In Google Ads:**
   - Tools & Settings → Linked accounts → Google Analytics
   - Link your GA4 property

**Benefits:**

- Import GA4 conversions into Google Ads
- View GA4 data in Google Ads reports
- Optimize campaigns based on GA4 data

---

## 🔧 Configuration Options

### Environment Variables

Your `.env.local` file:

```env
# Required: Google Analytics Measurement ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Optional: Site URL for structured data
NEXT_PUBLIC_SITE_URL=https://tryhandypay.org
```

### Disable Google Analytics (Development)

If you want to disable GA in development, modify `components/providers/google-analytics-provider.tsx`:

```typescript
// Only load in production
if (process.env.NODE_ENV === "production" && measurementId) {
  // ... GA code
}
```

---

## 📈 Using Google Analytics Data

### View Events

1. Go to GA4 dashboard
2. **Reports** → **Engagement** → **Events**
3. See all tracked events

### Create Custom Reports

1. **Explore** → **Create new exploration**
2. Choose report type (Funnel, Path, etc.)
3. Add events and dimensions
4. Analyze user behavior

### Conversion Tracking

1. **Admin** → **Events**
2. Mark events as conversions (e.g., `app_download_clicked`)
3. These will appear in Google Ads

---

## 🧪 Testing Checklist

- [ ] Google Analytics account created
- [ ] GA4 property created
- [ ] Web data stream created
- [ ] Measurement ID copied
- [ ] `NEXT_PUBLIC_GA_MEASUREMENT_ID` added to `.env.local`
- [ ] Development server restarted
- [ ] GA script loads (check Network tab)
- [ ] Pageviews tracked in Realtime reports
- [ ] Events tracked in Realtime reports
- [ ] UTM parameters captured correctly
- [ ] Device information tracked correctly

---

## 🐛 Troubleshooting

### Google Analytics Not Loading

**Check:**

1. Is `NEXT_PUBLIC_GA_MEASUREMENT_ID` set in `.env.local`?
2. Did you restart the dev server after adding it?
3. Check browser console for errors
4. Check Network tab for `google-analytics.com` requests

**Common Issues:**

- ❌ **No script loading**: Check Measurement ID is set correctly
- ❌ **Script loads but no events**: Check `window.gtag` exists in console
- ❌ **Events not in Realtime**: Wait a few seconds, check Realtime report

### Events Not Appearing

1. **Check Network tab:**
   - Filter: `google-analytics.com`
   - Look for `/collect` or `/g/collect` requests
   - Should see requests when you interact with page

2. **Check GA4 DebugView:**
   - In GA4: Admin → DebugView
   - Enable debug mode
   - See events in real-time

3. **Verify Measurement ID:**
   - Format: `G-XXXXXXXXXX` (G- followed by 10 characters)
   - No spaces or extra characters

### Conversion Tracking Not Working

1. **Verify conversion label format:**
   - Format: `AW-XXXXXXXXX/AbC-dEfGhIjKlMnOpQrStUvWxYz`
   - Must match exactly from Google Ads

2. **Check conversion is set up:**
   - Google Ads → Conversions
   - Verify conversion action exists
   - Check conversion label is correct

3. **Test conversion:**
   - Use Google Ads conversion tracking tester
   - Or check GA4 → Admin → Conversions

---

## 📚 Resources

- [Google Analytics 4 Documentation](https://developers.google.com/analytics/devguides/collection/ga4)
- [Google Ads Conversion Tracking](https://support.google.com/google-ads/answer/1722054)
- [GA4 Event Tracking](https://developers.google.com/analytics/devguides/collection/ga4/events)
- [GA4 DebugView](https://support.google.com/analytics/answer/7201382)

---

## ✅ Quick Setup Summary

1. **Create GA4 property** → Get Measurement ID (`G-XXXXXXXXXX`)
2. **Add to `.env.local`**: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
3. **Restart server**: `pnpm dev`
4. **Test**: Check Network tab and GA4 Realtime reports
5. **Done!** ✅

---

## 🎯 Next Steps (Optional)

### Set Up Google Ads Conversions

1. Create conversion action in Google Ads
2. Get conversion label
3. Add `trackConversion()` calls to your code
4. Link Google Ads to Google Analytics

### Create Custom Dashboards

1. In GA4: Explore → Create new exploration
2. Build custom reports for:
   - Conversion funnels
   - User behavior
   - Traffic sources
   - Device breakdowns

---

## 💡 Pro Tips

1. **Use GA4 DebugView** for testing - see events in real-time
2. **Link Google Ads** for better campaign optimization
3. **Set up conversions** for key actions (downloads, signups)
4. **Create custom reports** for insights specific to your business
5. **Compare with PostHog** - cross-reference data for accuracy

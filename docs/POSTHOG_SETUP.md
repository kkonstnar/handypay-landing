# PostHog Landing Page Setup

## 🎯 Overview

This landing page uses the **same PostHog project** as the mobile app. PostHog automatically distinguishes web vs mobile events using the `$lib` property, so you can filter and analyze them separately while seeing the complete user journey in one place.

**PostHog Configuration:**

- **API Key**: `phc_n5IVXNCgQe9a2tT4VfPIeGDNdOgNT9NMBmPFZ5wkGLN` (same as mobile app)
- **Host**: `https://app.posthog.com`
- **Project**: Shared with mobile app

## ✅ Why Use the Same Project?

PostHog recommends using the same project because:

- ✅ **See complete user journey** - Landing page visit → download → app install → signup
- ✅ **Unified analytics** - All data in one dashboard
- ✅ **Easy filtering** - Use `$lib = posthog-js` for web, `$lib = posthog-react-native` for mobile
- ✅ **Simpler setup** - No need for separate projects
- ✅ **Better conversion tracking** - Track the full funnel in one place

## 📦 Installation

PostHog is already installed via `posthog-js`. If you need to reinstall:

```bash
pnpm add posthog-js
```

## 🔧 Configuration

### Default Setup (No Configuration Needed)

The landing page is pre-configured to use the mobile app's PostHog project. **No setup required** - it works out of the box!

### Optional: Override API Key

If you want to use a different PostHog project, create `.env.local`:

```env
NEXT_PUBLIC_POSTHOG_KEY=phc_YOUR_DIFFERENT_API_KEY
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Note:** This is optional. By default, it uses the mobile app's project.

### Privacy Settings

PostHog is configured with privacy-first settings:

- **Session Recording**: Enabled with all inputs and text masked
- **Autocapture**: Only enabled in production
- **Pageviews**: Tracked manually for better control

## 📊 Tracked Events

### Core Events

1. **`$pageview`** - Automatic pageview tracking on route changes
2. **`app_download_clicked`** - When user clicks download buttons
   - Properties: `platform` (ios/android), `source`, `device_type`
3. **`app_download_redirected`** - When user is redirected to app store
   - Properties: `platform`, `source`, `redirect_type`
4. **`feature_reaction`** - When user reacts to features (thumbs up)
   - Properties: `feature_id`, `action` (increment/decrement), `feature_name`
5. **`more_features_clicked`** - When user clicks "More Features" button
   - Properties: `section`
6. **`scroll_depth`** - User scroll progress
   - Properties: `depth` (25, 50, 75, 100), `page`
7. **`navigation_clicked`** - Header navigation clicks
   - Properties: `link`, `location`
8. **`social_link_clicked`** - Social media link clicks
   - Properties: `platform`, `location`
9. **`footer_link_clicked`** - Footer link clicks
   - Properties: `link`
10. **`logo_clicked`** - Logo clicks
    - Properties: `location`
11. **`get_app_button_clicked`** - Header "Get the app" button clicks
    - Properties: `location`, `device_type`
12. **`qr_code_shown`** - QR code displayed (desktop)
    - Properties: `source`, `platform`
13. **`time_on_page`** - Time spent on each page
14. **`drop_off`** - Drop-off point tracking
15. **`click_away`** - User leaving page
16. **`email_link_clicked`** - Email link clicks
17. **`external_link_clicked`** - External link clicks

## 🔍 Filtering Web vs Mobile Events

In PostHog, you can filter events by library type:

### View Only Web Events

- Filter: `$lib = posthog-js`
- Shows: Landing page events only

### View Only Mobile Events

- Filter: `$lib = posthog-react-native`
- Shows: Mobile app events only

### View Complete Journey

- No filter (or both)
- Shows: All events from web and mobile

## 📈 Key Metrics to Track

### Conversion Funnel

1. **Landing Page Visit** → `$pageview` (web)
2. **Download Button Click** → `app_download_clicked` (web)
3. **App Store Redirect** → `app_download_redirected` (web)
4. **App Install** → Tracked in mobile app
5. **App Signup** → Tracked in mobile app

### Engagement Metrics

- **Scroll Depth**: Percentage of users reaching 25%, 50%, 75%, 100%
- **Feature Engagement**: Which features get the most reactions
- **Navigation Patterns**: Which sections users visit most
- **Social Media Clicks**: Which platforms drive traffic

## 🧪 Testing

### Development Mode

In development, PostHog tracking is disabled by default. To test:

1. Set `NODE_ENV=production` temporarily
2. Or modify `lib/posthog.ts` to enable tracking in development

### Verify Events

1. Open your landing page
2. Open browser DevTools → Network tab
3. Filter for `posthog.com` or `app.posthog.com`
4. Perform actions (click download, scroll, etc.)
5. Verify events are being sent
6. Check PostHog dashboard (may take 1-2 minutes to appear)

### Testing Checklist

- [ ] Pageviews tracked on route changes
- [ ] Download button clicks tracked
- [ ] Feature reactions tracked
- [ ] Scroll depth tracked
- [ ] Navigation clicks tracked
- [ ] Social media clicks tracked
- [ ] Footer links tracked
- [ ] Events visible in PostHog dashboard
- [ ] Can filter by `$lib = posthog-js` to see only web events

## 🛠️ Implementation Details

### File Structure

```
lib/
  posthog.ts                    # PostHog initialization
components/
  providers/
    posthog-provider.tsx        # PostHog provider for Next.js App Router
app/
  layout.tsx                    # PostHogProvider wrapper
  page.tsx                      # Main page with event tracking
components/
  site-header.tsx               # Header with tracking
  site-footer.tsx               # Footer with tracking
  get-app-button.tsx            # App download button with tracking
```

### How It Works

1. **Initialization**: PostHog initialized in `PostHogProvider` component
2. **Pageviews**: Tracked automatically on route changes via `usePathname` and `useSearchParams`
3. **Events**: Tracked using `posthog.capture()` throughout the app
4. **Error Handling**: All tracking calls are wrapped in try-catch to prevent errors
5. **Library Tagging**: PostHog automatically tags all events with `$lib: "posthog-js"`

## 📱 Mobile App Integration

The mobile app tracks events with `$lib: "posthog-react-native"`. In PostHog:

- **Web events**: `$lib = posthog-js` (landing page)
- **Mobile events**: `$lib = posthog-react-native` (mobile app)

You can:

- See the complete user journey from web to mobile
- Track conversion rates (landing page → download → install → signup)
- Correlate web and mobile events
- Build unified funnels

## 🔒 Privacy & Compliance

- **Session Recording**: All inputs and text are masked
- **GDPR Compliance**: PostHog supports GDPR compliance features
- **Data Retention**: Configured in PostHog dashboard
- **User Consent**: Can be implemented using PostHog's opt-in/opt-out features

## 📚 Resources

- [PostHog JavaScript Docs](https://posthog.com/docs/libraries/js)
- [PostHog React Native Docs](https://posthog.com/docs/libraries/react-native)
- [PostHog Event Tracking Guide](https://posthog.com/docs/getting-started/send-events)
- [PostHog Session Recording](https://posthog.com/docs/session-replay)

## 🐛 Troubleshooting

### Events Not Appearing

1. Check browser console for errors
2. Verify PostHog is initialized (`posthog.__loaded`)
3. Check network tab for PostHog requests
4. Verify API key is correct (defaults to mobile app key)
5. Check PostHog dashboard filters

### Development vs Production

- **Development**: Tracking disabled by default (can be enabled)
- **Production**: Full tracking enabled

### Common Issues

- **PostHog not initialized**: Check `PostHogProvider` is wrapping the app
- **Events not firing**: Verify `posthog.__loaded` is true
- **Type errors**: Ensure `posthog-js` types are installed

### Filtering Events

To see only landing page events in PostHog:

1. Go to Events or Activity
2. Add filter: `$lib` equals `posthog-js`
3. This shows only web/landing page events

# Firebase Analytics Integration Guide

This guide explains how to use Firebase Analytics in your Roomyo application.

## Setup

The analytics integration is already set up in your application. The key components include:

1. **Firebase Configuration** (`lib/firebase.ts`) - Analytics is initialized here
2. **Analytics Utility** (`lib/analytics.ts`) - Contains helper functions for tracking events
3. **Analytics Tracker** (`components/AnalyticsTracker.tsx`) - Automatically tracks page views
4. **Environment Variables** (`.env.local`) - Contains your Firebase Measurement ID

## Automatic Page View Tracking

Page views are automatically tracked through the `AnalyticsTracker` component, which is included in your root layout. This tracks whenever a user navigates to a new page.

## Tracking Custom Events

You can track custom events using the utility functions from `lib/analytics.ts`:

### 1. Track a Page View (Manual)

```typescript
import { trackPageView } from '@/lib/analytics';

// Track a page view with the current path
trackPageView('/current-path', 'Page Title');
```

### 2. Track a Button Click

```typescript
import { trackClick } from '@/lib/analytics';

// In your component
const handleButtonClick = () => {
  trackClick('button', 'submit_button', {
    location: 'property_page',
    property_id: '12345'
  });
  
  // Continue with your button click logic
};
```

### 3. Track a Form Submission

```typescript
import { trackFormSubmit } from '@/lib/analytics';

// In your form submission handler
const handleSubmit = (e) => {
  e.preventDefault();
  
  trackFormSubmit('contact_form', {
    form_location: 'contact_page',
    submission_type: 'inquiry'
  });
  
  // Continue with your form submission logic
};
```

### 4. Track a Custom Event

```typescript
import { trackEvent } from '@/lib/analytics';

// Track any custom event
trackEvent('property_viewed', {
  property_id: '12345',
  property_type: 'apartment',
  price_range: '10000-15000',
  location: 'Bangalore'
});
```

## Example Implementation

See `components/AnalyticsExample.tsx` for example implementations of various tracking methods.

## Viewing Analytics Data

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (roomyo-in)
3. Click on "Analytics" in the left sidebar
4. You can view reports for:
   - User engagement
   - User demographics
   - Custom events
   - Conversion funnels
   - And more

## Best Practices

1. **Be Consistent with Event Names**: Use consistent naming conventions for events
2. **Don't Over-Track**: Focus on meaningful events that provide actionable insights
3. **Use Parameters Effectively**: Add relevant parameters to events for better analysis
4. **Monitor GDPR Compliance**: Ensure your analytics implementation complies with relevant privacy regulations

## Common Events to Track

- User registration/login
- Property searches
- Property views
- Booking initiations
- Booking completions
- Contact form submissions
- Filter usage
- Social sharing

## Debugging Analytics

To verify events are being sent correctly, you can use:

1. **DebugView in Firebase Console**: Enable debug mode for real-time event logging
2. **Firebase Analytics Debug Extension**: Chrome extension for monitoring analytics events
3. **Console Logging**: Add console logs alongside analytics events during development 
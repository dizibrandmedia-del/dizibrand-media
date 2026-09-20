export type AnalyticsEventType =
  | 'page_view'
  | 'service_view'
  | 'cta_click'
  | 'form_start'
  | 'form_submit'
  | 'whatsapp_click'
  | 'call_click'
  | 'book_call'
  | 'proposal_request'
  | 'digital_cmo_click'
  | 'digital_cto_click'
  | 'international_lead'
  | 'freelancer_application';

export interface AnalyticsEventPayload {
  eventName: AnalyticsEventType;
  url?: string;
  country?: string;
  metadata?: Record<string, any>;
}

export function trackEvent(payload: AnalyticsEventPayload) {
  if (typeof window === 'undefined') return;

  const eventData = {
    ...payload,
    url: payload.url || window.location.pathname,
    timestamp: new Date().toISOString(),
  };

  // 1. Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', eventData);
  }

  // 2. Dispatch to GA4 / GTM DataLayer if present
  if ((window as any).dataLayer) {
    (window as any).dataLayer.push({
      event: payload.eventName,
      ...payload.metadata,
    });
  }

  // 3. Optional beacon to /api/analytics
  try {
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        '/api/analytics',
        JSON.stringify(eventData)
      );
    }
  } catch (e) {
    // Fail silently without disrupting user experience
  }
}

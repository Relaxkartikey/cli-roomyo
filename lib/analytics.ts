import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

/**
 * Track a page view event
 * @param pagePath - The path of the page (e.g., '/home')
 * @param pageTitle - The title of the page
 */
export const trackPageView = (pagePath: string, pageTitle?: string) => {
  if (!analytics) return;
  
  logEvent(analytics, 'page_view', {
    page_path: pagePath,
    page_title: pageTitle || pagePath
  });
};

/**
 * Track a custom event
 * @param eventName - Name of the event
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (eventName: string, eventParams: Record<string, any> = {}) => {
  if (!analytics) return;
  
  logEvent(analytics, eventName, eventParams);
};

/**
 * Track when users click on specific elements
 * @param category - Category of the element (e.g., 'button', 'link')
 * @param label - Label for the element
 * @param properties - Additional properties to track
 */
export const trackClick = (category: string, label: string, properties: Record<string, any> = {}) => {
  if (!analytics) return;
  
  logEvent(analytics, 'click', {
    element_category: category,
    element_label: label,
    ...properties
  });
};

/**
 * Track form submissions
 * @param formName - Name of the form
 * @param properties - Additional properties to track
 */
export const trackFormSubmit = (formName: string, properties: Record<string, any> = {}) => {
  if (!analytics) return;
  
  logEvent(analytics, 'form_submit', {
    form_name: formName,
    ...properties
  });
}; 
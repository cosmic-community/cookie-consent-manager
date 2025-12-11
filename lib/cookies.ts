import { CookiePreferences, CookieCategory } from '@/types'

// Default cookie categories
export const cookieCategories: CookieCategory[] = [
  {
    id: 'essential',
    name: 'Essential Cookies',
    description: 'These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas. The website cannot function properly without these cookies.',
    required: true,
    enabled: true,
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website and user experience.',
    required: false,
    enabled: false,
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    description: 'These cookies are used to track visitors across websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third-party advertisers.',
    required: false,
    enabled: false,
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    description: 'These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.',
    required: false,
    enabled: false,
  },
]

// Save cookie preferences to localStorage
export function saveCookiePreferences(preferences: CookiePreferences): void {
  try {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
  } catch (error) {
    console.error('Error saving cookie preferences:', error)
  }
}

// Load cookie preferences from localStorage
export function loadCookiePreferences(): CookiePreferences | null {
  try {
    const stored = localStorage.getItem('cookiePreferences')
    return stored ? JSON.parse(stored) : null
  } catch (error) {
    console.error('Error loading cookie preferences:', error)
    return null
  }
}

// Check if user has made a cookie choice
export function hasUserMadeCookieChoice(): boolean {
  return localStorage.getItem('cookiePreferences') !== null
}

// Get default preferences (essential only)
export function getDefaultPreferences(): CookiePreferences {
  return {
    essential: true,
    analytics: false,
    marketing: false,
    functional: false,
    timestamp: new Date().toISOString(),
  }
}

// Accept all cookies
export function acceptAllCookies(): CookiePreferences {
  return {
    essential: true,
    analytics: true,
    marketing: true,
    functional: true,
    timestamp: new Date().toISOString(),
  }
}
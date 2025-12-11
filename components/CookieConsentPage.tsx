'use client'

import { useState, useEffect } from 'react'
import { CookiePreferences, CookieCategory } from '@/types'
import {
  cookieCategories,
  saveCookiePreferences,
  loadCookiePreferences,
  hasUserMadeCookieChoice,
  getDefaultPreferences,
  acceptAllCookies,
} from '@/lib/cookies'
import CookieToggle from '@/components/CookieToggle'

export default function CookieConsentPage() {
  const [preferences, setPreferences] = useState<CookiePreferences>(getDefaultPreferences())
  const [hasConsented, setHasConsented] = useState(true)
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already made a choice
    const hasMadeChoice = hasUserMadeCookieChoice()
    setHasConsented(hasMadeChoice)
    setShowBanner(!hasMadeChoice)

    // Load saved preferences if they exist
    const saved = loadCookiePreferences()
    if (saved) {
      setPreferences(saved)
    }
  }, [])

  const handleToggle = (categoryId: keyof CookiePreferences) => {
    // Don't allow disabling essential cookies
    if (categoryId === 'essential') return

    setPreferences((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }))
  }

  const handleSavePreferences = () => {
    const updatedPreferences = {
      ...preferences,
      timestamp: new Date().toISOString(),
    }
    saveCookiePreferences(updatedPreferences)
    setHasConsented(true)
    setShowBanner(false)
  }

  const handleAcceptAll = () => {
    const allAccepted = acceptAllCookies()
    setPreferences(allAccepted)
    saveCookiePreferences(allAccepted)
    setHasConsented(true)
    setShowBanner(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">🍪 Cookie Settings</h1>
          <p className="mt-2 text-gray-600">
            Manage your cookie preferences and understand how we use cookies
          </p>
        </div>
      </header>

      {/* Cookie Banner (shown if user hasn't consented) */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 animate-slide-up">
          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  We use cookies 🍪
                </h3>
                <p className="text-gray-600 text-sm">
                  We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                  By clicking "Accept All", you consent to our use of cookies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <button
                  onClick={handleSavePreferences}
                  className="btn-secondary whitespace-nowrap"
                >
                  Customize
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="btn-primary whitespace-nowrap"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Introduction Card */}
        <div className="card mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            About Cookies
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Cookies are small text files that are placed on your device to help the website provide 
            a better user experience. We use different types of cookies for various purposes, and you 
            have full control over which ones you want to enable.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Below, you can review each category of cookies and choose which ones you'd like to allow. 
            Essential cookies are always enabled as they're necessary for the website to function properly.
          </p>
        </div>

        {/* Cookie Categories */}
        <div className="space-y-4 mb-8">
          {cookieCategories.map((category) => (
            <CookieToggle
              key={category.id}
              category={category}
              enabled={preferences[category.id as keyof CookiePreferences]}
              onToggle={() => handleToggle(category.id as keyof CookiePreferences)}
            />
          ))}
        </div>

        {/* Save Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-end">
          <button
            onClick={() => setPreferences(getDefaultPreferences())}
            className="btn-secondary"
          >
            Reset to Default
          </button>
          <button
            onClick={handleSavePreferences}
            className="btn-primary"
          >
            Save Preferences
          </button>
        </div>

        {/* Status Message */}
        {hasConsented && (
          <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-800 text-sm">
              ✓ Your cookie preferences have been saved. Last updated: {new Date(preferences.timestamp).toLocaleDateString()}
            </p>
          </div>
        )}

        {/* Privacy Policy Link */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 text-sm">
            For more information, please read our{' '}
            <a href="#" className="text-primary hover:underline">
              Privacy Policy
            </a>
            {' '}and{' '}
            <a href="#" className="text-primary hover:underline">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
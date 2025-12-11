'use client'

import { CookieCategory } from '@/types'

interface CookieToggleProps {
  category: CookieCategory
  enabled: boolean
  onToggle: () => void
}

export default function CookieToggle({ category, enabled, onToggle }: CookieToggleProps) {
  return (
    <div className="card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {category.name}
            </h3>
            {category.required && (
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-600 rounded">
                Required
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Toggle Switch */}
        <button
          onClick={onToggle}
          disabled={category.required}
          className={`
            relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
            transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            ${enabled ? 'bg-primary' : 'bg-gray-200'}
            ${category.required ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          role="switch"
          aria-checked={enabled}
          aria-label={`Toggle ${category.name}`}
        >
          <span
            className={`
              pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
              transition duration-200 ease-in-out
              ${enabled ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </button>
      </div>
    </div>
  )
}
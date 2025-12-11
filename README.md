# Cookie Consent Manager

![App Preview](https://imgix.cosmicjs.com/efe2b2f0-d698-11f0-ad81-f101153797dd-photo-1494790108377-be9c29b29330-1765461259331.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, GDPR-compliant cookie consent management page built with Next.js 16 and Cosmic CMS. This application provides users with granular control over cookie preferences while maintaining compliance with privacy regulations.

## Features

- 🍪 **Granular Cookie Management** - Separate controls for essential, analytics, marketing, and functional cookies
- ✅ **GDPR Compliant** - Full transparency and user control over data collection
- 💾 **Persistent Preferences** - Cookie settings saved to localStorage
- 🎨 **Modern UI** - Beautiful, responsive design with smooth animations
- 📱 **Mobile Responsive** - Works seamlessly on all devices
- 🔒 **Privacy First** - Clear explanations of how each cookie category is used

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=693acc9529f51b74cc1f431c&clone_repository=693ace3529f51b74cc1f433f)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> "Quero fazer página de cukies pra um produto"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React** - UI components and state management

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account with bucket access

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching Cookie Policy Content

```typescript
import { cosmic } from '@/lib/cosmic'

// Fetch cookie policy content
export async function getCookiePolicy() {
  try {
    const response = await cosmic.objects
      .findOne({
        type: 'pages',
        slug: 'cookie-policy'
      })
      .props(['id', 'title', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    console.error('Error fetching cookie policy:', error)
    return null
  }
}
```

### Managing Cookie Preferences

```typescript
// Save user cookie preferences
export function saveCookiePreferences(preferences: CookiePreferences) {
  localStorage.setItem('cookiePreferences', JSON.stringify(preferences))
}

// Load user cookie preferences
export function loadCookiePreferences(): CookiePreferences | null {
  const stored = localStorage.getItem('cookiePreferences')
  return stored ? JSON.parse(stored) : null
}
```

## Cosmic CMS Integration

This application is designed to work with your existing Cosmic bucket structure. The cookie consent page can be extended to pull content from Cosmic CMS for:

- Cookie policy text and descriptions
- Category explanations
- Legal disclaimers
- Company information

To extend this application with dynamic content from Cosmic:

1. Create a new object type in Cosmic called "Cookie Policies"
2. Add metafields for each cookie category description
3. Update the application to fetch this content dynamically

## Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

1. Push your code to a Git repository
2. Import your repository to Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Environment Variables

Make sure to set these environment variables in your hosting platform:

- `COSMIC_BUCKET_SLUG` - Your Cosmic bucket slug
- `COSMIC_READ_KEY` - Your Cosmic read key
- `COSMIC_WRITE_KEY` - Your Cosmic write key

## Cookie Categories

- **Essential Cookies** - Required for basic site functionality (always enabled)
- **Analytics Cookies** - Help us understand how visitors use our site
- **Marketing Cookies** - Used to deliver relevant advertisements
- **Functional Cookies** - Enable enhanced functionality and personalization

## License

MIT License - feel free to use this project for your own products!

<!-- README_END -->
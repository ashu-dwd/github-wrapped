# GitHub Wrapped

![GitHub Wrapped](https://img.shields.io/badge/version-0.1.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![License](https://img.shields.io/badge/license-private-red.svg)

A modern, interactive GitHub Wrapped experience that visualizes your annual GitHub journey with stunning animations and AI-powered insights.

## Features

- **Yearly Statistics**: View your total commits, PRs, issues, stars, and more
- **Language Breakdown**: See your most-used programming languages with visual breakdowns
- **Productivity Insights**: Track your most productive days, months, and streaks
- **AI Summary**: Get personalized insights about your coding journey (powered by Gemini AI)
- **Collaboration Metrics**: View your team contributions and impact
- **Repository Highlights**: Discover your top repositories by stars, commits, and contributors
- **Milestones & Badges**: Celebrate your achievements with milestone tracking
- **Growth Analysis**: Track your follower and repository growth over time
- **Interactive Cards**: Beautiful, animated cards that you can navigate through
- **Download & Share**: Export your wrapped cards as images to share with others
- **Responsive Design**: Fully responsive with touch/swipe support for mobile devices
- **Dark Mode**: Sleek dark theme with stunning animated backgrounds

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion** - Smooth animations
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization
- **Lucide React** - Beautiful icons

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **GitHub REST API** - Fetch user data and statistics
- **Gemini AI** - AI-powered summaries (Google's AI)

### Utilities
- **Axios** - HTTP client
- **html2canvas** - Image generation for card exports
- **date-fns** - Date manipulation
- **Sonner** - Toast notifications
- **Zod** - Schema validation

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A GitHub account
- A Gemini API key from [Google AI Studio](https://makersuite.google.com/)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd github-wrapped
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Gemini API key to `.env.local`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Running the Application

Development mode:
```bash
bun run dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Production build:
```bash
bun run build
bun run start
```

## Usage

1. **Enter Username**: On the home page, enter your GitHub username
2. **Generate Wrapped**: Click the "Generate My Wrapped" button
3. **Explore Cards**: Navigate through your personalized cards using:
   - Arrow buttons
   - Keyboard arrow keys (←/→)
   - Touch swipe on mobile
   - Progress dots at the bottom
4. **Download Cards**: On the final share card, click "Download All Cards" to save as images

## Project Structure

```
github-wrapped/
├── public/                 # Static assets (SVG icons)
├── src/
│   ├── app/               # Next.js app directory
│   │   ├── api/          # API routes
│   │   │   └── github/   # GitHub API endpoints
│   │   │       ├── analyze/route.ts  # Main analysis endpoint
│   │   │       └── route.ts         # GitHub proxy endpoint
│   │   ├── github-wrapped/         # Wrapped page
│   │   │   └── page.tsx
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home page
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── ui/           # Radix UI components
│   │   └── wrapped/      # Wrapped card components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   │   ├── axios.ts      # Axios configuration
│   │   ├── card-export.ts # Card export logic
│   │   ├── gemini.ts     # Gemini AI integration
│   │   ├── github-stats.ts # GitHub data processing
│   │   ├── prompts.ts    # AI prompt templates
│   │   └── utils.ts      # General utilities
│   └── types/            # TypeScript type definitions
│       └── github-wrapped.ts
├── .env.example          # Environment variables template
├── next.config.ts        # Next.js configuration
├── package.json          # Dependencies and scripts
└── tsconfig.json         # TypeScript configuration
```

## API Endpoints

### `GET /api/github/analyze?username={username}`

Analyzes a GitHub user's activity and generates wrapped data.

**Response:**
```typescript
{
  success: boolean;
  data?: {
    user: GitHubUser;
    stats: YearStats;
    languages: LanguageBreakdown[];
    productivity: ProductivityData;
    repositories: RepoHighlight[];
    aiSummary: string;
    year: number;
  };
  error?: string;
}
```

## Card Components

| Card | Description |
|------|-------------|
| **IntroCard** | Welcome message with user profile |
| **StatsCard** | Yearly statistics overview |
| **LanguagesCard** | Programming language breakdown |
| **ProductivityCard** | Productivity insights and patterns |
| **AISummaryCard** | AI-powered yearly summary |
| **ContributionsCard** | Contribution activity visualization |
| **RepositoriesCard** | Top repositories highlights |
| **CollaborationCard** | Collaboration metrics |
| **MilestonesCard** | Achievement milestones |
| **GrowthCard** | Follower and repo growth |
| **ShareCard** | Download and share options |

## Customization

### Adding New Cards

1. Create a new component in `src/components/wrapped/`
2. Import and add to the cards array in `src/app/github-wrapped/page.tsx`
3. Update `totalCards` count

### Styling

The project uses Tailwind CSS. Modify:
- `src/app/globals.css` for global styles
- Component files for specific styling
- `tailwind.config.ts` for theme customization

### API Rate Limits

GitHub API has rate limits. For production use, consider:
- Using GitHub Authentication with tokens
- Implementing caching
- Adding rate limit handling

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GEMINI_API_KEY` | Google Gemini AI API key | Yes |

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run lint` | Run ESLint |

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is private.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- GitHub for the public API
- Google for Gemini AI
- Vercel for Next.js
- Radix UI for component primitives
- Lucide for beautiful icons
- Framer Motion for smooth animations

## Support

For issues or questions, please open an issue on GitHub.

# Strimy

A modern streaming platform interface built with Next.js, featuring movies and TV series browsing, search functionality, and personal watchlist management.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: SCSS with CSS Modules
- **Testing**: Jest + React Testing Library
- **API**: TMDB API
- **State Management**: React Hooks
- **Type Safety**: TypeScript

## Project Structure

```
app/
├── (pages)/                # Page routes
│   ├── page.tsx           # Home page
│   ├── explore/           # Search and explore page
│   ├── movie/[id]/        # Movie detail page
│   ├── tv/[id]/           # TV series detail page
│   └── watchlist/         # Watchlist page
├── api/                    # API routes
│   ├── search/            # Search API endpoints
│   └── watchlist/         # Watchlist API endpoints
├── common/                # Shared components and utilities
│   ├── components/        # Reusable UI components
│   │   ├── Carousel/      # Carousel component
│   │   ├── MediaCard/     # Media card component
│   │   └── layouts/       # Layout components
│   ├── lib/               # Utility functions
│   │   ├── api-client.ts  # API client utility
│   │   ├── utils.ts       # Common utilities
│   │   └── watchlist.ts   # Watchlist management
│   └── types/             # Shared TypeScript types
└── features/              # Feature-based modules
    ├── home/              # Home page features
    ├── explore/           # Search and explore features
    ├── movie/             # Movie-related features
    ├── tv/                # TV series features
    └── watchlist/         # Watchlist management
```

## System Design

### Architecture

The application follows a feature-based architecture with the following key principles:

1. **Feature Isolation**: Each feature (home, explore, movie, tv, watchlist) is self-contained with its own:
   - Components
   - Services
   - Types
   - Styles
   - Tests

2. **Common Layer**: Shared functionality is organized in the common directory:
   - Reusable UI components
   - Utility functions
   - Type definitions
   - API client

3. **API Layer**: 
   - Server-side API routes in `app/api`
   - Client-side API services in feature directories
   - Centralized API client for TMDB integration

### Utility Patterns

#### Data Transformation Pipeline

The application uses a functional programming pattern with the `pipe` function to create clean and composable data transformations, especially in API services. Here's how it works in the TV series service:

```typescript
// Example from app/features/tv/services/tv.ts
export const getTVSeriesDetail = pipe(
  async (id: string) => await apiClient(`/tv/${id}`),
  getEpisodesBySeasons,
  transformTVSeriesDetail
);
```

This creates a pipeline that:
1. Fetches the base TV series data
2. Enriches it with episode data
3. Transforms the response into our application model

The pipe function enables:
- Clean composition of async operations
- Separation of concerns
- Readable data transformation flow
- Maintainable and testable code

Example flow:
```
Input: TV Series ID
↓
Step 1: Fetch base data from TMDB API
↓
Step 2: Fetch episodes for each season
↓
Step 3: Transform data to application model
↓
Output: TVSeriesDetail
```

Each step in the pipeline:
```typescript
// 1. Initial API call
(id: string) => await apiClient(`/tv/${id}`)

// 2. Enrich with episodes
const getEpisodesBySeasons = async (response: TVSeriesDetailResponse) => {
  const batch = response.seasons.map((season) =>
    getEpisodes(response.id, season.season_number)
  );
  const seasons = await Promise.all(batch);
  return { ...response, seasons };
}

// 3. Transform to application model
const transformTVSeriesDetail = (data: TVSeriesDetailResponse): TVSeriesDetail => ({
  id: data.id,
  title: data.name,
  // ... transform other fields
});
```

This pattern is used throughout the application for handling API responses and data transformations in a clean and maintainable way.


### State Management

1. **Local State**:
   - React hooks for component-level state
   - Context for theme management
   - URL state for navigation

2. **Persistence**:
   - Local storage for watchlist
   - Server-side caching for API responses

### Component Design

1. **Core Components**:
   - `MediaCard`: Reusable card for movies/TV shows
   - `Carousel`: Horizontal scrolling list
   - `SearchBar`: Debounced search input
   - `ActionButton`: Watchlist management

2. **Layout Components**:
   - `SideBar`: Navigation sidebar
   - `Banner`: Hero section
   - `Grid`: Responsive grid layout

### Data Flow

1. **API Integration**:
   ```
   Client Request → Next.js API Route → TMDB API → Response Transform → Client
   ```

2. **Watchlist Flow**:
   ```
   User Action → Local Storage Update → UI Update
   ```

3. **Search Flow**:
   ```
   User Input → Debounce → API Request → Results Transform → UI Update
   ```

### Testing Strategy

1. **Unit Tests**:
   - Component testing with React Testing Library
   - Utility function testing
   - Mock API responses

2. **Integration Tests**:
   - Feature-level testing
   - API route testing
   - State management testing

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
yarn install
```

3. Set up environment variables:
```env
ACCESS_TOKEN=your_tmdb_access_token
BASE_URL=https://api.themoviedb.org/3
IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

4. Run development server:
```bash
yarn dev
```

5. Run tests:
```bash
yarn test
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


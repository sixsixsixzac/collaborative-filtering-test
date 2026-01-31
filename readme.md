## Database Schema

```mermaid
erDiagram
    USERS ||--o{ RATINGS : "rates"
    MOVIES ||--o{ RATINGS : "receives"
    CATEGORIES ||--o{ MOVIES : "contains"

    USERS {
        string id PK "UUID"
        string name "User display name"
    }

    MOVIES {
        number id PK "Movie ID"
        string title "Movie title"
        string image "Thumbnail path"
        string releaseDate "Release date"
        string category "Genre category"
    }

    RATINGS {
        number id PK "Rating ID"
        string userId FK "References USERS.id"
        number movieId FK "References MOVIES.id"
        number rating "1-5 star rating"
    }

    CATEGORIES {
        string name PK "Category name"
        array movies "Array of movie objects"
    }
```

## Installation
1. bun install
2. bun dev
3. Open http://localhost:3000

## API
- `POST /api/movies`
- `GET /api/users`
- `POST /api/movies/[movieId]/rate`

## Tech Stack
- **Database**: JSON files as mockup database
- **State Management**: Zustand
- **UI Framework**: Shadcn/ui + Tailwind CSS

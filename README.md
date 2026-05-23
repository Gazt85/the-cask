# The Casket

## Tech Stack

### MVP (current)

| Layer              | Technology                                 |
| ------------------ | ------------------------------------------ |
| Frontend + API     | Next.js 16, App Router, TypeScript         |
| Styling            | Tailwind CSS 4, shadcn/ui                  |
| Backend as Service | Supabase (PostgreSQL, Auth, Storage)       |
| Deployment         | Vercel (frontend) + Supabase Cloud         |

### Post-MVP (when it scales)

- Replace the Supabase API layer with a custom **ASP.NET Core (.NET 8)** backend.
- Keep **PostgreSQL** — Supabase already uses Postgres, no migration needed.
- Keep **Next.js frontend unchanged** — just reroute API calls through the service layer.

## Getting Started

```bash
# 1. Clone & install
npm install

# 2. Set up environment variables
cp .env.local.example .env.local
# Then fill in your Supabase URL and anon key

# 3. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/                         # Next.js App Router
│   ├── (auth)/                  # Auth pages (login, signup)
│   ├── (dashboard)/             # Protected pages (dashboard, settings)
│   ├── auth/callback/           # Supabase OAuth callback
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Landing page
├── components/
│   ├── auth/                    # Auth components
│   ├── layout/                  # Navbar, etc.
│   └── ui/                      # shadcn/ui components
├── hooks/
│   └── use-auth.ts              # Auth hook
├── lib/
│   ├── supabase/                # Supabase client config
│   │   ├── client.ts            # Browser client
│   │   ├── server.ts            # Server Component client
│   │   └── middleware.ts        # Session refresh middleware
│   └── utils.ts                 # shadcn utility (cn)
├── services/                    # ⭐ Service abstraction layer
│   ├── types.ts                 # Service interfaces (AuthService, etc.)
│   ├── index.ts                 # Factory — swap implementations here
│   └── impl/
│       └── supabase/            # Supabase implementations
│           ├── auth.ts
│           ├── profile.ts
│           └── storage.ts
├── types/
│   └── index.ts                 # Domain types
└── middleware.ts                 # Next.js middleware (auth guard)
```

## Architecture: Service Abstraction Layer

The key architectural decision is the **service abstraction layer** in `src/services/`.

All data access goes through TypeScript interfaces (`AuthService`, `ProfileService`, `StorageService`).
The MVP uses Supabase implementations. When you scale to .NET:

1. Create `src/services/impl/dotnet/auth.ts` (calls your ASP.NET Core REST API)
2. Update the factory in `src/services/index.ts` to return the new implementations
3. The rest of the app stays untouched

```
┌─────────────────────────┐
│  React Components       │
│  (pages, hooks, etc.)   │
└────────┬────────────────┘
         │ uses
         ▼
┌─────────────────────────┐
│  Service Interfaces     │  ← contract
│  (AuthService, etc.)    │
└────────┬────────────────┘
         │ implemented by
         ▼
┌─────────────────────────┐     ┌─────────────────────────┐
│  Supabase Impl (MVP)    │ OR  │  .NET API Impl (later)  │
└─────────────────────────┘     └─────────────────────────┘
```

## .NET Migration Checklist

When you're ready to introduce ASP.NET Core:

- [ ] Create a new .NET 8 Web API project
- [ ] Point it at the same Supabase PostgreSQL database (connection string from Supabase dashboard)
- [ ] Implement REST endpoints matching the service interfaces
- [ ] Create `src/services/impl/dotnet/` with fetch-based implementations
- [ ] Swap the factory in `src/services/index.ts`
- [ ] No React component changes needed

## Available Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start dev server         |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

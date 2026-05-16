# mona-souvenir

A modern web application to explore museum artworks, save favorites, and build personal collections using public museum APIs such as the Louvre collections API.

## Features

- [ ] Search artworks
- [ ] Artwork detail pages
- [ ] User authentication
- [ ] Persistent favorites
- [ ] Responsive gallery UI
- [ ] Search filters

## Tech Stack

| Layer                 | Selected Technology                       | Alternatives                   | Why This Choice                                                        |
| --------------------- | ----------------------------------------- | ------------------------------ | ---------------------------------------------------------------------- |
| Frontend Framework    | [Next.js](https://nextjs.org)             | Remix, Nuxt, SvelteKit         | Full-stack React ecosystem, routing, middleware, deployment simplicity |
| Backend Communication | [tRPC](https://trpc.io)                   | REST, GraphQL                  | End-to-end TypeScript safety and simpler frontend/backend integration  |
| Database              | [PostgreSQL](https://www.postgresql.org/) | MySQL, MongoDB                 | Reliable relational database for user data and favorites               |
| ORM                   | [Drizzle](https://orm.drizzle.team)       | Prisma, TypeORM                | Lightweight, SQL-oriented, excellent TypeScript support                |
| Authentication        | [Better Auth](https://better-auth.com/)   | Auth.js, Clerk                 | Modern self-hosted authentication with flexible architecture           |
| UI Components         | [Kumo](https://kumo-ui.com/)              | shadcn/ui, MUI, Ant Design     | Modern composable React components without copy-paste architecture     |
| Styling               | [Tailwind CSS](https://tailwindcss.com)   | Styled Components, CSS Modules | Fast UI development and consistent design system                       |

## Architecture

```mmd
flowchart TD
    %% Actor Definitions
    Frontend["Frontend\nNext.js + Kumo UI"]
    BackendAPI["Backend API\ntRPC"]
    DrizzleORM["Drizzle ORM"]
    LouvreAPI["Louvre API\nMuseum APIs"]
    PostgreSQL["PostgreSQL"]

    %% Relation Definitions
    Frontend -->|tRPC| BackendAPI
    BackendAPI --> DrizzleORM
    BackendAPI --> LouvreAPI
    DrizzleORM --> PostgreSQL
```

## Run Locally

1. Install a container manager (eg. `docker` or `podman`).
2. Run :

```bash
git clone https://github.com/Naedri/mona-souvenir.git
cd mona-souvenir
cp .env.example .env
docker compose up
```

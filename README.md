# Leo-tube

Leo-tube is a full-stack Youtube-style video platform built with **Next.js**, 
**Clerk auth**, **Mux Video processing**, **UploadingThing file storage**, 
**Drizzle orm + PostgresSQL**, **Gemini api**, **tRPC apis** and **Upstash workflow**

https://leo-tube.vercel.app/

## Features
- Authentication services provided by clerk
  - Sign-in and Sign-up
  - Third-part login supported
- Video
  - Video search
  - Upload videos
  - Upload thumbnails
  - Generate AI thumbnails through gemini(AI workflow)
  - Watch videos
  - Views management
  - Likes management
  - Comment to videos
  - Replies management
  - Video details update
  - Generate AI title and descriptions through gemeini(AI workflow)
  - Video deletion
- Playlist Management
- User profile page
- Trending videos
- History Management
- Subscribe feature

## Requirement

- Framework: Next.js App Router (v15.1.9).
- Language: TypeScript.
- UI: Tailwind CSS + Radix UI components.
- API layer: tRPC with typed client-server contracts.
- Database: Postgres with Drizzle ORM.
- Authentication: Clerk.
- Video pipeline: Mux for upload/asset processing/playback.
- File uploads: UploadThing.
- Background workflows and rate limiting: Upstash Workflow + Redis.


## Installation
```bash
npm install
```

## Scripts

- `bun run dev` — start Next.js dev server — start webhook tunnel command
- `bun run dev:all` — run app + webhook tunnel concurrently
- `bun run build` — production build
- `bun run debug` — debugging project
- `bun run lint` — run lint checks

## License

[MIT](https://choosealicense.com/licenses/mit/)
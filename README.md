# PIXORATE AI

PIXORATE AI turns an uploaded image into ready-to-use content for social media and the web. Upload an image, choose a platform, content type, tone and language, and Google Gemini writes the result: captions, hashtags, blog posts, SEO copy, video scripts, summaries, translations and rewrites. Results are saved to a per-user history.

| Layer | Technology |
| --- | --- |
| Frontend | React 19, Vite, Tailwind CSS 4, React Router, Framer Motion |
| Backend | Node.js 20+, Express 5, Mongoose |
| Database | MongoDB |
| AI | Google Gemini (`@google/genai`) with image input |
| Auth | JWT (7 days), bcrypt password hashes |

## Features

- Email and password accounts, with a Profile page (name, photo) and a Settings page (theme, generation defaults, password change, clear history, delete account).
- 8 content types x 8 platforms x 10 tones x 5 languages, validated on both sides.
- Copy, download (.txt) and regenerate any result. History with filters, details, delete and clear.
- The original image is never stored. Only a 160 px preview is kept with each history item.
- Light and dark themes in a black, orange and off-white palette. The choice is saved to your account.

## Run it locally

You need Node.js 20 or newer, a MongoDB instance (local or Atlas) and a Gemini API key from Google AI Studio.

```bash
# 1. Backend
cd backend
cp .env.example .env        # then edit .env: MONGO_URI, JWT_SECRET, GEMINI_API_KEY
npm install
npm run dev                 # http://localhost:5000

# 2. Frontend (second terminal)
cd frontend
cp .env.example .env        # VITE_API_URL=http://localhost:5000/api
npm install
npm run dev                 # http://localhost:5173
```

### Backend environment variables

| Variable | Required | Notes |
| --- | --- | --- |
| `MONGO_URI` | yes | MongoDB connection string |
| `JWT_SECRET` | yes | 32+ random characters. Keep it private. |
| `GEMINI_API_KEY` | yes | Never commit it. Rotate it if it is ever shared. |
| `GEMINI_MODEL` | no | Default `gemini-3.8-flash` |
| `GEMINI_FALLBACK_MODEL` | no | Default `gemini-3.5-flash-lite`. Used if the main model is unavailable or rate limited. |
| `CLIENT_URL` | no | Comma-separated allowed origins. Default `http://localhost:5173` |
| `PORT` | no | Default `5000` |
| `AUTH_RATE_LIMIT`, `GENERATE_RATE_LIMIT` | no | Requests per window. Defaults 30 per 15 min (auth), 20 per 10 min per user (generate). |

> Gemini 2.5 models were retired for new keys in October 2026. If generation fails with "model not found", set `GEMINI_MODEL` to a current model from the [Gemini models page](https://ai.google.dev/gemini-api/docs/models).

## Tests

```bash
cd backend  && npm test     # 20 tests: prompts (all 640 combinations), API, auth, errors, Gemini fallback
cd frontend && npm test     # 18 tests: login, dashboard, history, profile, settings
cd frontend && npm run lint && npm run build
```

The tests mock MongoDB and Gemini, so they run offline and cost nothing.

## Project structure

```
backend/
  server.js, app.js            entry point and Express app
  config/                      env check, MongoDB, Gemini client, option lists
  controllers/ routes/         auth, user, history, generate
  middleware/                  auth, upload, validation, rate limit, errors
  models/                      User, GeneratedContent
  prompts/                     system prompt, platform + tone text, one builder per content type
  services/                    prompt assembly, Gemini calls, result normalising
  tests/
frontend/
  src/pages/                   Home, Login, Register, Dashboard, History, Profile, Settings
  src/components/              common, layout, dashboard, selectors, cards, home, auth
  src/context/                 Auth, Theme, Dashboard state
  src/services/                API calls (Axios)
  src/constants/ src/utils/    option lists, image and text helpers
docs/CHANGELOG.md              what changed and why
```

## API quick reference

All routes are under `/api`. Routes marked 🔒 need `Authorization: Bearer <token>`. Errors are always `{ "success": false, "message": "..." }`.

| Method | Route | Purpose |
| --- | --- | --- |
| GET | `/health` | Health check |
| GET | `/options` | Platforms, tones, languages, content types, themes |
| POST | `/auth/register` | `{ name, email, password }` |
| POST | `/auth/login` | `{ email, password }` |
| GET 🔒 | `/user/profile` | Profile and usage stats |
| PUT 🔒 | `/user/profile` | `{ name?, avatar? }` |
| PUT 🔒 | `/user/preferences` | `{ theme?, defaultPlatform?, defaultTone?, defaultLanguage?, defaultContentType? }` |
| PUT 🔒 | `/user/password` | `{ currentPassword, newPassword }` |
| DELETE 🔒 | `/user/account` | `{ password }`. Deletes the account and its history. |
| POST 🔒 | `/generate` | multipart: `image`, `platform`, `tone`, `language`, `contentType`, optional `thumbnail` |
| GET 🔒 | `/history` | `?page=&limit=&contentType=` |
| DELETE 🔒 | `/history/:id` | Delete one item |
| DELETE 🔒 | `/history` | Clear all |

## Security notes

Passwords are hashed with bcrypt. Login errors never reveal whether an email exists. Uploads are checked by file signature, not just the declared type, and are kept in memory only. Login and generation are rate limited. Helmet and a CORS allow-list are enabled. Never commit `backend/.env`.

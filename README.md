# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Create a `.env` file:
```.env
# https://openai.com/api/
NUXT_OPENAI_API_KEY=
# https://platform.openai.com/docs/models/gpt-3
NUXT_OPENAI_MODEL=
# GCP Service Account for Storage, Firestore & Cloud Vision API
NUXT_GOOGLE_APPLICATION_CREDENTIALS_JSON=
```

Make sure to install the dependencies:

```bash
# pnpm
pnpm install
```

## Development Server

Start the development server on http://localhost:3000

```bash
pnpm run dev
```

## Production

Build the application for production:

```bash
pnpm run build
```

Locally preview production build:

```bash
pnpm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

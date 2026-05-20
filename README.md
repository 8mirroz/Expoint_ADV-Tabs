<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# БУКВА СВЕТ — Run and deploy your AI Studio app

## Knowledge Base (NotebookLM)

- **Notebook**: [Expoint 2026](https://notebooklm.google.com/notebook/4fd5af82-f621-427b-b371-128da2ed85a6)
  - ID: `4fd5af82-f621-427b-b371-128da2ed85a6`
  - Status: **Connected**
  - Scope: 19 Research artifacts (Market Map, Competitive Intelligence, AI Integration, etc.)

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/5cb867c9-622c-4594-b1c1-e5f0e1a4a1fd

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

The local working mode for this project is fixed port `3000`.
Use `http://localhost:3000` for development, debugging, preview, and change verification.

## Telegram Knowledge Bot

The repo now includes a Telegram webhook endpoint at `/api/telegram/webhook`.
It accepts plain-text Telegram messages, forwards them into the current knowledge runtime, and returns the answer back into the same chat.

Required env:

- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_WEBHOOK_SECRET` recommended for webhook validation
- `NBLLM_RUNTIME_DISABLED=false` if knowledge replies should stay enabled

Webhook registration example:

`curl -X POST "https://api.telegram.org/bot$TELEGRAM_BOT_TOKEN/setWebhook" -H "Content-Type: application/json" -d '{"url":"https://YOUR_DOMAIN/api/telegram/webhook","secret_token":"'"$TELEGRAM_WEBHOOK_SECRET"'"}'`

Quick live check after deploy:

1. Send `/start` to the bot in Telegram.
2. Send a plain text question like `Сколько стоит акриловая вывеска?`
3. Verify the bot responds with a knowledge-based answer.

## Docker

Docker is supported for both local runs and VPS deploys, but the commands are intentionally different.

### Local run

`docker-compose.override.yml` is local-only. It publishes the app on `http://localhost:3005` and should not be used for VPS deploys.

1. Build and run the local stack:
   `docker compose up -d --build`
2. If `3005` is busy, use a custom host port:
   `APP_PORT=3010 docker compose up -d --build`
3. Check the local health endpoint:
   `curl -fsS http://localhost:3005/api/health`

### Production deploy

**Prerequisites:** Docker Engine + Docker Compose plugin

1. Fill `.env.production` before the first deploy:
   - `DOMAIN`
   - `ACME_EMAIL`
   - app runtime secrets and integrations: `TELEGRAM_*`, `SMTP_*`, `CRM_WEBHOOK_URL`, `GEMINI_API_KEY`, `NEXT_PUBLIC_GA_ID`, `ADMIN_API_KEY`, `LOG_INGRESS_SECRET`, `TURNSTILE_*`, `ENABLE_STRICT_HTTPS`, `ENABLE_HSTS`, `NBLLM_RUNTIME_DISABLED`
2. Start the production stack without the local override file:
   `docker compose -f docker-compose.yml --profile prod up -d --build`
3. Check service status:
   `docker compose -f docker-compose.yml --profile prod ps`
4. Check the public app health endpoint:
   `curl -fsS https://$DOMAIN/api/health`
5. Tail logs:
   `docker compose -f docker-compose.yml --profile prod logs -f web proxy`

### Update / Redeploy

- Rebuild and restart:
  `docker compose -f docker-compose.yml --profile prod up -d --build`
- Clean old unused images:
  `docker image prune -f`

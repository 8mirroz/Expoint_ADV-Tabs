<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

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

## Docker: Optional Local / Staging (without TLS)

Docker is not part of the default day-to-day workflow for this project.
Use it only when you explicitly need a containerized run or deploy-like environment.

`docker-compose.override.yml` enables direct app access on `http://localhost:3005` and hides `proxy` unless `prod` profile is enabled.

1. Build and run local shape:
   `docker compose up -d --build`

If `3005` is busy, run with custom host port:
`APP_PORT=3010 docker compose up -d --build`
2. Health check:
   `curl -fsS http://localhost:3005/api/health`

## Docker Deploy (VPS, with TLS)

**Prerequisites:** Docker Engine + Docker Compose plugin

1. Fill `.env.production`:
   - `DOMAIN` (your real domain)
   - `ACME_EMAIL` (email for TLS cert registration)
   - app integration envs (`TELEGRAM_*`, `SMTP_*`, `CRM_WEBHOOK_URL`, `GEMINI_API_KEY`)
2. Start with prod profile (enables Caddy proxy):
   `docker compose --profile prod up -d --build`
3. Check service health:
   `docker compose ps`
4. Check app health endpoint:
   `curl -fsS https://$DOMAIN/api/health`
5. Tail logs:
   `docker compose logs -f web proxy`

### Update / Redeploy

- Rebuild and restart:
  `docker compose --profile prod up -d --build`
- Clean old unused images:
  `docker image prune -f`

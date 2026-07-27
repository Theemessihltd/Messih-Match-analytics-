# Messih Match Analytics - GitHub App

A GitHub App integration for Messih Match Analytics that enables AI-powered repository analysis and insights.

## Features

- 🔗 GitHub OAuth authentication
- 📊 Repository analysis and AI insights
- 🎯 Webhook support for GitHub events
- ⚡ Serverless deployment ready
- 🔐 Secure credential management

## Setup

### 1. Create a GitHub App

1. Go to GitHub Settings → Developer settings → GitHub Apps
2. Click "New GitHub App"
3. Fill in the following:
   - **App name**: `Messih Match Analytics`
   - **Homepage URL**: `https://messih-match-analytics.vercel.app`
   - **Webhook URL**: `https://your-vercel-app.vercel.app/api/webhooks/github`
   - **Webhook secret**: Generate a random string
   - **Permissions**:
     - Repository: Read access to code, issues, commits
     - Account: Read access to account data

4. Generate a private key and note your App ID

### 2. Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```bash
GITHUB_APP_ID=your_app_id
GITHUB_APP_PRIVATE_KEY=your_private_key
GITHUB_APP_CLIENT_ID=your_client_id
GITHUB_APP_CLIENT_SECRET=your_client_secret
GITHUB_WEBHOOK_SECRET=your_webhook_secret
```

### 3. Local Development

```bash
cd features/ai/github-app
npm install
npm run dev
```

The server will run on `http://localhost:3000`

### 4. Deploy to Vercel

```bash
vercel
```

Add environment variables in Vercel dashboard:
- Go to Settings → Environment Variables
- Add all variables from `.env.example`

## API Endpoints

### Health Check
```bash
GET /api/health
```

Response:
```json
{
  "status": "GitHub App is running"
}
```

### Analyze Repository
```bash
POST /api/analyze
Content-Type: application/json

{
  "owner": "repository_owner",
  "repo": "repository_name",
  "installationId": "installation_id"
}
```

Response:
```json
{
  "repository": {
    "name": "repo-name",
    "description": "repo-description",
    "url": "https://github.com/owner/repo",
    "stars": 100,
    "forks": 20,
    "openIssues": 5
  },
  "recentActivity": {
    "commits": 50,
    "latestCommit": "Latest commit message",
    "issues": 10
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### OAuth Callback
```bash
GET /api/auth/callback?code=auth_code&state=state
```

Response:
```json
{
  "success": true,
  "message": "GitHub App authorized successfully",
  "token": "github_token"
}
```

### Webhook
```bash
POST /api/webhooks/github
X-GitHub-Event: push
X-GitHub-Delivery: delivery-id
X-Hub-Signature-256: sha256=signature
Content-Type: application/json

{"payload": "..."}
```

## Project Structure

```
features/ai/github-app/
├── api/
│   └── github-app.js          # Main server and API handlers
├── package.json               # Dependencies and scripts
├── vercel.json               # Vercel deployment config
├── .env.example              # Environment variables template
└── README.md                 # This file
```

## Deployment Checklist

- [ ] Create GitHub App in GitHub Settings
- [ ] Generate and store private key safely
- [ ] Set up all environment variables
- [ ] Test locally with `npm run dev`
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Configure Vercel environment variables
- [ ] Update webhook URL in GitHub App settings
- [ ] Test webhook delivery
- [ ] Monitor logs in Vercel dashboard

## Troubleshooting

### Webhook verification failed
- Verify `GITHUB_WEBHOOK_SECRET` matches GitHub App settings
- Check X-Hub-Signature-256 header format

### OAuth authentication failed
- Verify client ID and secret are correct
- Check redirect URI matches GitHub App settings

### Repository analysis returns empty
- Ensure installation ID is correct
- Check GitHub App has proper permissions
- Verify token hasn't expired

## Security

- Never commit `.env` files
- Rotate private keys regularly
- Use Vercel secrets for sensitive data
- Enable webhook signature verification
- Restrict app permissions to minimum needed

## Documentation

- [Octokit App Documentation](https://github.com/octokit/app.js)
- [GitHub Apps API](https://docs.github.com/en/developers/apps)
- [Vercel Deployment Guide](https://vercel.com/docs)

## License

MIT

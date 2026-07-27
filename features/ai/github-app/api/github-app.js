const express = require('express');
const { App } = require('@octokit/app');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Initialize GitHub App
const githubApp = new App({
  appId: process.env.GITHUB_APP_ID,
  privateKey: process.env.GITHUB_APP_PRIVATE_KEY,
  oauth: {
    clientId: process.env.GITHUB_APP_CLIENT_ID,
    clientSecret: process.env.GITHUB_APP_CLIENT_SECRET,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'GitHub App is running' });
});

// Webhook endpoint for GitHub events
app.post('/api/webhooks/github', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    await githubApp.webhooks.verifyAndReceive({
      id: req.headers['x-github-delivery'] || '',
      name: req.headers['x-github-event'] || '',
      signature: req.headers['x-hub-signature-256'] || '',
      payload: req.body,
    });
    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Webhook verification failed:', error);
    res.status(400).json({ error: 'Invalid webhook' });
  }
});

// Analyze repository endpoint
app.post('/api/analyze', async (req, res) => {
  try {
    const { owner, repo, installationId } = req.body;

    if (!owner || !repo || !installationId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const octokit = await githubApp.getInstallationOctokit(installationId);

    // Fetch repository data
    const { data: repoData } = await octokit.rest.repos.get({
      owner,
      repo,
    });

    // Fetch recent commits
    const { data: commits } = await octokit.rest.repos.listCommits({
      owner,
      repo,
      per_page: 10,
    });

    // Fetch issues
    const { data: issues } = await octokit.rest.issues.listForRepo({
      owner,
      repo,
      per_page: 10,
    });

    const analysis = {
      repository: {
        name: repoData.name,
        description: repoData.description,
        url: repoData.html_url,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        openIssues: repoData.open_issues_count,
      },
      recentActivity: {
        commits: commits.length,
        latestCommit: commits[0]?.commit.message || 'N/A',
        issues: issues.length,
      },
      timestamp: new Date().toISOString(),
    };

    res.json(analysis);
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze repository' });
  }
});

// OAuth callback endpoint
app.get('/api/auth/callback', async (req, res) => {
  try {
    const { code, state } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Missing authorization code' });
    }

    // Exchange code for tokens
    const { token } = await githubApp.oauth.getToken({
      code,
      state,
    });

    res.json({
      success: true,
      message: 'GitHub App authorized successfully',
      token: token,
    });
  } catch (error) {
    console.error('OAuth error:', error);
    res.status(500).json({ error: 'OAuth authentication failed' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`GitHub App server running on port ${PORT}`);
});

module.exports = app;

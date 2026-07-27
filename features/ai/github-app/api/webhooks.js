// Webhook handlers for different GitHub events

const handlePushEvent = async (payload, octokit) => {
  console.log(`Push event received in ${payload.repository.full_name}`);
  return {
    event: 'push',
    repository: payload.repository.full_name,
    branch: payload.ref,
    commits: payload.commits.length,
    timestamp: new Date().toISOString(),
  };
};

const handlePullRequestEvent = async (payload, octokit) => {
  console.log(`Pull request ${payload.action} in ${payload.repository.full_name}`);
  return {
    event: 'pull_request',
    repository: payload.repository.full_name,
    action: payload.action,
    pr_number: payload.pull_request.number,
    title: payload.pull_request.title,
    timestamp: new Date().toISOString(),
  };
};

const handleIssuesEvent = async (payload, octokit) => {
  console.log(`Issue ${payload.action} in ${payload.repository.full_name}`);
  return {
    event: 'issues',
    repository: payload.repository.full_name,
    action: payload.action,
    issue_number: payload.issue.number,
    title: payload.issue.title,
    timestamp: new Date().toISOString(),
  };
};

const handleReleaseEvent = async (payload, octokit) => {
  console.log(`Release ${payload.action} in ${payload.repository.full_name}`);
  return {
    event: 'release',
    repository: payload.repository.full_name,
    action: payload.action,
    tag: payload.release.tag_name,
    timestamp: new Date().toISOString(),
  };
};

module.exports = {
  handlePushEvent,
  handlePullRequestEvent,
  handleIssuesEvent,
  handleReleaseEvent,
};

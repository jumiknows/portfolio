# Connect and publish with GitHub

## Connect the correct account to ChatGPT or Codex

1. Open ChatGPT **Settings**.
2. Open **Apps**, **Apps & Connectors**, or **Plugins**, depending on the label shown in your account.
3. Select **GitHub** and disconnect the existing account.
4. In your browser, sign out of any GitHub account you do not want to use. Sign in to the account that owns the portfolio repository.
5. Return to the GitHub connection in ChatGPT and select **Connect**.
6. On GitHub, install or authorize the ChatGPT GitHub App for the correct account.
7. Choose **Only select repositories** and select `portfolio`, or grant access to all repositories if that is genuinely what you want.
8. Return to ChatGPT and ask it to identify the connected GitHub login and list the repositories it can access.

You can review or change repository access later from GitHub **Settings > Applications > Installed GitHub Apps** and from ChatGPT **Settings > Apps > GitHub**.

## Publish this project with GitHub Desktop

1. Install and open GitHub Desktop.
2. Sign in to the GitHub account that owns the repository.
3. Select **File > Clone repository** and clone the existing `portfolio` repository.
4. Extract the project ZIP.
5. Copy the extracted contents into the cloned repository folder. Copy the contents themselves, not the enclosing ZIP folder.
6. In GitHub Desktop, review the changed files.
7. Enter a summary such as `Publish engineering portfolio`, then select **Commit to main**.
8. Select **Push origin**.
9. On GitHub, open the repository and go to **Settings > Pages**.
10. Under **Build and deployment**, choose **GitHub Actions** if it is not already selected.

The included workflow builds and publishes the site whenever `main` is updated.

## Run it locally

Install Node.js 22 or newer, then run:

```bash
npm install
npm run dev
```

Before publishing, verify the production build:

```bash
npm run build
```

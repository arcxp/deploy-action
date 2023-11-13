# Arc XP Deploy Action

This action deploys a project to Arc XP using your Arc XP credentials.

## Description

**NOTE:** This action requires that you have an active Arc XP account. If you do not have an Arc XP account, or you have any questions, please contact your Arc XP representative.

This action deploys a Fusion Bundle to Arc XP using your Arc XP credentials. It will deploy the project to the Arc XP instance that matches the `api-hostname` input. If the project has not been deployed before, it will create an initial deployment. If the project has been deployed before, it will create a new deployment and delete the oldest deployment if the number of deployments exceeds the `minimum-running-versions` input.

## Prerequisites

You must have a Fusion Bundle that has been built and is ready to be deployed. You must also have an Arc XP organization ID, API key, and API hostname.

## Security

This action requires that you have an Arc XP account. It will use your Arc XP API key to authenticate with Arc XP. The API key is stored as a secret in your GitHub repository. The API key is used to authenticate with Arc XP and is not shared with anyone else.

## Usage

```yaml
      - name: Perform the deploy
        if: ${{ success() }}
        uses: arcxp/deploy-action@v1
        with:
          org-id: your-org-here
          api-key: "${{ secrets.YOUR_DEPLOYER_TOKEN_HERE }}"
          api-hostname: api.sandbox.your-org-here.arcpublishing.com
          bundle-prefix: action-demo-1
```

## Inputs

### `org-id`

**Required** The Arc XP organization ID.

### `api-key`

**Required** Your Arc XP API key.

### `api-hostname`

**Required** The host name for your Arc XP instances.

### `bundle-prefix`

The prefix for the bundle name, which is used to identify the bundle in the Arc XP UI.

### `retry-count`

The number of times to retry the deployment if there's a recoverable error. Default `10`.

### `retry-delay`

The number of seconds to wait between retries. Default `5`.

### `minimum-running-versions`

The minimum number of versions to keep in a "deployed" state at any given time. The maximum is 10, the minimum is 1. Default `7`.

## Example

Here's a complete example from a GitHub Action workflow file. This example first builds and zips the Fusion Bundle, and then uses this custom action to deploy to the "Sandbox" environment in the `arctesting2` instance of Arc XP.

```yaml
---
name: Deploy a Fusion Bundle with Custom Action

on:
  push:
    # Adjust this list of branches if you want to use this action
    # for PRs and pushes.
    branches:
      - branch-name-here
  # This action lets you run this Action manually.
  workflow_dispatch:

jobs:
  new-deployer:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the code
        if: ${{ success() }}
        uses: actions/checkout@v3

      # This configures NodeJS for our purposes.
      - name: Set up Node
        if: ${{ success() }}
        uses: actions/setup-node@v3
        with:
          #### IF YOU NEED TO CHANGE YOUR NODE VERSION, JUST CHANGE THIS NUMBER
          node-version: 20
          cache: npm

      # Installs NodeJS dependencies.
      - name: Install dependencies
        if: ${{ success() }}
        run: |
          npm install

      # Build the code.
      - name: Build the Fusion Bundle
        if: ${{ success() }}
        run: |
          npm run build
          npm run zip

      - name: Perform the deploy
        if: ${{ success() }}
        uses: arcxp/deploy-action@v1
        with:
          org-id: your-org-here
          api-key: "${{ secrets.SANDBOX_DEPLOYER_TOKEN }}"
          api-hostname: api.sandbox.your-org-here.arcpublishing.com
          bundle-prefix: bundle-prefix-here
```

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

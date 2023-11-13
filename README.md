# Arc XP Deploy Action

This action deploys a project to Arc XP using your Arc XP credentials.

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

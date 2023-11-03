# Arc XP Deploy Action

This action deploys a project to Arc XP using your Arc XP credentials.

## Inputs

### `org-id`

**Required** The Arc XP organization ID.

### `api-key`

**Required** Your Arc XP API key.

### `api-hostname`

**Required** The host name for your Arc XP instances.

### `product`

**Optional** The product to deploy. Presently, `fusion` is the only supported product. Default `"fusion"`.

### `bundle-prefix`

**Optional** The prefix for the bundle name. Default `"bundle"`.

### `retry-count`

**Optional** The number of times to retry the deployment if there's a recoverable error. Default `10`.

### `retry-delay`

**Optional** The number of seconds to wait between retries. Default `5`.

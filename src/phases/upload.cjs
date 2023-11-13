const { basename } = require('node:path')
const { verifyArtifact } = require('../validation')
// const stream = require('node:stream')
const { readFileSync } = require('node:fs')

/**
 * Upload an artifact to Arc XP
 * @argument {Object} args - Arguments to this function are sent as an object.
 * @argument {Object} args.core - The `core` instance from `@actions/core`
 * @argument {string} args.artifact - The relative path and filename of the artifact to be uploaded.
 * @argument {Object} args.client - The `@actions/http-client` instance.
 * @argument {string} args.apiHostname - The hostname to use for the API call.
 * @returns {Promise<boolean>} This function returns a promise which resolves to a boolean indicating success or failure.
 * @function
 **/
const uploadArtifact = async ({
  core,
  artifact,
  bundleName,
  apiHostname,
  apiKey,
}) => {
  await verifyArtifact({ core, artifact })

  // Shift to Fetch API!
  try {
    const url = `https://${apiHostname}/deployments/fusion/bundles`
    const formData = new FormData()
    formData.append('name', bundleName)
    formData.append('bundle', new Blob([readFileSync(artifact)]), {
      contentType: 'application/zip',
      name: 'bundle',
      filename: basename(artifact),
    })
    core.debug(`Making call to upload ${artifact} to ${url}`)
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
      },
    })

    if (!response.ok) {
      core.setFailed(responseText)
    }

    const responseText = await response.text()
    core.debug(`Response for upload call: ${responseText}`)
    return bundleName
  } catch (error) {
    console.error('Failed!', error)
    return core.setFailed(error.message)
  }
}

module.exports = {
  uploadArtifact,
}

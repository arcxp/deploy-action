const terminateOldestVersion = async (
  { core, client, apiHostname },
  oldestVersion,
) => {
  try {
    if (!oldestVersion) {
      core.setFailed('Unable to detect the oldest version')
    }

    const url = `https://${apiHostname}/deployments/fusion/services/${oldestVersion}/terminate`
    return await client.post(url)
  } catch (err) {
    core.setFailed(err.message)
  }
}

module.exports = { terminateOldestVersion }

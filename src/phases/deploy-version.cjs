const deployLatestVersion = async ({
  core,
  client,
  apiHostname,
  bundleName,
}) => {
  try {
    const url = `https://${apiHostname}/deployments/fusion/services?bundle=${encodeURI(
      bundleName,
    )}&version=latest`
    return await client.post(url)
  } catch (err) {
    core.setFailed(err.message)
  }
}

module.exports = { deployLatestVersion }

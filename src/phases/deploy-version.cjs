const deployLatestVersion = async ({
  core,
  client,
  apiHostname,
  bundleName,
  pagebuilderVersion,
}) => {
  try {
    const url = `https://${apiHostname}/deployments/fusion/services?bundle=${encodeURI(
      bundleName,
    )}&version=${pagebuilderVersion ?? 'latest'}`
    return await client.post(url)
  } catch (err) {
    core.setFailed(err.message)
  }
}

module.exports = { deployLatestVersion }

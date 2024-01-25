const promoteNewVersion = async ({
  core,
  client,
  apiHostname,
  newestVersion: versionToPromote,
}) => {
  try {
    if (!versionToPromote) {
      core.setFailed('Unable to detect the new version')
    }

    const url = `https://${apiHostname}/deployments/fusion/services/${versionToPromote}/promote`
    return await client.post(url)
  } catch (err) {
    core.setFailed(err.message)
  }
}

module.exports = { promoteNewVersion }

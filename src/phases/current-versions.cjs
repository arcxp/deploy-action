const getCurrentVersions = async ({ core, client, apiHostname }) => {
  try {
    const url = `https://${apiHostname}/deployments/fusion/services`
    const response = await client.get(url)

    const { lambdas } = JSON.parse(await response.readBody())

    return lambdas.map(({ Version }) => parseInt(Version)).sort()
  } catch (error) {
    core.setFailed(error.message)
  }
}

module.exports = {
  getCurrentVersions,
}

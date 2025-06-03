const getCurrentVersions = async ({ core, client, apiHostname }) => {
  let responseBody = undefined

  try {
    const url = `https://${apiHostname}/deployments/fusion/services`
    const response = await client.get(url)

    responseBody = await response.readBody()
    const { lambdas } = JSON.parse(responseBody)

    return lambdas.map(({ Version }) => parseInt(Version)).sort((a,b)=> a - b)
  } catch (error) {
    if (error.name === 'SyntaxError') {
      return core.setFailed(`Unexpected response from server: ${responseBody}`)
    }
    return core.setFailed(error.message)
  }
}

module.exports = {
  getCurrentVersions,
}

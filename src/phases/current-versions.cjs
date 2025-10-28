const getCurrentVersions = async ({ core, client, apiHostname }) => {
  let responseBody = undefined
  let responseBodyLive = undefined

  try {
    const url = `https://${apiHostname}/deployments/fusion/services`
    const response = await client.get(url)

    responseBody = await response.readBody()
    const { lambdas } = JSON.parse(responseBody)

    // remove live-bundle from available versions
    const urlLive = `https://${apiHostname}/deployments/fusion/live`
    const responseLive = await client.get(urlLive)

    responseBodyLive = await responseLive.readBody()
    const { liveId } = JSON.parse(responseBodyLive)

    const onDeckLambdas = lambdas.filter((service) => service.Version !== liveId)

    return onDeckLambdas.map(({ Version }) => parseInt(Version)).sort((a,b)=> a - b)
  } catch (error) {
    if (error.name === 'SyntaxError') {
      return core.setFailed(`Unexpected response from server: ${responseBody} / ${responseBodyLive}`)
    }
    return core.setFailed(error.message)
  }
}

module.exports = {
  getCurrentVersions,
}

const process = require('node:process')
const { existsSync } = require('node:fs')

const verifyArtifact = async ({ core, artifact }) => {
  if (!artifact.match(/^[a-z0-9_./ -]+?\.zip$/i)) {
    return core.setFailed(
      `File ${artifact} is not a valid artifact. It must be a ZIP file.`,
    )
  }
  // Let's check to make sure that the artifact file exists
  if (!existsSync(artifact)) {
    return core.setFailed(`Could not find artifact «${artifact}»`)
  }
}

const verifyArcHost = ({ core, apiHostname }) =>
  apiHostname.match(/^[a-z0-9_.-]+?\.arcpublishing\.(com)$/i)
    ? true
    : core.setFailed(`Host name '${apiHostname}' is not valid.`) &&
      process.exit(-1)

const verifyMinimumRunningVersions = ({ core, minimumRunningVersions }) =>
  minimumRunningVersions >= 1 && minimumRunningVersions <= 10
    ? true
    : core.setFailed(
        `Minimum running versions '${minimumRunningVersions}' is not valid. Must be between 1 and 10.`,
      )

const verifyPageBuilderVersion = ({ core, pagebuilderVersion }) =>
  pagebuilderVersion?.match(/^(latest|[a-zA-Z0-9.-]+)$/)
    ? true
    : core.setFailed(`PageBuilder version ${pagebuilderVersion} is not valid.`)

module.exports = {
  verifyArtifact,
  verifyArcHost,
  verifyMinimumRunningVersions,
  verifyPageBuilderVersion,
}

const { existsSync } = require('node:fs')

const verifyArtifact = async ({ core, artifact }) => {
  if (!artifact.match(/^[a-z0-9_.\/ -]+?\.zip/i)) {
    return core.setFailed(`File `)
  }
  // Let's check to make sure that the artifact file exists
  if (!existsSync(artifact)) {
    return core.setFailed(`Could not find artifact «${artifact}»`)
  }
}

const verifyArcHost = ({core, hostname}) => hostname.match(/^[a-z0-9_.-]+?\.arcpublishing\.net$/i) ? true : core.setFailed(`Host name '${hostname}' is not valid.`)

module.exports = {
  verifyArtifact,
  verifyArcHost,
}
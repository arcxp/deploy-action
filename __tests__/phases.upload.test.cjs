const fs = require('node:fs/promises')
const { describe, expect, test } = require('@jest/globals')
const core = require('@actions/core')

const { uploadArtifact } = require('../src/phases/upload')

const dummyClient = {
  post: async () => {
    return Promise.resolve({
      json: async () => {
        return fs.readFile('./__tests__/sample-data/versions.json', 'utf-8')
      },
    })
  },
}

describe('upload.js', () => {
  test.skip('should upload', async () => {
    const runContext = {
      context: {
        sha: '7f7574fc',
        head_ref: 'main',
      },
      client: dummyClient,
      core,
      apiHostname: 'api.sandbox.arctesting2.arcpublishing.com',
      artifact: './__tests__/sample-data/sample.zip',
    }
    const response = await uploadArtifact(runContext)
    expect(core.setFailed).not.toHaveBeenCalled()
    console.log(response)
  })
})

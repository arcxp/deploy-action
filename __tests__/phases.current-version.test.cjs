const fs = require('node:fs/promises')
const { describe, expect, test } = require('@jest/globals')
const core = require('@actions/core')

const { getCurrentVersions } = require('../src/phases/current-versions')

const client = {
  get: async () => {
    return Promise.resolve({
      readBody: async () => {
        return fs.readFile('./__tests__/sample-data/versions.json', 'utf-8')
      },
    })
  },
}

describe('current-version.js', () => {
  test('should return the current version', async () => {
    const runContext = {
      client,
      core,
      apiHostname: 'api.sandbox.arctesting2.arcpublishing.com',
    }
    const response = await getCurrentVersions(runContext)
    expect(response).toMatchSnapshot()
    expect(response).toHaveLength(2)
    expect(parseInt(response[1])).toBeGreaterThan(parseInt(response[0]))
  })
})

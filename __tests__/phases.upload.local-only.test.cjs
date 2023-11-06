/**
 * This test is for testing against actual services.
 * You probably don't want to run this test, it's for development
 * purposes only.
 * @private
 **/

const core = require('@actions/core')
const { HttpClient } = require('@actions/http-client')

const { env } = require('node:process')
const { describe, expect, test } = require('@jest/globals')

const getRunContext = () => ({
  context: {
    sha: '7f7574fc',
    ref_name: 'main',
  },
  orgId: core.getInput('org-id'),
  apiKey: core.getInput('api-key'),
  apiHostname: core.getInput('api-hostname'),
  bundlePrefix: core.getInput('bundle-prefix'),
  artifact: core.getInput('artifact'),
  retryCount: core.getInput('retry-count'),
  retryDelay: core.getInput('retry-delay'),
  client: new HttpClient('nodejs - GitHub Actions - arcxp/deploy-action', [], {
    headers: { Authorization: `Bearer ${core.getInput('api-key')}` },
  }),
  core,
})

const { uploadArtifact } = require('../src/phases/upload')

const describeLocally = !!env?.TESTING_LOCALLY?.length
  ? describe
  : describe.skip

describeLocally('upload.js', () => {
  test('should actually upload', async () => {
    // Let's set up our environment
    const contextOverrides = {
      'api-hostname': 'api.sandbox.arctesting2.arcpublishing.com',
      artifact: './__tests__/sample-data/real-bundle.zip',
      'api-key': env?.ARC_ACCESS_TOKEN,
      'bundle-prefix': 'gha-upload-test-only',
      'org-id': env?.ARC_ORG_ID,
      'retry-count': 3,
      'retry-delay': 3,
    }
    core.__setInputsObject(contextOverrides)

    const runContext = getRunContext()

    const response = await uploadArtifact(runContext)
    expect(core.setFailed).not.toHaveBeenCalled()
  })
})

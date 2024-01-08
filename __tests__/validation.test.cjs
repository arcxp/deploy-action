const core = require('@actions/core')
const validation = require('../src/validation')

describe('validation', () => {
  afterEach(() => {
    core.setFailed.mockClear()
  })

  // This test is _not_ async.
  test('should fail for files which do not exist', () => {
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyArtifact({
      core,
      artifact: './__tests__/sample-data/sample.zip',
    })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyArtifact({
      core,
      artifact: './__tests__/validation.test.cjs',
    })
    expect(core.setFailed).toHaveBeenCalledTimes(1)
    validation.verifyArtifact({ core, artifact: 'missing-file' })
    expect(core.setFailed).toHaveBeenCalledTimes(2)
  })

  test('should fail if an invalid host is supplied', () => {
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyArcHost({
      core,
      apiHostname: 'fakesubdomain.arcpublishing.com',
    })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyArcHost({
      core,
      apiHostname: 'fake-subdomain.arcpublishing.com',
    })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyArcHost({
      core,
      apiHostname: 'fake.subdomain.arcpublishing.com',
    })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyArcHost({
      core,
      apiHostname: 'fakesubdomain.fhdjksahfklj.net',
    })
    expect(core.setFailed).toHaveBeenCalledTimes(1)
    validation.verifyArcHost({
      core,
      apiHostname: 'arcpublishing.net.malicious-site.com',
    })
    expect(core.setFailed).toHaveBeenCalledTimes(2)
    validation.verifyArcHost({
      core,
      apiHostname: 'malicious-site.com/naughty/arcpublishing.net',
    })
    expect(core.setFailed).toHaveBeenCalledTimes(3)
  })

  test('should validate pagebuilder version', () => {
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyPageBuilderVersion({ core, pagebuilderVersion: 'latest' })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyPageBuilderVersion({ core, pagebuilderVersion: '1.2.3' })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyPageBuilderVersion({
      core,
      pagebuilderVersion: '2021.12.31',
    })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyPageBuilderVersion({
      core,
      pagebuilderVersion: '2021-12-31',
    })
    expect(core.setFailed).not.toHaveBeenCalled()
    validation.verifyPageBuilderVersion({
      core,
      pagebuilderVersion: 'console.log("foo")',
    })
    expect(core.setFailed).toHaveBeenCalledTimes(1)
  })
})

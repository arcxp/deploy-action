# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog],
and this project adheres to [Semantic Versioning].

## [1.1.6] - 2025-10-29

This change prevents the attempted delete of the live bundle, if it is the oldest.

### Changed

- Dependencies updated
- Remove live deployment from deployment selection

## [1.1.5] - 2025-07-23

This is quick dependency update and bug fix release.

### Changed

- Dependencies updated

### Fixed

- Fixed [#44](https://github.com/arcxp/deploy-action/issues/44), broken retry logic when current version calls fail.

## [1.1.4] - 2025-05-21

This is a maintenance release, only bug fixes and dependencies were updated.

### Changed

- Fixed a sorting bug that was causing builds to fail.

## [1.1.3] - 2024-04-12

This is a maintenance release, only dependencies were updated.

## [1.1.2] - 2024-02-15

### Changed

- Added better debug capabilities for unexpected server responses.

## [1.1.1] - 2024-01-25

### Added

- You can now specify `deploy` and `promote` flags as `true` or `false`. Doing so will allow you to control whether the action deploys and/or promotes your bundle.

### Changed

- Updated dependencies

## [1.1.0] - 2024-01-08

### Added

- You can now specify which version of PageBuilder you wish to deploy with using the `pagebuilder-version` input.

### Changed

- Updated dependencies

## [1.0.1] - 2023-11-13

### Changed

- Fixed documentation typos.

## [1.0.0] - 2023-11-13

### Added

- Everything, really. This is the initial version, and it works.

### To do

- Tests. Lots of tests.

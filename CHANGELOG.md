## [1.13.5](https://github.com/pilosa-group/pilosa-api/compare/v1.13.4...v1.13.5) (2024-12-21)


### Bug Fixes

* disable crons ([74abc83](https://github.com/pilosa-group/pilosa-api/commit/74abc8375642e51e8221433f31e28f4ec0c0c081))

## [1.13.4](https://github.com/pilosa-group/pilosa-api/compare/v1.13.3...v1.13.4) (2024-10-13)


### Bug Fixes

* add rejectUnauthorized ([4ea59a7](https://github.com/pilosa-group/pilosa-api/commit/4ea59a73f9ca41e67c90a286995a63459ddaf446))

## [1.13.3](https://github.com/pilosa-group/pilosa-api/compare/v1.13.2...v1.13.3) (2024-07-08)


### Bug Fixes

* **sloth:** fix ios 16.x unsupported PerformanceResourceTiming entries ([#25](https://github.com/pilosa-group/pilosa-api/issues/25)) ([b327644](https://github.com/pilosa-group/pilosa-api/commit/b327644db7305ab4de1e63f0b234f74a8ac29164))

## [1.13.2](https://github.com/pilosa-group/pilosa-api/compare/v1.13.1...v1.13.2) (2024-07-07)


### Bug Fixes

* **sloth:** cast to number earlier ([#24](https://github.com/pilosa-group/pilosa-api/issues/24)) ([558da72](https://github.com/pilosa-group/pilosa-api/commit/558da72d56e6108d14e298d5591ab16d910a3e8b))

## [1.13.1](https://github.com/pilosa-group/pilosa-api/compare/v1.13.0...v1.13.1) (2024-07-05)


### Bug Fixes

* **sloth:** check if decoded and encoded size are a number ([85b6c7f](https://github.com/pilosa-group/pilosa-api/commit/85b6c7f185e5c8d7a818966568995982f987c474))

# [1.13.0](https://github.com/pilosa-group/pilosa-api/compare/v1.12.0...v1.13.0) (2024-07-05)


### Features

* make sloth smaller and increase beacon debounce time to 2s ([7d13386](https://github.com/pilosa-group/pilosa-api/commit/7d1338629dde1226d0a4f4e2fa59509da3c1c362))

# [1.12.0](https://github.com/pilosa-group/pilosa-api/compare/v1.11.0...v1.12.0) (2024-07-05)


### Bug Fixes

* remove entity decorators ([5eea37e](https://github.com/pilosa-group/pilosa-api/commit/5eea37e5232e1fb131284e4c6c9f68e530885561))


### Features

* add transformer service ([5c9ba80](https://github.com/pilosa-group/pilosa-api/commit/5c9ba800e5873a5f34f47a9b6d02de368482a3cf))
* added more openapi documentation + return dto instead of entities for in paginators ([2f607c1](https://github.com/pilosa-group/pilosa-api/commit/2f607c152a16e929c7aef73126bcc01628b4af75))
* cleanup (duplicate) code and add some extra dto validations ([42304d4](https://github.com/pilosa-group/pilosa-api/commit/42304d4dd31ebf6f77620161349ac76955fb08cc))

# [1.11.0](https://github.com/pilosa-group/pilosa-api/compare/v1.10.0...v1.11.0) (2024-07-03)


### Bug Fixes

* don't run scan if there is nothing to scan ([a5fa241](https://github.com/pilosa-group/pilosa-api/commit/a5fa2416302c3a407c9fb7eaede0851a926a8df8))
* remove pageLoaded from reset list ([8ea7fb2](https://github.com/pilosa-group/pilosa-api/commit/8ea7fb275bfcde78c4b29c944f93766ecc2ec835))


### Features

* store viewport size ([408d8fe](https://github.com/pilosa-group/pilosa-api/commit/408d8fe9bd665df1bb84e0578d711fa9c2516848))

# [1.10.0](https://github.com/pilosa-group/pilosa-api/compare/v1.9.1...v1.10.0) (2024-07-01)


### Bug Fixes

* cleanup quick scan result based on (v1) dto ([efb291c](https://github.com/pilosa-group/pilosa-api/commit/efb291cb3eec989a2f75418015a17d4730f087ab))


### Features

* add basic endpoints for organizations, projects, frontend apps and its metric ([55f6fac](https://github.com/pilosa-group/pilosa-api/commit/55f6facb2c961618eaeec7db8abfe73c6ec4e5d9))
* add endpoint for browser metrics based on frontend app id ([94cb823](https://github.com/pilosa-group/pilosa-api/commit/94cb823dffaa4f3c295a92d7fea441d6c4052f89))
* add global serializer and exclude all entities by default ([a4927cf](https://github.com/pilosa-group/pilosa-api/commit/a4927cfa140abfa275c25bc8eb9bcfe8a33d14ce))
* add paginator service, some class (query/params) validations and swagger document ([81ec352](https://github.com/pilosa-group/pilosa-api/commit/81ec3520dd593eac1b76f39b9e41587859b8d5c7))
* add robots.txt ([da947d6](https://github.com/pilosa-group/pilosa-api/commit/da947d699326abe2606c40d7e22ab5b3c5432c1b))
* disable swagger on non-development ([62bb88d](https://github.com/pilosa-group/pilosa-api/commit/62bb88d2d6329749c267d13db3005505001fa9dd))
* replace console.log with Nestjs logger ([1af2649](https://github.com/pilosa-group/pilosa-api/commit/1af2649c2a83870e7d9a9d033371dd12cb609ae5))

## [1.9.1](https://github.com/pilosa-group/pilosa-api/compare/v1.9.0...v1.9.1) (2024-06-25)


### Bug Fixes

* add delete rule for ManyToOne relations ([4da9554](https://github.com/pilosa-group/pilosa-api/commit/4da9554c75563c100f0fa6c9882bbc29bc76e150))

# [1.9.0](https://github.com/pilosa-group/pilosa-api/compare/v1.8.4...v1.9.0) (2024-06-25)


### Bug Fixes

* don't break cron when scanning fails ([a1644e1](https://github.com/pilosa-group/pilosa-api/commit/a1644e16f54dbb8604f0643eef5bb89ab7123e20))
* process pageLoaded per payload ([037fc4a](https://github.com/pilosa-group/pilosa-api/commit/037fc4a72fbb6498c36ccebb75bff59009f9b088))


### Features

* cache frontend app fetch for 1 minute ([28df126](https://github.com/pilosa-group/pilosa-api/commit/28df12675389ebc88e5dcdf83b9b80e27aea832b))
* don't include query params ([b022e1c](https://github.com/pilosa-group/pilosa-api/commit/b022e1c2f2c2606ab7a015b357bf676557e45383))
* store pageload + change a few properties from float to int ([bdabaa6](https://github.com/pilosa-group/pilosa-api/commit/bdabaa62cc9c49fa1190610504648638698589a8))

## [1.8.4](https://github.com/pilosa-group/pilosa-api/compare/v1.8.3...v1.8.4) (2024-06-19)


### Bug Fixes

* fix result ([c2cd16c](https://github.com/pilosa-group/pilosa-api/commit/c2cd16c87ff2bf060fa189a0cb729e1c0a10e847))

## [1.8.3](https://github.com/pilosa-group/pilosa-api/compare/v1.8.2...v1.8.3) (2024-06-19)


### Bug Fixes

* select on path ([69a2a45](https://github.com/pilosa-group/pilosa-api/commit/69a2a4587e33233fde13c99b627588156326f26b))

## [1.8.2](https://github.com/pilosa-group/pilosa-api/compare/v1.8.1...v1.8.2) (2024-06-18)


### Bug Fixes

* just select the most visited pages ([6347cb7](https://github.com/pilosa-group/pilosa-api/commit/6347cb776cf5f2e1c9c15efdb585094185f70879))

## [1.8.1](https://github.com/pilosa-group/pilosa-api/compare/v1.8.0...v1.8.1) (2024-06-18)


### Performance Improvements

* slow down number of scans ([af52d2b](https://github.com/pilosa-group/pilosa-api/commit/af52d2b60d7417601e314881edb760894cee7935))

# [1.8.0](https://github.com/pilosa-group/pilosa-api/compare/v1.7.0...v1.8.0) (2024-06-18)


### Features

* run synthetic scan for visited pages ([9075683](https://github.com/pilosa-group/pilosa-api/commit/9075683e58910965c3fa800b01c90cd49b633cbf))

# [1.7.0](https://github.com/pilosa-group/pilosa-api/compare/v1.6.0...v1.7.0) (2024-06-12)


### Features

* add Cross-Origin-Resource-Policy: cross-origin header for sloth.js ([#5](https://github.com/pilosa-group/pilosa-api/issues/5)) ([d0145d8](https://github.com/pilosa-group/pilosa-api/commit/d0145d8fec15b022e179114807bfc3ba8c8b496b))

# [1.6.0](https://github.com/pilosa-group/pilosa-api/compare/v1.5.1...v1.6.0) (2024-06-12)


### Features

* add redirect from app to pilosa waitlist homepage ([#4](https://github.com/pilosa-group/pilosa-api/issues/4)) ([b849439](https://github.com/pilosa-group/pilosa-api/commit/b84943990a71c0a4f55f531b58261bc0e98a0ede))

## [1.5.1](https://github.com/pilosa-group/pilosa-api/compare/v1.5.0...v1.5.1) (2024-06-12)


### Bug Fixes

* sentry tracesSampleRate through env var ([#3](https://github.com/pilosa-group/pilosa-api/issues/3)) ([1444231](https://github.com/pilosa-group/pilosa-api/commit/1444231b218d8b5bb612e56b9aa9765b925f4562))

# [1.5.0](https://github.com/pilosa-group/pilosa-api/compare/v1.4.0...v1.5.0) (2024-06-12)


### Features

* check for frontend app id length ([#2](https://github.com/pilosa-group/pilosa-api/issues/2)) ([6762015](https://github.com/pilosa-group/pilosa-api/commit/67620159b8a102c146768fd8640a12765713eb96))

# [1.4.0](https://github.com/pilosa-group/pilosa-api/compare/v1.3.0...v1.4.0) (2024-06-12)


### Features

* use npm ci and install playwright after ([e311554](https://github.com/pilosa-group/pilosa-api/commit/e3115542b4ea5ba08dd70bcb8c6cab2ac37437d1))

# [1.3.0](https://github.com/pilosa-group/pilosa-api/compare/v1.2.0...v1.3.0) (2024-06-12)


### Features

* add basic sentry support ([2c9a5de](https://github.com/pilosa-group/pilosa-api/commit/2c9a5de097f87b45ea0cc7afd30a746b97ecb574))
* update schema.gql ([a042dec](https://github.com/pilosa-group/pilosa-api/commit/a042dec6dcd220ba2b7d52229763a85286ec0075))

# [1.2.0](https://github.com/pilosa-group/pilosa-api/compare/v1.1.0...v1.2.0) (2024-06-10)


### Features

* remove storing of user agent ([25b5ea0](https://github.com/pilosa-group/pilosa-api/commit/25b5ea0b87a9050957c7b3a25e772db0fbb65b85))

# [1.1.0](https://github.com/pilosa-group/pilosa-api/compare/v1.0.1...v1.1.0) (2024-06-10)


### Features

* parse user agent before storing ([6b86042](https://github.com/pilosa-group/pilosa-api/commit/6b860422e7ca04fa96336ea66b50e1b89fbda7ae))

## [1.0.1](https://github.com/pilosa-group/pilosa-api/compare/v1.0.0...v1.0.1) (2024-06-10)


### Bug Fixes

* store (cached) __none__ as null value ([59a0bf3](https://github.com/pilosa-group/pilosa-api/commit/59a0bf3c5d094546216ababcda394bfa171afbf5))

# 1.0.0 (2024-06-09)


### Bug Fixes

* don't send beacon calls to beacon ([84721e5](https://github.com/pilosa-group/pilosa-api/commit/84721e5a681ea6137ff399a4d3669b5a0191d109))


### Features

* add commitlint ([fda2d59](https://github.com/pilosa-group/pilosa-api/commit/fda2d597704eb283b3f703052f1f554ab38430b3))

# 1.0.0 (2024-06-09)


### Bug Fixes

* don't send beacon calls to beacon ([84721e5](https://github.com/pilosa-group/pilosa-api/commit/84721e5a681ea6137ff399a4d3669b5a0191d109))


### Features

* add commitlint ([fda2d59](https://github.com/pilosa-group/pilosa-api/commit/fda2d597704eb283b3f703052f1f554ab38430b3))

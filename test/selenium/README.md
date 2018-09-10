Selenium
========
> Much feared, little understood

This test sub-project utilizes `webdirverjs` from the Selenium project
to provide broad, high-level UI validation.

The goal is to validate common workflows and detect visual changes
and regressions.

## Getting started

### Installing dependencies
> Follow the dependency name links to navigate to installation instructions.


[**Node.js**](https://github.com/creationix/nvm#install-script)  
It is highly recommended that node.js be installed and managed by nvm. Project was developed with node ```>=8.11.0```.
```
nvm install 8
```

[**Git LFS**](https://git-lfs.github.com/)  
Git LFS is required for storing and retrieving the image snapshots.

[**Chrome**](https://www.google.com/chrome/)  
Required for selenium tests. Travis-CI is configured to include the latest stable.
When the envar ```CI=true``` the [example](./__tests__/selenium-login.test.ts) will run Chrome in headless mode.

Install node modules:  
```
npm install
npm install -g ts-node typescript
```

Start rundeck at `127.0.0.1:4440`:
> NOTE: You may need to edit `rundeckapp/rundeck-runtime/server/config/rundeck-config.properties`
to get rundeck running on loopback on Linux.
```bash
# From repo root
cd rundeckapp && ./gradlew bootRun
```

## Quick Start
Run selenium:
```
npm run selenium
```

Run in watch mode:
```
npm run selenium-watch
```

Update image snapshots:
```
npm run selenium -- -j='--watch'
```

## Usage

### CLI
The npm scripts wrap a CLI. You can access this CLI by running:
```
./bin/deck
```

### Image snapshots
Image snapshots require
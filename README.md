This repository combines easy and professional alexa-custom-skill development.

The ease is possible through the easy-to-use parcel bundler which compiles the
typescript code and watches for file changes. Also the ask-cli provides an easy
interface to handle deployments.

To prevent many possible errors Typescript is used a language and for automated
unit tests the bespoken-tools are installed.

## Stack:
- CLI: ask-cli
- Framework: alexa-skill-kit for nodejs
- Language: Typescript
- Bundler: parcel
- Tests: bespoken tools

## Prerequisites:
- ask-cli (1.7.10) (`npm i -g ask-cli@1.7.10`)

## Getting started:
- `npm i`

## Scripts: (`npm run` + script name)
- `start`: Watch for file changes and recompile automatically
- `test`: Execute unit tests
- `build`: Build minified and bundled code
- `lint`: Lint files
- `validate`: Validate skill manifest
- `predeploy`: Lint test build and validate skill (executed automatically before deploy)
- `deploy`: Deploy skill with ask cli

## Development:
- `npm start` to watch for file changes and recompile the code automatically
- Execute your code: `npm test`

## Deploy:
** Because of a bug in ask-cli 1.7.10 you cannot use npm run deploy yet **

Instead use `npm run build` and then `ask deploy`

## Docs:
- ask-cli: https://developer.amazon.com/de/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html
- ask: https://ask-sdk-for-nodejs.readthedocs.io/en/latest/
- bespoken-tools: https://read.bespoken.io/
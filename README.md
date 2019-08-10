![Coverage Branches](/badges/badge-branches.svg)
![Coverage Function](/badges/badge-functions.svg)
![Coverage Lines](/badges/badge-lines.svg)
![Coverage Statements](/badges/badge-statements.svg)

Stack:
- Framework: alexa-skill-kit for nodejs
- Language: Typescript
- Bundler: parcel
- Tests: bespoken tools

Dependencies:
- ask-cli (1.7.10)

Development:
- `npm start` to watch for file changes and recompile the code automatically
- Execute your code: `npm test`

Deploy:
** Because of a bug in ask-cli 1.7.10 you cannot use npm run deploy yet **
Instead use `npm run build` and then `ask deploy`

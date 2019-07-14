![Coverage Branches](/badges/badge-branches.svg)
![Coverage Function](/badges/badge-functions.svg)
![Coverage Lines](/badges/badge-lines.svg)
![Coverage Statements](/badges/badge-statements.svg)

Stack:
- Language: Typescript
- Bundler: parcel
- Dev Server: bespoken proxy
- Tests: bespoken tests
- DB: DynamoDB

Dependencies:
- java (https://java.com/de/download/)
- dynamo-db local package
(https://docs.aws.amazon.com/de_de/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)

Development:
- navigate to your dynamo-db folder
- `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb` (local dynamo-db)
- navigate to lambda folder of your project
- `npm start`
- Execute your code: `npm run launch` or `npm test`

Initial Setup:
- configure your skill (skill.json)
- `ask deploy`
- start developing

Deploy:
** Because of a bug in ask-cli 1.7.7 you cannot use npm run deploy **
`cd lambda && npm run predeploy`
`cd .. && ask deploy`

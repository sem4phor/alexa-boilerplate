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

Services:
- hello-world-watch: Watches code and rebuilds it
- hello-world-proxy: Local hosted alexa skill; Access within container: e.g. `bst launch`
- dynamo-db: Test DB; Access on http://alexa.docker:8000/shell/

// TODO:
dynamo db anbindung testen (local)
bst dynamo db mock testen

Initial Setup:
1. Build container:
docker-compose build
2. Set up ask cli in container
docker-compose exec my-container sh
ask init --no-browser
follow steps
configure your skill (skill.json)
ask deploy

Development:
docker-compose up to start parcel, bst proxy and dynamodb

Deploy:
// TODO
docker run parcel build && ask deploy env=prod

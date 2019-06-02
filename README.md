![Coverage Branches](/test_output/coverage/badge-branches.svg)
![Coverage Function](/test_output/coverage/badge-functions.svg)
![Coverage Lines](/test_output/coverage/badge-lines.svg)
![Coverage Statements](/test_output/coverage/badge-statements.svg)

// TODO:
predeploy hook
  - ask validate
  - bst test
  - eslint
  - parcel build
  - covergae badge generieren
dynamo db anbindung testen (local)
bst dynamo db mock testen

Initial Setup:
1. Build container:
docker-compose build
2. Set up ask cli
docker-compose exec my-container sh
ask init --no-browser // change default cmd to this
follow steps

Development:
docker-compose up to start parcel, bst proxy and dynamodb

Deploy:
docker run parcel build && ask deploy env=prod

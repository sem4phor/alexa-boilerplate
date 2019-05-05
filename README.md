// TODO:
predeploy hook
  - ask validate
  - bst test
  - eslint
  - parcel build
  - covergae badge generieren
git repo anlegen
dynamo db anbindung testen (local)
bst dynamo db mock testen
husky hooks / lint staged:
- eslint
- ask validate (?)

Initial Setup:
1. Build container:
docker-compose build
2. Set up ask cli
docker-compose exec my-container sh
ask init --no-browser // make run cmd
follow steps

Development:
docker-compose up to start parcel, bst proxy and dynamodb

Deploy:
docker run parcel build && ask deploy env=prod

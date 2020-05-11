# Sandbox for testing the release steps of our build and dev cli


`docker run -v ${PWD}/dist:/class-web/dist  -v /class-web/node_modules --name ef-class -it --rm class-web:dev bash`

`cd ./dist/command-line-tools/ef && npm link && cd -`
`git clone https://github.com/cookiescrumbs/release-sandbox.git`

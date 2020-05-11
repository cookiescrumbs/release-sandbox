FROM circleci/node:12-browsers

WORKDIR  /release-sandbox

ENV PATH /release-sandbox/node_modules/.bin:$PATH

COPY package.json .
USER root
RUN npm install -g typescript
RUN npm install 

RUN apt-get install nano -y
RUN apt-get install vim -y
RUN apt-get install curl -y

FROM mhart/alpine-node:slim-15

ENV NODE_VERSION 15.11.0

WORKDIR ./app

COPY . .

EXPOSE 5000

CMD [ "node", "./app.js" ]
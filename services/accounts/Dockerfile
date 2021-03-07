FROM mhart/alpine-node:15

ENV NODE_VERSION 15.11.0

WORKDIR .

COPY app.js ./app
COPY requesto.js ./modules

EXPOSE 5000

CMD [ "node", "./app.js" ]
FROM mhart/alpine-node:base-9.8.0
WORKDIR /app

COPY . .

CMD [ "node", "index.js" ]

EXPOSE 3001

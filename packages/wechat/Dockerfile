FROM node:lts

WORKDIR /app
COPY ./production.js /app/production.js
COPY ./package.json /app/package.json
COPY ./src /app/src

RUN npm install --production

EXPOSE 8360

ENTRYPOINT [ "node", "production.js" ]
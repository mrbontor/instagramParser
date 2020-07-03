FROM node:8-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

ENV NODE_ENV production

ENTRYPOINT [ "node", "index.js"]

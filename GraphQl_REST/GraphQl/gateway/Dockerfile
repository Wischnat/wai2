FROM node:latest

EXPOSE 4000

RUN mkdir gateway
COPY index.js package.json package-lock.json  gateway/
WORKDIR /gateway
RUN npm ci

CMD ["node", "index.js"]
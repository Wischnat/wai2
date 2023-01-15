FROM node:latest

EXPOSE 4001

RUN mkdir authors
COPY index.js rest.js package.json package-lock.json /authors/
WORKDIR /authors
RUN npm ci

CMD ["node", "index.js"]
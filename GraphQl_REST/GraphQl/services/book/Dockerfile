FROM node:latest

EXPOSE 4002

RUN mkdir books
COPY index.js rest.js package.json package-lock.json /books/
WORKDIR /books
RUN npm ci

CMD ["node", "index.js"]
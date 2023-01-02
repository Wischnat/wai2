FROM node:latest

EXPOSE 4001

RUN mkdir books
COPY index.js mydatabase.js package.json package-lock.json /books/
WORKDIR /books
RUN npm ci

CMD ["node", "index.js"]
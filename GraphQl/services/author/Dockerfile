FROM node:latest

EXPOSE 4001

RUN mkdir authors
COPY index.js mydatabase.js package.json package-lock.json /authors/
WORKDIR /authors
RUN npm ci

CMD ["node", "index.js"]
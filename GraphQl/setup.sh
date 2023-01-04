#!/bin/sh

docker container prune
docker rmi graphql-api-author:latest graphql-api-book:latest graphql-gateway:latest
docker rmi graphql_api-author:latest graphql_api-book:latest graphql_gateway:latest
docker volume rm graphql_graphql-author-db-data graphql_graphql-book-db-data
docker-compose up
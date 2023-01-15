#!/bin/sh

docker container prune
docker rmi graphql_rest_graphql-gateway:latest graphql_rest_graphql-api-book:latest graphql_rest_graphql-api-author:latest
docker rmi graphql_rest_rest-gateway:latest graphql_rest_rest-api-author:latest graphql_rest_rest-api-book:latest
docker volume rm graphql_rest_graphql-rest-author-db-data graphql_rest_graphql-rest-book-db-data
docker-compose up
#!/bin/sh

docker container prune
docker rmi graphql-api-author:latest graphql-gateway:latest
docker rmi graphql_api-author:latest graphql_gateway:latest
docker volume rm graphql_graphql-db-data
docker-compose up
#!/bin/sh

docker container prune
docker rmi rest-api-author:latest rest-api-book:latest rest-gateway:latest
docker rmi rest_api-author:latest rest-api-book:latest rest_gateway:latest
docker volume rm rest_rest-author-db-data rest_rest-book-db-data
docker-compose up
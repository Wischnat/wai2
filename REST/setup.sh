#!/bin/sh

docker container prune -y
docker rmi rest-api-actor:latest rest-gateway:latest
docker rmi rest_api-actor:latest rest_gateway:latest
docker volume rm rest_db-data
docker-compose up
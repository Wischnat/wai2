#!/bin/sh

docker container prune
docker rmi rest-api-actor:latest rest-gateway:latest
docker rmi rest_api-actor:latest rest_gateway:latest
docker-compose up
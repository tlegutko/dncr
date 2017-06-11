#!/bin/bash

docker rm -v $(docker ps -a -q -r status=exited)
docker rmi $(docker images -f "dangling=true" -q)
docker volume rm $(docker volume ls -qf dangling=true)
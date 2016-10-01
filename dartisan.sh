#!/bin/bash

#############################################################################################
### Script to execute artisan command inside php docker container 
### with less boilerplate and with correct permissions on generated files.
#############################################################################################

if [[ $# == 0 ]]; then
	echo "Usage: ./dartisan.sh command to execute"
	echo "Example: ./dartisan.sh migrate:reset --seed"
	exit 1
fi

# create user with appropriate uid if it doesn't already exist, because
# docker creates new files with permissions -rw-r--r--, so correct uid is enough
docker exec -it dncr_php_1 id dncr > /dev/null
if [ $? -eq 1 ]; then
	docker exec -i dncr_php_1 bash -c "useradd dncr -u $(id -u)"
fi

docker exec -u dncr -i dncr_php_1 php artisan $@

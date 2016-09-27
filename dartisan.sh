#!/bin/bash

#############################################################################################
### Script to execute artisan command inside php docker container 
### with less boilerplate and with correct permissions on generated files.
#############################################################################################

if [[ $# == 0 ]]; then
	echo "Usage: ./dartisan.sh command to execute"
	exit 1
fi

# create user with appropriate uid and gid if it doesn't already exist
docker exec -it dncr_php_1 id dncr > /dev/null
if [ $? -eq 1 ]; then
	docker exec -i dncr_php_1 bash -c "groupadd $(id -g) && useradd dncr -u $(id -u) -g $(id -g)"
fi

docker exec -u dncr -i dncr_php_1 php artisan $@

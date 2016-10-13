#!/bin/bash
set -e

#############################################################################################"
### Script to simplify and automate DNCR environment preparation. Feel free to contribute.
#############################################################################################"

if [[ ($# == 1) && ($1 == "-h" || $1 == "--help") ]]; then
	cat << EOF
Prepares DNCR environment in quicker and more convenient way.
Runs composer install, artisan migrate:refresh --seed and npm install and additional operations specified via parameters.

usage: ./prepenv.sh [options]

-d, --docker-compose	restart docker-compose
-h, --help		        display this message
-k, --generate-key  	generate secret key with artisan
-p, --set-permissions	set permissions for /storage/* and /bootstrap/cache. requires sudo.
-r, --reset-db          recreate db container, use when changing branches with different db migrations
-w, --watch		        execute script npm run watch

Examples:
./prepenv.sh            runs composer install, artisan migrate:refresh --seed inside docker and npm install
./prepenv.sh -r -w      recreates db container, runs commands mentioned above and runs npm watch
EOF
	exit 0
fi

COLOR='\033[0;36m' # cyan
NC='\033[0m' # No Color

for var in "$@"
do
	if [[ $var == "-d" || $var == "--docker-compose" ]]; then
		echo -e "${COLOR}### restarting docker-compose ###${NC}"
		docker-compose stop && docker-compose up -d
	fi
	if [[ $var == "-r" || $var == "--reset-db" ]]; then
		echo -e "${COLOR}### recreating database container ###${NC}"
		docker stop dncr_db_1 && docker rm dncr_db_1 && docker-compose up -d
		echo -e "${COLOR}### waiting for db container to initialize ###${NC}"
		until $(curl --output /dev/null --silent --head --fail localhost:3306); do
            printf '.'
            sleep 1
        done
        echo
	fi
done

echo -e "${COLOR}### check if dockers are running ###${NC}"
docker-compose up -d

echo -e "${COLOR}### composer install ###${NC}"
docker exec -i dncr_php_1 composer install

echo -e "${COLOR}### refreshing & seeding database migrations ###${NC}"
docker exec -i dncr_php_1 php artisan migrate:refresh --seed

echo -e "${COLOR}### npm install ###${NC}"
cd frontend && npm install

#other options
while test $# -gt 0; do
	case "$1" in
		-d|--docker-compose)
			shift
			;;
		-k|--generate-key)
			echo -e "${COLOR}### generating secret key ###${NC}"
			cp .env.dev .env
			docker exec -i dncr_php_1 php artisan key:generate
			shift
			;;
		-p|--set-permissions)
			echo -e "${COLOR}### setting permissions ###${NC}"
			cd ..
			chmod 777 -R storage/*
			chmod 777 bootstrap/cache
			shift
			;;
		-r|--reset-db)
			shift
			;;
		-w|--watch)
			echo -e "${COLOR}### npm watch ###${NC}"
			npm run watch:dev
			break
			;;
	esac
done

#!/bin/bash

clear

echo "********** composer install:"
docker exec -it dncr_php_1 composer install

echo "********** npm install:"
cd frontend && npm install

echo "********** copying .env.dev to .env:"
cd .. && cp .env.dev .env

echo "********** artisan key:generate:"
docker exec -it dncr_php_1 php artisan key:generate

echo "********** seeding database:"
docker exec -it dncr_php_1 php artisan migrate:refresh --seed

echo "********** building:"
cd frontend && npm run build:dev

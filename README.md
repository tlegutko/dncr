# DNCR

[![Run Status](https://api.shippable.com/projects/5790eff23be4f4faa56d6dae/badge?branch=master)](https://app.shippable.com/projects/5790eff23be4f4faa56d6dae) 

Projekt systemu zarządzania zajęciami i kursantami klubów tanecznych.

# Rozpoczynanie pracy

1. Zainstaluj zależności:
    * `composer install`
    * `npm install`
    * `cp .env.example .env`
    * `php artisan key:generate`
2. Skonfiguruj dane dostępowe do bazy w pliku .env:
    * `DB_HOST=http://database`
    * `DB_DATABASE=dncr`
    * `DB_USERNAME=dncr`
    * `DB_PASSWORD=dncr`
3. Uruchom serwer: `docker-compose up`


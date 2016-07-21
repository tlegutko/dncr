# DNCR

Projekt systemu zarządzania zajęciami i kursantami klubów tanecznych.

# Rozpoczynanie pracy

1. Zainstaluj zależności:
    * `composer install`
    * `npm install`
    * `php artisan key:generate`
    * `cp .env.example .env`
2. Skonfiguruj dane dostępowe do bazy:
    * `DB_HOST=http://database`
    * `DB_DATABASE=dncr`
    * `DB_USERNAME=dncr`
    * `DB_PASSWORD=dncr`
3. Uruchom serwer: `docker-compose up`


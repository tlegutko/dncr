# DNCR

[![Run Status](https://api.shippable.com/projects/5790eff23be4f4faa56d6dae/badge?branch=master)](https://app.shippable.com/projects/5790eff23be4f4faa56d6dae) 

Projekt systemu zarządzania zajęciami i kursantami klubów tanecznych.

# System requirements

## For Windows
1. Windows 10 64bit
2. [Hyper-V](https://msdn.microsoft.com/en-us/virtualization/hyperv_on_windows/quick_start/walkthrough_install)
3. [Docker for Windows](https://www.docker.com/products/docker#/windows)

## For Linux
1. Up-to-date Linux distribution
2. [Docker](https://www.docker.com/products/docker#/linux)

# Getting started

1. Clone repository
2. Boot up machines: 
    * Go to the repository you cloned
    * Run `docker-compose up -d` - this will build and boot required Docker images in background
    * To stop containers use `docker-compose stop`
3. Install required dependencies:
    * `docker exec -it dncr_php_1 composer.phar install`
    * `docker exec -it dncr_php_1 npm install -no-bin-links`
4. Setup application:
    * `cp .env.dev .env`
    * `docker exec -it dncr_php_1 php artisan key:generate`
5. Go to [http://localhost:8080](http://localhost:8080) to see the application.

# DNCR

[![Run Status](https://api.shippable.com/projects/5790eff23be4f4faa56d6dae/badge?branch=master)](https://app.shippable.com/projects/5790eff23be4f4faa56d6dae) 

Projekt systemu zarządzania zajęciami i kursantami klubów tanecznych.

# System requirements

## For Windows
1. Windows 10 64bit
2. [Hyper-V](https://msdn.microsoft.com/en-us/virtualization/hyperv_on_windows/quick_start/walkthrough_install)
3. [Docker for Windows](https://www.docker.com/products/docker#/windows)
4. [NodeJS](https://nodejs.org/en/download/current/)

## For Linux
1. Up-to-date Linux distribution
2. [Docker](https://www.docker.com/products/docker#/linux)
3. [NodeJS](https://nodejs.org/en/download/current/)

### Recommended to install

* [PhpStorm](https://www.jetbrains.com/phpstorm/download/)
* PhpStorm plugins:
    * Docker Integration: for easy integration of PhpStorm with our Docker container.
    
        > Note: you can install them in PhpStorm Settings -> Plugins -> Browse repositories...

# Getting started

1. Clone repository
2. Boot up machines: 
    * Go to the repository you cloned
    * Run `docker-compose up -d` - this will build and boot required Docker images in background
    > Note: drop `-d` to see all logs in the console.
    > Note: If, for any reason `docker-compose up` doesn't build your image - try again.
    * To stop containers use `docker-compose stop`
3. Install required dependencies:
    * `docker exec -it dncr_php_1 composer install`
    * `cd frontend && npm install`
    
        > For Windows: add `-no-bin-links` to `npm install` command so it properly installs required dependencies.

4. Setup application:
    * `cp .env.dev .env`
    * `docker exec -it dncr_php_1 php artisan key:generate`
5. Generate frontend application:
    * `cd frontend && npm run build:dev`
6. Go to [http://localhost](http://localhost) to see the application.

# Working with PhpStorm

## Setup

When you open the project (cloned directory) in PhpStorm you need to:

1. Setup Docker integration:
    1. Go to PhpStorm Settings
    2. Enter Build, Execution, Deployment tab
    3. Enter Docker tab
    4. Click green +
        * For Windows enter: `TODO` as API URL
        * For Linux enter: `unix:///var/run/docker.sock` as API URL
2. Setup ability to debug PHP application:
    1. Go to [Zero-configuration web app debugging with XDebug and PhpStorm](https://confluence.jetbrains.com/display/PhpStorm/Zero-configuration+Web+Application+Debugging+with+Xdebug+and+PhpStorm) page.
    2. Start from Step 2 (Prepare PhpStorm)

## Abilities

PhpStorm allows you to:

* Run frontend build (NodeJS on your computer is required)
* Run Docker containers (boot up application)
* Run PHP tests
* Run frontend tests

### Building frontend

1. Press Alt + F11
2. Run `watch` command

This will build dev version of application into `public` directory served by Docker container.

### Running Docker containers

1. Press Alt + Shift + F10 (or go to Run -> Run... and select 'Application')
2. Visit [http://localhost](http://localhost)

This command will properly stop and start Docker containers defined in `docker-compose.yml`

> Note: You can also select 'Application' in main toolbox and press play.

### Running PHP tests

1. Press Alt + 2 (or open Tests window from the bottom)
2. Press play for all tests

> Note: You can also select 'Tests' in main toolbox and press play.

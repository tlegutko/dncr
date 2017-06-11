FROM php:7.0.8-cli
MAINTAINER StartupTime

# Install NodeJS
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get update && apt-get install -y git wget unzip bzip2 nodejs libfontconfig1

# Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

#If following line fails, go to https://getcomposer.org/download/ and update SHA384 above
#Or do stuff as advised in docs: https://getcomposer.org/doc/faqs/how-to-install-composer-programmatically.md
RUN php composer-setup.php --install-dir=/usr/local/bin
RUN php -r "unlink('composer-setup.php');"
RUN ln -s /usr/bin/composer.phar /usr/local/bin/composer

# Install PhpUnit
RUN wget https://phar.phpunit.de/phpunit.phar && chmod +x phpunit.phar && mv phpunit.phar /usr/local/bin/phpunit

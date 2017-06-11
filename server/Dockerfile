FROM php:7.0.8-apache

# Enable mod_rewrite
RUN a2enmod rewrite

# Install Composer
RUN php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
RUN php -r "if (hash_file('SHA384', 'composer-setup.php') === '669656bab3166a7aff8a7506b8cb2d1c292f042046c5a994c43155c0be6190fa0355160742ab2e1c88d40d5be660b410') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

#If following line fails, go to https://getcomposer.org/download/ and update SHA384 above
#Or do stuff as advised in docs: https://getcomposer.org/doc/faqs/how-to-install-composer-programmatically.md
RUN php composer-setup.php --install-dir=/usr/bin
RUN php -r "unlink('composer-setup.php');"
RUN ln -s /usr/bin/composer.phar /usr/local/bin/composer

# Install supervisor to enable remote PHP interpreter
RUN apt-get update && apt-get install -y git unzip wget openssh-server supervisor
RUN mkdir -p /var/run/sshd /var/log/supervisor
COPY supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Install required dependencies (MySQL and XDebug)
RUN docker-php-ext-install pdo_mysql
RUN pecl install xdebug-2.4.0

# Install PhpUnit
RUN wget https://phar.phpunit.de/phpunit.phar && chmod +x phpunit.phar && mv phpunit.phar /usr/local/bin/phpunit

# Set up SSH daemon
RUN echo 'root:screencast' | chpasswd
RUN sed -i 's/PermitRootLogin without-password/PermitRootLogin yes/' /etc/ssh/sshd_config

# SSH login fix. Otherwise user is kicked off after login
RUN sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

ENV NOTVISIBLE "in users profile"
RUN echo "export VISIBLE=now" >> /etc/profile

EXPOSE 22 80
CMD ["/usr/bin/supervisord"]

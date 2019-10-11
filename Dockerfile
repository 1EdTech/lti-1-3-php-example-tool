FROM php:7.1.8-apache

# COPY ./src /srv/app
RUN mkdir /srv/app
COPY ./vhost.conf /etc/apache2/sites-available/000-default.conf

RUN chown -R www-data:www-data /srv/app \
    && a2enmod rewrite

COPY ./src/composer.phar /bin/composer.phar

RUN chmod a+x /bin/composer.phar && apt-get update -y && apt-get install git unzip -y
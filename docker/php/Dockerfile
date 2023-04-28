FROM php:8.2-fpm-alpine

ARG XDEBUG=OFF

COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY php.ini $PHP_INI_DIR/php.ini

ENV TZ=America/Argentina/Buenos_Aires
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apk update \
 && apk upgrade \
 && apk --no-cache add zip unzip libzip-dev git icu-dev libpng-dev jpeg-dev libxpm-dev libwebp-dev freetype-dev libjpeg-turbo-dev

RUN docker-php-ext-configure gd \
        --with-freetype \
        --with-jpeg \
        --with-xpm \
        --with-webp

RUN if [ "${XDEBUG}" = "ON" ] ; then \
  apk --no-cache add --update linux-headers pcre-dev ${PHPIZE_DEPS} \
  && pecl install xdebug \
  && docker-php-ext-enable xdebug \
  && echo "xdebug.mode=debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  && echo "xdebug.client_host=host.docker.internal" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  && echo "xdebug.start_with_request=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  && echo "xdebug.discover_client_host=yes" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  && echo "xdebug.client_port=9003" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini \
  && apk del pcre-dev ${PHPIZE_DEPS} ; \
fi

RUN docker-php-ext-install pdo_mysql zip gd mysqli

EXPOSE 9003

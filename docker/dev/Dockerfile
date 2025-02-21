FROM alpine:3.19

ENV TZ=America/Lima
ENV HISTFILE=

RUN apk update && apk upgrade

RUN apk add --no-cache nginx curl

RUN apk add --no-cache php83 php83-fpm php83-opcache php83-gd php83-zlib php83-curl php83-phar \
    php83-iconv php83-mbstring php83-openssl php83-pdo php83-pdo_mysql php83-dom \
    php83-simplexml php83-xml php83-tokenizer php83-xmlwriter php83-session
RUN apk add --no-cache php83-pecl-redis

RUN ln -s /usr/bin/php83 /usr/bin/php || true
RUN ln -s /usr/sbin/php-fpm83 /usr/sbin/php-fpm || true

RUN ln -sf /dev/stderr /var/log/php83/error.log

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/bin --filename=composer

COPY nginx.conf /etc/nginx/nginx.conf
COPY php-fpm.conf /etc/php83/php-fpm.d/www.conf

WORKDIR /app
EXPOSE 80 443

CMD php-fpm -D && nginx -g "daemon off;"

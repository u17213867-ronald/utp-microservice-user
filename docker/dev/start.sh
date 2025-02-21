#!/bin/sh

# Iniciar PHP-FPM y Nginx
service php8.2-fpm start
service nginx start

# Mantener el contenedor activo
tail -f /var/log/nginx/access.log

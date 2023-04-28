FROM httpd:2-alpine

RUN apk update && apk upgrade;
COPY httpd.conf /usr/local/apache2/conf/local.conf
RUN echo "Include /usr/local/apache2/conf/local.conf" >> /usr/local/apache2/conf/httpd.conf

ENV TZ=America/Argentina/Buenos_Aires
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
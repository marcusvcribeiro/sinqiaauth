FROM httpd:2.4-alpine

#Configuration
RUN mkdir -p /app/
ADD docker/startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

ADD docker/httpd.conf /usr/local/apache2/conf/httpd.conf
ADD demo /usr/local/apache2/htdocs/
ADD doc /usr/local/apache2/htdocs/doc/

CMD ["/app/startup.sh"]

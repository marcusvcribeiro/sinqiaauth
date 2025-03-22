FROM httpd:2.4.41-alpine

#Configuration
RUN mkdir -p /app/

ADD httpd.conf /usr/local/apache2/conf/httpd.conf
ADD dist /usr/local/apache2/htdocs/

ADD startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

CMD ["/app/startup.sh"]

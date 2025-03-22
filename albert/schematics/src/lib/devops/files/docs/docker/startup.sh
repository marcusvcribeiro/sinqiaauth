#!/bin/bash
date

if [[ "$APP_BASE_HREF" != "" ]]; then
  sed -i 's@<base href="/">@'"<base href=\"$APP_BASE_HREF\">"'@g' /usr/local/apache2/htdocs/index.html
fi

httpd-foreground

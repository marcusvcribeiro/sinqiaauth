#!/bin/bash
date

if [[ "$APP_BASE_HREF" != "" ]]; then
  sed -i 's@<base href="/">@'"<base href=\"$APP_BASE_HREF\">"'@g' /usr/local/apache2/htdocs/index.html
fi

sed -i 's@$APP_BASE_URL@'"$APP_BASE_URL"'@g' /usr/local/apache2/htdocs/main*.js

sed -i 's@$BACK_UIMANAGER@'"$BACK_UIMANAGER"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$BACK_PIX_WS@'"$BACK_PIX_WS"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$BACK_PIX_CORE@'"$BACK_PIX_CORE"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$BACK_SEG_CORE@'"$BACK_SEG_CORE"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$BACK_RELATORIOS_CORE@'"$BACK_RELATORIOS_CORE"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$BACK_GCOB_CORE@'"$BACK_GCOB_CORE"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$BACK_LOG_LEG@'"$BACK_LOG_LEG"'@g' /usr/local/apache2/htdocs/main*.js




sed -i 's@$AUTH_ISSUER_URL@'"$AUTH_ISSUER_URL"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$AUTH_CLIENT_ID@'"$AUTH_CLIENT_ID"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$AUTH_SCOPE@'"$AUTH_SCOPE"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$AUTH_LOG_WARNING_ACTIVE@'"$AUTH_LOG_WARNING_ACTIVE"'@g' /usr/local/apache2/htdocs/main*.js
sed -i 's@$AUTH_LOG_DEBUG_ACTIVE@'"$AUTH_LOG_DEBUG_ACTIVE"'@g' /usr/local/apache2/htdocs/main*.js

httpd-foreground
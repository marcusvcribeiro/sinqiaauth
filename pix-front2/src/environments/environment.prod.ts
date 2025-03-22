import { AuthenticationConfig } from '@albert/authentication';

export const environment = {
  production: true,
  authConfig: null,
  sistema: 'SQPIX',
  api: {
    ui: '$BACK_UIMANAGER',
    pix: '$BACK_PIX_WS',
    pix_mock: '$BACK_PIX_WS',
    core: '$BACK_PIX_CORE',
    seg:'$BACK_SEG_CORE',
    relatorios:'$BACK_RELATORIOS_CORE',
    cob:'$BACK_GCOB_CORE'
  },
  defaultLanguage: 'pt-BR',
  supportedLanguages: [
    'pt-BR'
  ],
};
environment.authConfig = new AuthenticationConfig();
environment.authConfig.stsServer = `${window.location.origin}/auth/realms/sinqia`;
environment.authConfig.redirect_url = '$APP_BASE_URL/auth/post-login';
environment.authConfig.client_id = '$AUTH_CLIENT_ID';
environment.authConfig.response_type = 'code';
environment.authConfig.scope = '$AUTH_SCOPE';
environment.authConfig.post_login_route = `dashboard`;
environment.authConfig.post_logout_redirect_uri = '$APP_BASE_URL/';
environment.authConfig.start_checksession = true;
environment.authConfig.silent_renew = true;
environment.authConfig.silent_renew_url = '$APP_BASE_URL/assets/silent-refresh.html';
environment.authConfig.forbidden_route = '/auth/forbidden';
environment.authConfig.unauthorized_route = '/auth/unauthorized';
environment.authConfig.log_console_warning_active = Boolean(JSON.parse('$AUTH_LOG_WARNING_ACTIVE'));
environment.authConfig.log_console_debug_active = Boolean(JSON.parse('$AUTH_LOG_DEBUG_ACTIVE'));
environment.authConfig.max_id_token_iat_offset_allowed_in_seconds = 300;

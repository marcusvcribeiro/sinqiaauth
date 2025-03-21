import { AuthenticationConfig } from "@albert/authentication";

export const environment = {
  production: false,
  authConfig: null,
  sistema: "SQPIX",
  api: {
    ui: "https://api-hmg.sinqia.com.br/core/ui-manager/api/v2/",
    core: "https://api-hmg.sinqia.com.br/pix/gestao/j/v1",
    //core: "http://localhost:8781/v1",
    pix_mock: "http://localhost:8399/api/v1",
    pix: "https://api-hmg.sinqia.com.br/pix/gestao/d/api/v1",
    seg: "https://psti-hmg.sinqia.com.br/v1/api-bancos-seg-core",
    //seg: 'https://dev.sinqia.com.br/api-bancos-seg-core',
    //seg: "http://localhost:5000",
    relatorios:'https://psti-hmg.sinqia.com.br/bancos-spi-relatorios/api/v1',
     cob: "https://psti-hmg.sinqia.com.br/api-bancos-gcob-core/api",
     logLeg: 'https://psti-hmg.sinqia.com.br/aks/bancos-pix-api-log-legado'
     //logLeg:'http://localhost:5066'
  },
  defaultLanguage: "pt-BR",
  supportedLanguages: ["pt-BR"],
};
environment.authConfig = new AuthenticationConfig();
environment.authConfig.stsServer =
  "https://psti-hmg.sinqia.com.br/auth/realms/sinqia";
environment.authConfig.redirect_url = `${window.location.origin}/auth/post-login`;
environment.authConfig.client_id = "sq-bancos-pix-front";
environment.authConfig.response_type = "code";
environment.authConfig.scope = "openid profile email";
environment.authConfig.post_login_route = `dashboard`;
environment.authConfig.post_logout_redirect_uri = `${window.location.origin}/`;
environment.authConfig.start_checksession = true;
environment.authConfig.silent_renew = true;
environment.authConfig.silent_renew_url = `${window.location.origin}/assets/silent-refresh.html`;
environment.authConfig.forbidden_route = "/auth/forbidden";
environment.authConfig.unauthorized_route = "/auth/unauthorized";
environment.authConfig.log_console_warning_active = false;
environment.authConfig.log_console_debug_active = false;
environment.authConfig.max_id_token_iat_offset_allowed_in_seconds = 300;

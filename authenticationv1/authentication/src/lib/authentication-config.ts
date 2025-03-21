export class AuthenticationConfig {
  stsServer: string;
  redirect_url: string;
  client_id: string;
  response_type: string;
  scope: string;
  post_login_route: string;
  post_logout_redirect_uri: string;
  start_checksession: boolean;
  silent_renew: boolean;
  silent_renew_url: string;
  forbidden_route: string;
  unauthorized_route: string;
  log_console_warning_active: boolean;
  log_console_debug_active: boolean;
  max_id_token_iat_offset_allowed_in_seconds: number;
}

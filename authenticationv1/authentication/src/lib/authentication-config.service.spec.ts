import { TestBed } from '@angular/core/testing';
import { AuthenticationConfigService } from './authentication-config.service';


describe('AuthenticationConfigService', () => {
  let service: AuthenticationConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationConfigService],
    });

    service = TestBed.inject(AuthenticationConfigService);

  });

  it('Deve conseguir configurar a autenticação', () => {
    const config = {
      stsServer: 'http',
      redirect_url: 'http',
      client_id: 'http',
      response_type: 'http',
      scope: 'http',
      post_login_route: 'http',
      post_logout_redirect_uri: 'http',
      start_checksession: false,
      silent_renew: false,
      silent_renew_url: 'http',
      forbidden_route: 'http',
      unauthorized_route: 'http',
      log_console_warning_active: false,
      log_console_debug_active: false,
      max_id_token_iat_offset_allowed_in_seconds: 1
    };

    service.config.subscribe(v => {
      expect(v).toEqual(config);
    });

    service.setConfig(config);
  });
});

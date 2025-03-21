import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule as OidcModule, OidcConfigService } from 'angular-auth-oidc-client';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { environment } from '../../../environments/environment';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    OidcModule.forRoot()
  ],
  providers: [
    OidcConfigService,
    AuthService,
    AuthGuard
  ]
})
export class AuthModule {
  constructor(
    private oidcConfigService: OidcConfigService,
    private authService: AuthService
  ) {
    this.configureOidc();
  }

  private configureOidc() {
    this.oidcConfigService.onConfigurationLoaded.subscribe(() => {
      const config = {
        stsServer: environment.authConfig.stsServer,
        redirect_url: environment.authConfig.redirect_url,
        client_id: environment.authConfig.client_id,
        response_type: environment.authConfig.response_type,
        scope: environment.authConfig.scope,
        post_login_route: environment.authConfig.post_login_route,
        post_logout_redirect_uri: environment.authConfig.post_logout_redirect_uri,
        start_checksession: environment.authConfig.start_checksession,
        silent_renew: environment.authConfig.silent_renew,
        silent_renew_url: environment.authConfig.silent_renew_url,
        forbidden_route: environment.authConfig.forbidden_route,
        unauthorized_route: environment.authConfig.unauthorized_route,
        log_console_warning_active: environment.authConfig.log_console_warning_active,
        log_console_debug_active: environment.authConfig.log_console_debug_active,
        max_id_token_iat_offset_allowed_in_seconds: environment.authConfig.max_id_token_iat_offset_allowed_in_seconds
      };

      this.oidcConfigService.load_using_stsServer(config.stsServer);
    });
  }
}
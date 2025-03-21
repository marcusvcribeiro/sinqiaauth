import { LoaderModule } from '@albert/ui';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// tslint:disable-next-line
import { AuthModule, AuthWellKnownEndpoints, ConfigResult, OidcConfigService, OidcSecurityService, OpenIdConfiguration } from 'angular-auth-oidc-client';
import { first } from 'rxjs/operators';
import { AuthenticationConfig } from './authentication-config';
import { AuthenticationConfigService } from './authentication-config.service';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { LoadingPageComponent } from './component/loading-page/loading-page.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PostLoginComponent } from './component/post-login/post-login.component';
import { PostLogoutComponent } from './component/post-logout/post-logout.component';
import { SessionExpiredComponent } from './component/session-expired/session-expired.component';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';


@NgModule({
  declarations: [
    LoginComponent,
    PostLoginComponent,
    LogoutComponent,
    ForbiddenComponent,
    PostLogoutComponent,
    SessionExpiredComponent,
    UnauthorizedComponent,
    LoadingPageComponent
  ],
  imports: [
    LoaderModule,
    HttpClientModule,
    AuthModule.forRoot(),
    AuthenticationRoutingModule
  ],
  exports: [LoadingPageComponent],
  providers: [
    OidcConfigService

  ]
})
export class AuthenticationModule {
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private oidcConfigService: OidcConfigService,
    private authenticationConfigService: AuthenticationConfigService
  ) {
    this.authenticationConfigService.config
      .pipe(first())
      .subscribe((authenticationConfig: AuthenticationConfig) => {
        this.oidcConfigService.onConfigurationLoaded.subscribe((config: ConfigResult) => {
          const openIdconfig: OpenIdConfiguration = authenticationConfig as OpenIdConfiguration;
          const authWellKnownEndpoints: AuthWellKnownEndpoints = config.authWellknownEndpoints;
          this.oidcSecurityService.setupModule(openIdconfig, authWellKnownEndpoints);
        });

        oidcConfigService.load_using_stsServer(authenticationConfig.stsServer);
      });
  }
}

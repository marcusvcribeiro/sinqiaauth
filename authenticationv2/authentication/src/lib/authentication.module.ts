import { LoaderModule } from '@albert/ui';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { AuthModule, OidcConfigService, OpenIdConfiguration } from 'angular-auth-oidc-client';
import { first } from 'rxjs/operators';
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

export function configureAuth(oidcConfigService: OidcConfigService, authenticationConfigService: AuthenticationConfigService) {
    // let authConfig ;
    // // const authConfig: any = getConfig(authenticationConfigService);

    // authenticationConfigService.config
    // .pipe(first())
    // .subscribe( authenticationConfig => {
    //     console.log("authenticationConfig", authenticationConfig);
    //     authConfig = authenticationConfig as OpenIdConfiguration;
    //   });

      console.log('Carreguei o configureAuth');
      const res = () => {oidcConfigService.withConfig({
        stsServer:  'https://dev.sinqia.io/auth/realms/sinqia',
        redirectUrl: `${window.location.origin}/auth/post-login`,
        clientId: 'sq-previdencia' ,
        responseType: 'code' ,
        scope: 'openid profile email' ,
        postLoginRoute: `/` ,
        postLogoutRedirectUri: `${window.location.origin}/` ,
        silentRenew: true,
        silentRenewUrl: `${window.location.origin}/assets/silent-refresh.html` ,
        maxIdTokenIatOffsetAllowedInSeconds: 300,
        forbiddenRoute:  '/auth/forbidden',
        unauthorizedRoute: '/auth/unauthorized',
        startCheckSession: true,
      });
    };
      return () => res;
}

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
    OidcConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configureAuth,
      deps: [OidcConfigService, AuthenticationConfigService, ],
      multi: true,
    },
  ]
})
export class AuthenticationModule {
  constructor(){}
}
// export function getConfig(authenticationConfigService: AuthenticationConfigService ){
//   let config;
//     authenticationConfigService.config
//     .pipe(first())
//     .subscribe((authenticationConfig: AuthenticationConfig) => {
//       console.log(authenticationConfig);
//       config = authenticationConfig as OpenIdConfiguration ;
//     });
//     setTimeout(() => {
//       return config;
//     }, 1000);
// }
// async function msg(authenticationConfigService) {
//   const msg = await getConfig(authenticationConfigService);
//   console.log('Message:', msg);
//   return msg;
// }

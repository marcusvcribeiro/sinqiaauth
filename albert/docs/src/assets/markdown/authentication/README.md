# Authentication

Lib para automatizar autenticação através do padrão OAuth 2.0 com OpenID Connect.

## Forma de utilização
A primeira coisa a ser feita é instalar a dependência `@albert/authentication`, através do npm.

```bash
npm install @albert/authentication
```

### Core
Adicionar o módulo `AuthenticationModule` na sua aplicação.
Criar uma rota que redirecione a aplicação para as rotas do `AuthenticationModule`.

```typescript
const routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  { path: 'home', component: HomeComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    AuthenticationModule
  ],
  bootstrap: [AppComponent],
  providers: []
})
export class AppModule { }

```

Carregar a configuração de autenticação da sua aplicação dentro de algum service ou componente que carregue assim que a aplicação subir.

```typescript
import { Injectable } from '@angular/core';
import { AuthenticationConfigService, AuthenticationConfig } from '@albert/authentication';

@Injectable({ providedIn: 'root' })
export class AppConfigService {

  constructor(private uiManagerProviderConfig: UiManagerProviderConfig,
    private authenticationServiceConfig: AuthenticationConfigService) {
    const authenticationConfig: AuthenticationConfig = {
      stsServer: 'http://localhost:9999/auth/realms/sinqia',
      redirect_url: `${window.location.origin}/auth/post-login`,
      client_id: 'sq-bancos-pix-front',
      response_type: 'code',
      scope: 'openid profile email',
      post_login_route: `home`,
      post_logout_redirect_uri: `${window.location.origin}/`,
      start_checksession: true,
      silent_renew: false,
      silent_renew_url: `${window.location.origin}/assets/silent-refresh.html`,
      forbidden_route: '/auth/forbidden',
      unauthorized_route: '/auth/unauthorized',
      log_console_warning_active: false,
      log_console_debug_active: false,
      max_id_token_iat_offset_allowed_in_seconds: 300
    }

    this.authenticationServiceConfig.setConfig(authenticationConfig);
  }
}

```


No assets da sua aplicação adicionar o arquivo `./node_modules/@albert/authentication/lib/assets/`.
É importante colocar o `glob` para evitar erros na compilação.
```json
{"assets": [
  {
    "glob": "**/*",
    "input": "./node_modules/@albert/authentication/lib/assets/",
    "output": "./assets/"
  }
]}
```

Com isso, ao acessar a url raiz da sua aplicação você será redirecionado para a página de autenticação informada no seu STS.

### Interceptação
É possível utilizar um `HttpInterceptor` disponível na biblioteca para poder interceptar todas as requisições feitas para o back-end e setar o token de acesso para cada uma delas.

```typescript
const tokenInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
}
```

### Logout
Para fazer logout basta navegar até a url `/auth/logout` para ser redirecionado para o fluxo de logout.

```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {
  title = 'sinqia-angular';

  constructor(private router: Router) {
  }

  logout() {
    this.router.navigate(['/auth/logout']);
  }
}
```

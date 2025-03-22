# UIMNavigationProvider

Modulo responsável por integração do serviço de navegação.

## Como utilizar

Adicionar o módulo `UIMNavigationProviderModule` no modulo da sua aplicação.
Para utilizar o ui-manager-provider é necessário ter um `HttpInterceptor` que configure o token que vai ser trafegado para o back-end. No caso utilizaremos o `AuthenticationInterceptor` do módulo `AuthenticationModule` também acessível no alb-front  pelo link: (link para o md de authentication).
Exemplo de como fica o módulo da aplicação.

```typescript
@NgModule({
  declarations: [],
  imports: [
    UIMNavigationProviderModule,
    AuthenticationModule
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }
  ]
})
export class AppModule { }

```

Seguindo, devemos injetar o provider `UIMProviderConfig` em uma classe ou pagina que seja carregada antes da pagina na qual utilizaresmos o nosso `Navigation`. Após injetar esse provider devemos configurar a propriedade `url` dele com uma string cujo valor é a url do nosso ui-manager.

```typescript
import { Injectable } from '@angular/core';
import { UiManagerProviderConfig } from '@albert/ui-manager-provider';

@Injectable({ providedIn: 'root' })
export class AppConfigService {

  constructor(private uimProviderConfig: UIMProviderConfig,
    private authenticationServiceConfig: AuthenticationConfigService) {
    this.uimProviderConfig.url = 'http://localhost:7083/api/v1';
  }
}
```

Por fim devemos utilizar a diretiva `ui-manager-provider` no componente `alb-navigation`


```html
<alb-navigation albUIMNavigationProvider></alb-navigation>
```

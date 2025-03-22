# UIMDashboardProviderModule

Módulo responsável por integração do serviço de Dashboard.

## Como utilizar

Adicionar o módulo `UIMDashboardProviderModule` no módulo da sua aplicação.
Para utilizar o uim-dashboard-provider é necessário ter um `HttpInterceptor` que configure o token que vai ser trafegado para o back-end. No caso utilizaremos o `AuthenticationInterceptor` do módulo `AuthenticationModule` também acessível no alb-front  pelo link: (link para o md de authentication).
Exemplo de como fica o módulo da aplicação.

```javascript
import { UIMDashboardProviderModule } from '@albert/ui-manager-provider';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from '@albert/authentication';

@NgModule({
  declarations: [],
  imports: [
    UIMDashboardProviderModule,
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

Seguindo, devemos injetar os providers `UIMProviderConfig` e `DynamicLoaderConfigService` em uma classe ou página que seja carregada antes da página na qual utilizaremos o nosso `alb-dashboard`. Após injetar esse provider devemos configurar a propriedade `url` do `UIMProviderConfig` com a url base de onde está o serviço de dashboard do UI-Manager. Chamar o método `loadModulesConfiguration` do  `DynamicLoaderConfigService` para registrar os componentes da sua aplicação que podem ser utilizados como widgets. 

Para registrar um componente você deverá passar dois parâmetros: 
- key: valor correspondente à string relacionada ao component no ui-manager
- component: tipo do componente

```typescript
import { DynamicLoaderConfigService } from '@albert/dashboard';
import { UIMProviderConfig } from '@albert/ui-manager-provider';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private dynamicLoaderConfigService: DynamicLoaderConfigService, private uimConfig: UIMProviderConfig) {
    this.configDynamicLoaderService();
    this.uimConfig.url = 'http://localhost:7083/api/v1/';
  }

  private configDynamicLoaderService() {
    this.dynamicLoaderConfigService.loadComponentsConfiguration(
      [
        {
          key: 'TesteComponent',
          component: TesteComponent
        }
      ]
    )
  }
}

```

Por fim devemos utilizar a diretiva `albUIMDashboardProvider` no componente `alb-dashboard`


```html
<alb-dashboard albUIMDashboardProvider></alb-dashboard>
```


## Importante !
É importante frisar que caso algum componente cadastrado no back-end do Ui-Manager não esteja disponível em nenhum módulo configurado através do `DynamicLoaderConfigService`, ou caso o mesmo não tenha sido registrado, eles não serão exibidos. Caso algum widget já tenha sido criado previamente com esse componente, ele sera exibido como um Widget em branco no Dashboard correspondente.

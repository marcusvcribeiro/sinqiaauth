# Dashboard

Biblioteca criada com o intuito de criar Dashboards.
## Como utilizar

Importar modulo `DashboardModule` na aplicação

```javascript
import { DashboardModule } from '@albert/dashboard';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    DashboardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Com o módulo importado, você só precisa utilizar a tag `alb-dashboard` com seus devidos _Inputs_ e _Outputs_

```javascript
@Component({
  template: `<alb-dashboard [dashboards]="dashboards"
                            [availableWidgets]="availableWidgets"
                            (dashboardAdded)="addDashboard($event)"
                            (dashboardChanged)="changeDashboard($event)"
                            (dashboardDeleted)="deleteDashboard($event)"
              ></alb-dashboard>`
})
class TestComponent {

 availableWidgets: Widget[] = [
    {
      idWidget: 1,
      component: 'M1Comp1',
      height: 3,
      width: 2,
      name: 'M1Comp1',
      category: {
        id: 1,
        name: 'A'
      }
    }
  ]

  dashboards: Dashboard[] = [
    {
      name: 'Dashboard A',
      id: 1,
      widgets: []
    },
  ]

  addDashboard(dashboard: Dashboard) {
    console.log(`incluir dashboard: ${dashboard.id}`);
  }

  changeDashboard(dashboard: Dashboard) {
    console.log(`alterar dashboard: ${dashboard.id}`);
  }

  deleteDashboard(dashboard: Dashboard) {
    console.log(`excluir dashboard: ${dashboard.id}`);
  }
}

```

## Propriedades
O componente `alb-dashboard` possui as seguintes propriedades

### Input

| Propriedade    | Tipo          | Descrição                                         |
| -------------- | ------------- | ------------------------------------------------- |
| dashboards     | `Dashboard[]` | Lista de Dashboards utilizados.                   |
| availableWidgets  | `Widget[]`    | Lista de opções de Widgets que podem ser criados. |

### Output

| Propriedade    | Tipo      | Descrição                                                                            |
| -------------- | --------- | ------------------------------------------------------------------------------------ |
| dashboardAdded  | `EventEmitter<Dashboard>`  | Emite um evento toda vez que um Dashboard é incluído. O valor emitido é o Dashboard que foi incluído. |
| dashboardChanged  | `EventEmitter<Dashboard>`  | Emite um evento toda vez que um Dashboard é alterado. O valor emitido é o Dashboard que foi alterado. |
| dashboardDeleted  | `EventEmitter<Dashboard>`  | Emite um evento toda vez que um Dashboard é excluído. O valor emitido é o Dashboard que foi excluído. |

## Tipos

Classes utilizadas para tipagem dos objetos que servem de _Input_ e _Output_ do `alb-dashboard`.

```javascript
export class CategoriaWidget {
  icone?: string;
  id: number;
  nome: string;
}
```

```javascript
import { CategoriaWidget } from './categoria-widget';

export class Widget {
  idWidget: number;
  modulo: string;
  componente: string;
  nome?: string;
  altura?: number;
  largura?: number;
  coluna?: number;
  linha?: number;
  categoria?: CategoriaWidget;
}
```

```javascript
import { Widget } from './widget';

export class Dashboard {
  id?: number | string;
  nome?: string;
  configuracao?: string;
  widgets?: Widget[];
}
```

## Registrando componente com Dynamic Loader

É necessário configurar quais são os componentes que podem ser criados de forma dinâmica, para isso injete o provider `DynamicLoaderConfigService` em alguma classe de configuração. Na sequencia chame o metódo `loadComponentsConfiguration` do provider passando como parâmetro uma lista de componentes.

Para registrar um componente você deverá passar dois parâmetros: 
- key: valor correspondente à string relacionada a propriedade 'component' do objeto widget
- component: tipo do componente

```typescript
import { Injectable } from '@angular/core';
import { DynamicLoaderConfigService } from '@albert/dashboard';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor(private dynamicLoaderConfigService: DynamicLoaderConfigService) {
    this.configDynamicLoaderService();
  }

  private configDynamicLoaderService() {
    this.dynamicLoaderConfigService
    .loadComponentsConfiguration([{
      key: 'TesteComponent',
      component: TesteComponent
    }])
  }
}
```

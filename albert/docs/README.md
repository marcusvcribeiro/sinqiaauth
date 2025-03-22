# alb-docs

Esse projeto é responsável por armazenar todas as informações referentes a utilização dos componentes de nossa lib, além de mostrar os exemplos destes componente em prática.

## Processo de documentação

1. Primeiramente, deve-se criar o **README.md** detalhando a utilização de seu componente. Este arquivo deve estar dentro da pasta do componente gerado, no projeto angular.
2. No projeto da documentação, rodar o comando `npm run get-md` para atualizar todos os mds do projeto.
3. Crie um componente/página na pasta respectiva da categoria do componenete a ser documentado (ui/layout).
4. No módulo da página, importe o **SharedModule**. Ele contém todos os imports necessários para a criação de uma página da padrão.
5. Crie um RoutingModule para seu componente como o exemplo abaixo:

```javascript
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YourComponentDocComponent } from './box-doc.component';


const routes: Routes = [
  {
    path: '',
    component: YourComponentDocComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YourComponentDocRoutingModule { }
```

6. Importe seu RoutingModule no módulo principal da página.
7. Adicione sua rota no menu presente no *app.component.ts*.
8. Faça o seu exemplo e importe seu README.md no html de seu componente, como o exemplo abaixo:

```html
<doc-template>

  <docTemplateTitle> YourComponent</docTemplateTitle>

  <docTemplateExample>
    <alb-your-component></alb-your-component>
  </docTemplateExample>

  <docTemplateCode>
    <markdown [src]="'../../assets/markdown/your-component/README.md'"></markdown>
  </docTemplateCode>

</doc-template>
```

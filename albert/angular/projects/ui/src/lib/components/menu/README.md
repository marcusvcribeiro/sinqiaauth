# Menu

## Alb-menu

O componente **alb-menu** é responsável por renderizar um menu com uma listagem de itens através de qualquer outro componente.
Os itens que serão exibidos na listagem devem ser passados como uma lista de **alb-menu-item** dentro da tag **alb-menu**.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

### Propriedades

## Input

| Propriedade| Tipo         | Descrição                                                                         |
|------------|--------------|-----------------------------------------------------------------------------------|
| disabled   | `boolean`    | Propriedade utilizada para desabilitar o menu.                                    |
| icon       | `string`     | Propriedade utilizada para definir um icone para o componente                     |

## Alb-menu-item

O componente **alb-menu-item** tem a responsabilidade de definir as informações relacionadas aos itens de menu que serão exibidos no componente **alb-menu**.
É possível informar seu label e função de click de forma simplificada como input e output, mas tambêm existe a possibilidade passar uma tag `<ng-template albMenuTemplate>` dentro dele, assim qualquer coisa informada dentro desse ng-template será exibido como label do item no menu.

### Propriedades

## Input

| Propriedade| Tipo         | Descrição                                                                         |
|------------|--------------|-----------------------------------------------------------------------------------|
| label      | `string`     | Aceita uma string que será exibida como label do menu item.                       |
| id         | `string`     | Id do menu item. Caso não informado é gerado automaticamente com uso do `uuidv4`. |
| disabled   | `boolean`    | Propriedade utilizada para desabilitar o item do menu.                            |

## Output

| Propriedade| Tipo       | Descrição                                                              |
|------------|------------|------------------------------------------------------------------------|
| click      | `Function` | Aceita uma `function` que será executada quando o item for selecionado.|

## Alb-menu-template

A diretiva **albMenuTemplate** extende a class `CdkPortal` do `@angular/cdk`. Assim, quando utilizada em conjunto com um `ng-template`, a diretiva torna possível a criação de um template que serve de label para um menu item.



## Exemplo de uso

### Import
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MenuModule } from 'projects/ui/src/lib';
import { AppComponent } from './app.component';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

### HTML

```html
<div>
  <alb-menu>
    <alb-menu-item (click)="clickMenu('Template 1')">
      <ng-template albMenuTemplate>Template 1</ng-template>
    </alb-menu-item>
    <alb-menu-item label="Template 2" id="2" (click)="clickMenu($event)">
    </alb-menu-item>
    <alb-menu-item label="3" id="3" (click)="clickMenu($event)" [disabled]="true">
    </alb-menu-item>
  </alb-menu>
</div>

<alb-menu [disabled]="true">
  <alb-menu-item label="1" id="1" (click)="clickMenu($event)">
  </alb-menu-item>
</alb-menu>

<alb-menu [disabled]="true" icon="person">
  <alb-menu-item label="Template icon" id="1" (click)="clickMenu($event)">
  </alb-menu-item>
</alb-menu>

```

### TypeScript

```javascript
import { Component } from '@angular/core';
import { MenuItem } from 'projects/ui/src/lib/components/menu/menu-item';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html'
})
...
export class MyComponent {

  clickMenu(menu) {
    console.log(menu);
  }
}

```

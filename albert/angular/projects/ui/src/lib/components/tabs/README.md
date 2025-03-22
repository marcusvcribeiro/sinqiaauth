# TabGroup

O componente **alb-tab-group** é usado para criar a estrutura de _tabs_.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Output

| Propriedade       | Tipo                  | Descrição                                                           |
| ----------------- | --------------------- | ------------------------------------------------------------------- |
| selectedTabChange | `EventEmmiter<any>`   | Emite o _Id_ da _tab_ selecionada toda vez que uma _tab_ é trocada. |

## Tab

O componente **alb-tab** deve passado dentro de uma tag **alb-tab-group** para servir como _tab_.

### Input

| Propriedade   | Tipo          | Descrição                                                   |
| -----------   | --------------| ----------------------------------------------------------- |
| label         | `string`      | Label da _tab_                                              |
| id            | `any`         | Id da _tab_, gerado de forma randômica se não informado     |
| disabled      | `boolean`     | Indica se a _tab_ deve vir desabilitada                     |
| selected      | `boolean`     | Indica se a _tab_ deve vir selecionada                      |

## Exemplos de uso

### Importando no projeto

Primeiramente deve-se importar o modulo `TabsModule` no projeto

### app.module.ts

```javascript
import { TabsModule } from '@albert/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    TabsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### HTML

```html
<alb-tab-group (selectedTabChange)="selectedTabChange($event)">
  <alb-tab label="Tab 1"></alb-tab>
  <alb-tab label="Tab 2" id="tab2"></alb-tab>
  <alb-tab label="Tab 3" selected></alb-tab>
  <alb-tab label="Tab 4" disabled></alb-tab>
</alb-tab-group>
```

É possível tambêm informar templates para o Header e Body de uma _tab_.
Para tal é necessário utilizar a diretiva `albTabHeaderWrapper` nos templates de Header e a diretiva `albTabBodyWrapper` nos templates de Body.
Além disso tambêm pode ser passado como conteúdo do _tabGroup_ qualquer elemento marcado com a propriedade `aside` para aparecer ao lado direito das _tabs_, 
ou `aside-before` para aparecer ao lado esquerdo das _tabs_. Acrescente as classes  **tab-aside** e, **start** ou **end** ao elemento para definir o alinhamento dos elementos filhos.

```html
<alb-tab-group (selectedTabChange)="selectedTabChange($event)">
  <alb-tab>
    <ng-template albTabHeaderWrapper>Tab 1</ng-template>
    <ng-template albTabBodyWrapper>Conteudo da TAB 1</ng-template>
  </alb-tab>
  <div aside class="tab-aside end">
    <button (click)="addTab()">Click</button>
  </div>
</alb-tab-group>
```
```html
<alb-tab-group (selectedTabChange)="selectedTabChange($event)">
  <alb-tab>
    <ng-template albTabHeaderWrapper>Tab 1</ng-template>
    <ng-template albTabBodyWrapper>Conteudo da TAB 1</ng-template>
  </alb-tab>
  <div aside-before class="tab-aside start">
    <button (click)="addTab()">Click</button>
  </div>
</alb-tab-group>
```

### Notas

* Caso uma tab esteja com a propriedade `label` informada, ela ira se sobressair ao template do header caso informado tambêm.
* As diretivas `albTabHeaderWrapper` e `albTabBodyWrapper`, são independentes e portanto não precisam ser informadas sempre em conjunto.

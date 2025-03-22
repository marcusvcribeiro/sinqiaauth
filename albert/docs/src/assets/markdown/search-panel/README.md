# Search Panel

Para a utilização do *alb-search-panel* devemos importar os módulos *SearchPanelModule*, *PanelModule*, *ChipsModule* e *BoxIconModule* ou o módulo *UiModule. Além disso, devemos adicionar no **providers* do seu módulo o *PanelService*.

O componente *alb-search-panel* é um componente responsável pela criação de uma pesquisa que utiliza dois componentes: um deles é o *Box Icon*, que fica com os *Chips* da pesquisa e o outro é o *Panel*, onde ficam os filtros da pesquisa. O componente **alb-search-panel** pode ser utilizado dentro de uma div ou diretamente em seu layout e foi feito para se adequar ao container que se encontra. Para utilizar o componente, é necessário utilizar a propriedade *[options]* recebendo o componente que terá os filtros da pesquisa.

## Inputs

| Propriedade    | Tipo                               |  Descrição                                                                                                                                           |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| options      | `SearchPanelOptions`                            | Aceita um componente que contenha os filtros da pesquisa.                                                                               |
## Interfaces
O componente onde estiverem os filtros da pesquisa deve ter a interface *SearchPanelChipsInterface* implementada para seu funcionamento correto.

## Diretivas do Search Panel

No componente que contenha os filtros da pesquisa é possível utilizar as seguintes diretivas: 

| Diretiva    | Descrição                                                                                                                                           |
| -------------- |  ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| placeholder      | Define o placeholder que aparecerá no chip de determinado filtro na pesquisa. Por padrão, o chip assumiár o placeholder definido no *input* do filtro.                                                                               |
| chipPlaceholder       | Caso opte por utilizar um placeholder no Chip que seja diferente do placeholder do input (por exemplo para abreviar o placeholder), essa diretiva poderá ser utilizada e **substutuirá o placeholder** definido.                                                                               |
| disableChipPlaceholder      | Utilizada para esconder o placeholder no Chip.                                                                               |
| chipValueTransformer      | Função para converter o valor do input para outro valor de exibição. Se for string vai ser utilizado como chave para pegar o valor do objeto                                                                                |
| change      | Evento disparado quando é modificado o chip.                                                                               |

## Exemplos

### HTML

### app.component.html  

```html 

<h1>Hello Albert!</h1>
<alb-search-panel [options]="searchPanelOptions"></alb-search-panel>
```
### filtros.component.html  

```html
<h3>Hello Albert!</h3>

<div class="inputs" [formGroup]="form">
    <alb-input placeholder="Teste chips" formControlName="teste" alb-search-panel-chip></alb-input>
    <alb-input placeholder="Teste chips 2" formControlName="teste2" alb-search-panel-chip></alb-input>
    <alb-input placeholder="Teste chips 6" formControlName="teste6" alb-search-panel-chip></alb-input>
    <ng-select alb-search-panel-chip chipValueTransformer="label"
                appendTo="body" 
                class="alb-ng-select" 
                [items]="list" 
                placeholder="Select teste chips" 
                formControlName="select"></ng-select>
</div>

<div alb-panel-actions>
    <button alb-button>Pesquisar</button>
</div>
```

### TypeScript

### app.component.ts  

```javascript
  searchPanelOptions: SearchPanelOptions = {
    component: FiltrosComponent
  };
```

### filtros.component.ts  

```javascript
  @ViewChildren(SearchPanelChipDirective) chips: QueryList<SearchPanelChipDirective>;
  
  @Input() chipsComponent: ChipsComponent;
```

## Disparar evento quando um chip for removido

No component que tiver a diretiva alb-search-panel-chip você pode utilizar o output *destroy*, ele é executado quando um chip é removido

### filtros.component.html 
```html
<alb-input placeholder="Teste chips" formControlName="teste" alb-search-panel-chip (destroy)="exemploDestroy()"></alb-input>
```

## Outputs do componente a ser instanciado

Para tratar os outputs, você deve implementar um método disparado no output created do searchPanel. 
Esse método vai receber uma váriavel do tipo PanelRef que contém a referencia para o seu componente informado no options do SearchPanelComponent
Com isso você consegue realizar o subscribe implementado no seu componente.

### HTML

### app.component.html  

```html
<alb-search-panel [options]="searchPanelOptions" (created)="onSearchPanelCreated($event)"></alb-search-panel>
```

### TypeScript
### app.component.ts  

```javascript
  async onSearchPanelCreated(panelRef: PanelRef) {
    panelRef.component.instance.meuOutput.subscribe(valor => console.log(valor));
  }
```
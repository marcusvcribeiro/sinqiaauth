# NavbarSimple

O componente **alb-navbar-simple** é uma seção que irá conter os links para a navegação para outras páginas.
Para isso ele recebe um Input `items` do tipo `NavbarSimpleItem` para montar a hierarquia do navbar.
Além disso, ele possui um Output para avisar quando ocorreu uma ação que deveria fechar o navbar.

## Dependências

Você deve possuír o módulo `RouterModule`, com rotas configuradas para utilizar este componente. E adicionar o componente ```<router-outlet>``` para realizar o controle das navegação.
Você pode ver [mais sobre aqui!](https://angular.io/guide/router)

## Input

| Propriedade | Tipo     | Descrição                                                                                            |
| ------------| -------- | ---------------------------------------------------------------------------------------------------- |
| items       | `NavbarSimpleItem[]`  | Aceita um `array` de `NavbarSimpleItem` que define a árvore de items para gerar a lista de navegação.|

## Outputs

| Propriedade | Tipo                             | Descrição                                          |
| ------------| -------------------------------- | -------------------------------------------------- |
| changeItem  | `EventEmitter<NavbarSimpleItem>` | Emite o item da lista que foi selecionado.         |
| mouseLeave  | `EventEmitter<MouseEvent>`       | Emite evento quando o mouse sai do `SidenavSimple`.|

## Exemplo de uso

```html
<alb-navbar-simple [items]="items" (closeNavbar)="closeNavbar()"></alb-navbar-simple>
```

## NavbarSimpleItem

O componente **alb-navbar-simple-item** é um componente apenas para mostrar os nomes (dos links para as páginas) com a estilização nescessária. Para isso ele recebe um input `items` que é um array do tipo `NavbarSimple` para montar a hierarquia do navbar.

### Input

| Propriedade | Tipo     | Descrição                                                                                     |
| ------------| -------- | --------------------------------------------------------------------------------------------- |
| items       | `array`  | Aceita um `array` de `NavbarSimpleItem` que que deve conter a lista de itens do navbar-simple.|

## Exemplo de uso

### HTML

```html
<alb-navbar-simple-item [items]="items"></alb-navbar-simple-item>
```
### TypeScript

```javascript
const items: NavbarSimpleItem[] = [
  {
    name: 'Indice',
    children: [
      {
        name: 'Subitem 1',
        path: '/page-1',
      },
      {
        name: 'Subitem 2',
        path: '/page-2',
      }
    ]
  }
];
```

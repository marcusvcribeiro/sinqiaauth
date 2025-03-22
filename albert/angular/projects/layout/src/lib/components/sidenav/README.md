# Sidenav

O componente **alb-sidenav** é um componente responsável por listar os ícones e os nomes dos menus.
Ele deve receber um input **items** que é um array do tipo **Sidenav**.
Um segundo input **selectedItem** do tipo **Sidenav** se algum item deve ser marcado como selecionado.
Aleḿ disso, há um output **sidenavClick** para emitir um evento sempre que um item do sidenav for clicado.

## Dependências

Você deve possuír o módulo `RouterModule`, com rotas configuradas para utilizar este componente. E adicionar o componente ```<router-outlet>``` para realizar o controle das navegação.
Você pode ver [mais sobre aqui!](https://angular.io/guide/router)

## Inputs

| Propriedade | Tipo           | Descrição                                                                  |
| ----------- | ------------   | ---------------------------------------------------------------------------|
| items       | `SidenavItem[]`| Aceita um `array` de `SidenavItem` que define os elementos do sidenav.     |
| selectedItem| `SidenavItem`  | Aceita um `SidenavItem` que define o item do sidenav que está selecionado. |

## Output

| Propriedade  | Tipo                        | Descrição                                                 |
| ------------ | --------------------------- | --------------------------------------------------------- |
| sidenavClick | `EventEmitter<SidenavItem>` | Emite um objeto contendo informações sobre o item clicado.|

## Exemplo de uso

### HTML

```html
<alb-sidenav [selectedItem]="selectedItem" [items]="items" (sidenavClick)="sidenavClick($event)"></alb-sidenav>
```

### TypeScript

```javascript
const items = [
  {
    icon: 'work',
    name: 'Home',
    path: '/page-1'
  },
  {
    icon: 'star_border',
    name: 'Favoritos',
    children: [
      {
        name: 'Sub-item',
        path: '/page-2',
      },
    ],
  }
];
```

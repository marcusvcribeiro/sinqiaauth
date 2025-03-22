# Navigation

O componente **alb-navigation** será responsável pela criação da area de navegação no lado esquerdo da tela.
Para funcionar ele deve receber como um input 'items' do tipo Navigation para montar o menu.

Este componente faz a manutenção dos elementos do [alb-sidenave](https://dev.sinqia.io/albert/docs/layout/sidenav) e  do componente [alb-navbar-full](https://dev.sinqia.io/albert/docs/layout/navbar-full). Recomendamos utilizar o componente **alb-navigation** ao invés de utilzar o **alb-sidenav** e **alb-navbar-full** separadamente

## Dependências

Você deve possuír o módulo `RouterModule`, com rotas configuradas para utilizar este componente. E adicionar o componente ```<router-outlet>``` para realizar o controle das navegação.
Você pode ver [mais sobre aqui!](https://angular.io/guide/router)

## Inputs

| Propriedade | Tipo    | Descrição                                                                                |
| ----------- | ------- | ---------------------------------------------------------------------------------------- |
| item        | `NavigationItem[]` | Aceita um `array` de `NavigationItem` que define a lista de items de navegação.          |
| offsetAside | `number`| Aceita um `number` que define o nível para realizar a divisão de navegação do NavbarFull.|
| urlPath       | `string`  | Aceita uma `string` contendo o caminho que é adicionado a URL base da aplicação. Em alguns projetos é feito uma configuração no docker que adiciona uma string a URL base da aplicação, por exemplo, https://dev.sinqia.io é a URL base e no docker é adicionado a string albert/docs/ para ficar https://dev.sinqia.io/albert/docs/. Essa string deve ser passada como parâmetro para o funcionamento correto de abrir em nova aba|
| changeTabTitle | `boolean` | Booleano para habilitar a troca do nome do título da aba durante a navegação |

## Output

| Propriedade | Tipo                          |  Descrição                               |
| ----------- | ------------------------------| ---------------------------------------- |
| changeItem  | `EventEmitter<NavigationItem>`| Emite o item do menu que foi selecionado.|
| changeFavoriteItem | `EventEmitter<NavigationItem>` | Emite o item (des)selecionado como favorito. |
| changeFavoriteItemList | `EventEmitter<NavigationItem[]>` | Emite a lista do menu após (des)selecionar um item como favorito. |

## Exemplo de uso simples (apenas com sidenav)

### HTML

```html
 <alb-container>
   <alb-navigation [items]="items" class="alb-container-sidenav"></alb-navigation>
   <div class="alb-container-body">
    <router-outlet></router-outlet>
   </div>
 </alb-container>
```

### TypeScript

 ```javascript
items: NavigationItem[] = [
  {
    id: '1',
    name: 'Home',
    icon: 'work',
    path: '/page-2',
  },
  {
    id: '2',
    name: 'Favorito',
    icon: 'today',
    path: '/page-2',
  },
  {
    id: '3',
    name: 'Star',
    icon: 'star',
    path: '/page-3',
  },
]
 ```

## Exemplo de uso de navegação com NavbarSimple

Para habilitar um NavbarSimple, basta adicionar a propriedade ```type: 'simple'```

### TypeScript

```javascript
items: NavigationItem[] = [
  {
    id: '1',
    name: 'Home',
    icon: 'work',
    path: '/page-2',
  },
  {
    id: '2',
    name: 'Favorito',
    icon: 'today',
    children: [
      {
        name: 'NavbarSimple',
        children:
        [
          {
            name: 'Item 1',
            children: [
              {
                name: 'Subitem 1',
                path: '/page-1',
              }
            ]
          },
          {
            name: 'Item 2',
            path: '/page-2',
          },
          {
            name: 'Item 3',
            path: '/page-3',
          },
        ]
      }
    ],
    type: 'simple',
  },
]
```

## Exemplo de uso de navegação com NavbarFull

Para habilitar um NavbarSimple, basta adicionar a propriedade ```type: 'full'```

### TypeScript

```javascript
items: NavigationItem[] = [
  {
    id: '1',
    name: 'Home',
    icon: 'work',
    path: '/page-1',
  },
  {
    id: '1',
    name: 'Indice',
    icon: 'tab',
    children: [
      {
        name: 'NavbarFull 1',
        children: [
          {
            name: 'Item 1',
            path: '/page-1',
          },
          {
            name: 'Item 2',
            path: '/page-2',
          },
          {
            name: 'Item 3',
            path: '/page-3',
          },
          {
            name: 'Item 4',
            path: '/page-4',
          },
        ]
      },

    ],
    type: 'full',
  },
]
```

## Exemplo de uso de navegação com NavbarFull com menu de separação lateral

Para utilizar o modo de visualização de divisão lateral do NavbarFull basta adicionar a prop ```\[offsetAside\]```, com o nivel da quantidade para realizar
a estrutura de árvore:

### HTML

```html
  <alb-navigation [items]="items" class="alb-container-sidenav" [offsetAside]="1"></alb-navigation>
```

## Exemplo de uso do Navbar com Output de Favoritos

Toda vez que for clicado no icone de favoritos, o navigation tem a opção de retornar o item selecionado ou a lista completa do menu através de Output's.

Caso não seja passado a propriedade **favorite** no JSON do menu, os itens são inicializados com a propriedade **favorite** falsa.

### HTML

```html
  <alb-navigation [items]="items" (changeFavoriteItem)="changeFavoriteItem($event)" (changeFavoriteItemList)="changeFavoriteItemList($event)"></alb-navigation>
```

### TypeScript

```javascript
items: NavigationItem[] = [
  {
    id: '1',
    name: 'Indice',
    icon: 'tab',
    children: [
      {
        name: 'NavbarFull 1',
        children: [
          {
            name: 'Item 1',
            path: '/page-1',
            favorite: true
          },
          {
            name: 'Item 2',
            path: '/page-2',
            favorite: false
          }
        ]
      },

    ],
    type: 'full',
  },
]

changeFavoriteItem(event) {
  console.log('Item Favorito', event);
}

changeFavoriteItemList(event) {
  console.log('Lista de Favoritos', event)
}
```
## Exemplo de uso de navegação com mudança no título da aba

Para que o título da aba mude de acordo com a navegação do usuário no Navbar, é preciso adicionar a propriedade ```[changeTabTitle]=true``` na tag **alb-navigation**.

```html
<alb-navigation [changeTabTitle]="true"></alb-navigation>
```

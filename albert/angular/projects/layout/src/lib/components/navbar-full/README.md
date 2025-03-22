# NavbarFull

O componente **alb-navbar-full** gera uma área de navegação completa de uma aplicação.

## Dependências

Você deve possuír o módulo `RouterModule`, com rotas configuradas para utilizar este componente. E adicionar o componente ```<router-outlet>``` para realizar o controle das navegação.
Você pode ver [mais sobre aqui!](https://angular.io/guide/router)

Além disso, você precisará do `NgSelectModule` para o que o Navbar Full opere como esperado. A instalação pode ser vista [neste link](https://www.npmjs.com/package/@ng-select/ng-select). Para o funcionamento visual correto dos estilos, será necessário também importar o arquivo correspondente no `styles.scss` de seu projeto, seguindo o exemplo a seguir: `@import "~@ng-select/ng-select/themes/default.theme.css";`.

## Inputs

| Propriedade | Tipo     | Descrição                                                                                          |
| ------------| -------- | -------------------------------------------------------------------------------------------------- |
| offsetAside | `number` | Aceita um `number` que define o layout do menu em módulos em grupo. Caso essa propriedade não receba nenhum valor numérico, será criado um layout default.|
| items       | `NavbarFullItem[]`  | Aceita um `array` de `NavbarFullItem` que define a árvore de items para gerar a lista de navegação.|
| urlPath       | `string`  | Aceita uma `string` contendo o caminho que é adicionado a URL base da aplicação. Em alguns projetos é feito uma configuração no docker que adiciona uma string a URL base da aplicação, por exemplo, https://dev.sinqia.io é a URL base e no docker é adicionado a string albert/docs/ para ficar https://dev.sinqia.io/albert/docs/. Essa string deve ser passada como parâmetro para o funcionamento correto de abrir em nova aba|
| changeTabTitle | `boolean` | Aceita um booleano para alterar o título da aba ao clicar em um item do índice.|

## Output

| Propriedade | Tipo                           | Descrição |
| ------------| ------------------------------ | --------------------------------------------------------------------------- |
| changeItem  | `EventEmitter<NavbarFullItem>` | Emite o item que foi selecionado ou emite `null` quando o botão de 'Fechar' receber clique.|

## alb-navbar-full-aside

O componente **alb-navbar-full-aside** é responsável por exibir a listagem de itens do menu em formato aside.

### Input

| Propriedade | Tipo     | Descrição                                                                        |
| ------------| -------- | -------------------------------------------------------------------------------  |
| items | `NavbarFullItem` | Aceita um `NavbarFullItem` que define os itens que devem ser exibidos no menu. |

## alb-navbar-full-item

O componente **alb-navbar-full-item** é responsável por exibir a listagem de itens do menu.

### Inputs

| Propriedade | Tipo       | Descrição                                                                      |
| ------------| ---------- | -------------------------------------------------------------------------------|
| items | `NavbarFullItem` | Aceita um `NavbarFullItem` que define os itens que devem ser exibidos no menu. |
| index | `number`         | Aceita um `number` que define o index do item na listagem.                     |

## Exemplo de uso

### HTML

```html
<alb-navbar-full [items]="items" [child]="childSelected" parent="parentSelected" (itemSelected)="onItemSelected($event)"></alb-navbar-full>
```
### TypeScript

```javascript
const items: NavbarFullItem[] = [
  {
    id: '1',
    name: 'Test 1',
    children: [
      {
        id: '1-1',
        name: 'Test 1-1',
        children:
        [
          {
            id: '1-1-1',
            name: 'Test-1-1-1',
            path: '/page-1',
          },
          {
            id: '1-1-2',
            name: 'Test-1-1-2',
            path: '/page-2'
          }
        ]
      }
    ]
  }
];
```

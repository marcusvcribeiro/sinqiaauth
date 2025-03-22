# Select

O componente de Select utilizado no Albert é o **ng-select**. Para utilização deste componente, basta seguir os seguintes passos:

## Passo 1

Caso ainda não tenha instalado o **ng-select** no seu projeto, [clique aqui](https://www.npmjs.com/package/@ng-select/ng-select) para baixar a versão compatível com o seu projeto.

## Passo 2

No seu arquivo **module.ts**, importar os seguintes módulos: **NgSelectModule**

## Passo 3

Adicionar no **style.scss** do projeto o estilo padrão do ng-select: **@import '~@ng-select/ng-select/themes/default.theme.css';**

## Passo 4

Caso ainda não tenha instalado o pacote **Styles** do Albert, seguir o [**passo 4** do Get-Started](https://dev.sinqia.io/albert/docs/utils/get-started). É nescessário instalar o pacote styles do Albert, pois ele ja possui os estilos nescessários para seguir o padrão Sinqia

## Passo 4

Certifique-se de estar utilzando a classe **alb-ng-select** dentro da tag **ng-select**

## Mais informações

Para mais informações e detalhes de como usar o **ng-select**, [clique aqui](https://github.com/ng-select/ng-select)

## Exemplo de uso

### HTML

```html
<ng-select class="alb-ng-select" [items]="list" placeholder="Placeholder">
</ng-select>
```

```javascript
list = [
  {
    label: 'Label 1',
    key: 'label1'
  },
  {
    label: 'Label 2',
    key: 'label2'
  },
];
```

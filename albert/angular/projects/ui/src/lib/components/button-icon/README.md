# ButtonIcon

A diretiva **alb-button-icon** permite utilizar um ícone do [**material design**](https://material.io/resources/icons/) dentro de um botão.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade | Tipo      | Descrição                                                                              |
|-------------|-----------|----------------------------------------------------------------------------------------|
| icon        | `string`  | Aceita uma `string` que define qual ícone do material design aparecerá dentro do botão.|
| pure        | `boolean` | Aceita um `boolean` que define se o botão estará em sua forma pura ou não.             |

## Exemplo de uso

Segue um exemplo para utilizar a diretiva **alb-button-icon**:

### HTML

```html
<button alb-button-icon icon="search"></button>
```

```html
<button alb-button-icon icon="search" pure></button>
```

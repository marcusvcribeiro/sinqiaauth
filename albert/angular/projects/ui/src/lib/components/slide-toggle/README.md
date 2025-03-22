# SlideToggle

O componente **alb-toggle-slide** é utilizado para simular a utilização de um checkbox.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade     | Tipo      | Descrição                                                                       |
|-----------------|-----------|---------------------------------------------------------------------------------|
| name            | `string`  | Aceita uma `string` que define o atributo `name` nativo do HTML.                |
| checked         | `boolean` | Aceita um `boolean` que define o valor do campo.                                |
| disabled        | `boolean` | Aceita um `boolean` que define se o campo está desabilitado ou não.             |
| ariaLabel       | `string`  | Aceita uma `string` que define o atributo `aria-label` nativo do HTML.          |
| ariaLabelledBy  | `string`  | Aceita uma `string` que define o atributo `aria-labelledby` nativo do HTML.     |
| label           | `string`  | Aceita uma `string` que define a string que ficará ao lado direito do toggle.   |

## Outputs

| Output     | Descrição                                                                       |
|------------|---------------------------------------------------------------------------------|
| onChange   | Retorna um **boolean** que define o valor do campo                              |

## Exemplo de uso

### HTML

```html
<alb-slide-toggle label="Alterne"></alb-slide-toggle>
```

```html
<alb-slide-toggle label="Alterne" name="toggle" checked></alb-slide-toggle>
```

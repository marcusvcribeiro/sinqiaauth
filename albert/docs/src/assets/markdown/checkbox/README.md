# Checkbox

O componente **alb-checkbox** é um componente customizado de da tag html *input* com o a propriedade *type=checkbox*. Ela esta seguindo o padrão de cores definido no design system.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade    | Tipo      | Descrição                                                             |
| -------------- | --------- | --------------------------------------------------------------------- |
| value          | `boolean` | Aceita um `boolean` que define se o botão deve estar _checked_ ou não.|
| label          | `string`  | Aceita uma `string` que define o rótulo do checkbox.                  |
| disabled       | `boolean` | Aceita um `boolean` que define se o botão está desabiltiado ou não.   |
| indeterminate  | `boolean` | Aceita um `boolean` que define se o botão está indeterminado ou não.  |

## Exemplo de uso

### HTML

```html
<alb-checkbox label="Apenas um checkbox"></alb-checkbox>
```

```html
<alb-checkbox label="Apenas um checkbox" [value]="true"></alb-checkbox>
```

```html
<alb-checkbox label="Apenas um checkbox" indeterminate></alb-checkbox>
```

```html
<alb-checkbox label="Apenas um checkbox" disabled></alb-checkbox>
```

```html
<alb-checkbox label="Apenas um checkbox" indeterminate disabled></alb-checkbox>
```

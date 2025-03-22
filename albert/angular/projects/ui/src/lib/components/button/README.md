# Button

A diretiva **alb-button** deve ser utilizada em conjunto a uma tag HTML button. Ela irá adicionar os estilos necessários na tag **button** de acordo com a paleta de estilos definida. 

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

O **alb-button** possui as seguintes propriedades:

## Inputs

| Propriedade | Tipo                                | Descrição                                                                                                                     |
|-------------|------------------------------------ |------------------------------------------------------------------------------------------------------------------------------ |
| type        | `string<'primary','secondary', 'tertiary', 'ghost'>` | Aceita uma `string` que define o tipo do botão. Aceita os valores `primary`, `secondary`, `tertiary` e `ghost`. Por default o valor é `primary`. |
| color       | `string<'accent','success','warn', 'link'>` | Aceita uma `string` que define a cor do botão. Aceita os valores  `warn` ou `success` para type primary, `link` para type secondary e `accent` para manter a paleta padrão de qualquer tipo. Por default o valor é `accent`.|
| size        | `string<'small','medium','large'>` | Aceita uma `string` que define o tamanho do botão. Aceita os valores `small`, `medium` e `large`. Por default o valor é `large`.|
| iconOnly    | `boolean` | Aceita um `boolean` que define se é um botão apenas com ícone. |
| icon        | `string`  | Aceita uma `string` que define o ícone do Material Design que será exibido à esquerda ou no modo onlyIcon. |
| iconRight   | `string`  | Aceita uma `string` que define o ícone do Material Design que será exibido à direita. |
| disabled    | `boolean` | Aceita um `boolean` que define se o botão está desabilitado ou não. |

## Exemplo de uso

### HTML

```html
<button alb-button>Botão</button>

```html
<button alb-button type="primary" color="success">Botão</button>
```

```html
<button alb-button type="primary" color="warn" size="large">Botão</button>
```

```html
<button alb-button type="secondary" size="medium">Botão</button>
```

```html
<button alb-button type="tertiary" size="medium">Botão</button>
```

```html
<button alb-button type="tertiary" color="link" size="small">Botão</button>
```

```html
<button alb-button type="ghost" size="small">Botão</button>

```html
<button alb-button disabled size="small">Botão</button>
```

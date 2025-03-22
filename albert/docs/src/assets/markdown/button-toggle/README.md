# ButtonToggleGroup

A diretiva **alb-button-toggle-group** é utilizada como tag pai dos componentes **alb-button-toggle**.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade | Tipo     | Descrição                                                                                   |
|-------------|----------|---------------------------------------------------------------------------------------------|
| direction   | `string<'vertical','horizontal'>` | Aceita uma `string` que define a direção que os botões serão organizados. Aceita os valores `horizontal` e `vertical`.|

## Output

| Propriedade | Tipo                                  | Descrição                   |
|-------------|---------------------------------------|-----------------------------|
| change      | `EventEmitter<ButtonToggleComponent>` | Emite botão que foi clicado.|

## ButtonToggle

O componente **alb-button-toggle** deve ser utilizada como filho da diretiva **alb-button-toggle-group**. Este é responsável pelo agrupamento de cada botão. Suas propriedades são as seguintes:

Esse componente aceita o seguinte input:

| Propriedade | Tipo      | Descrição                                                             |
|-------------|-----------|-----------------------------------------------------------------------|
| id          | `boolean` | Aceita um `boolean` que define o atributo `id` nativo do HTML.        |
| checked     | `boolean` | Aceita um `boolean` que define se o botão deve estar _checked_ ou não.|
| disabled    | `boolean` | Aceita um `boolean` que define se o botão está desabiltiado ou não.   |
| tabIndex    | `number`  | Aceita uma `string` que define o atributo `tabindex` nativo do HTML.  |

Esse componente aceita o seguinte output:

| Propriedade | Tipo                                  | Descrição                   |
|-------------|---------------------------------------|-----------------------------|
| change      | `EventEmitter<ButtonToggleComponent>` | Emite botão que foi clicado.|

## Exemplo de uso

### HTML

```html
<alb-button-toggle-group>
  <alb-button-toggle>Botão 1</alb-button-toggle>
  <alb-button-toggle>Botão 2</alb-button-toggle>
  <alb-button-toggle>Botão 3</alb-button-toggle>
</alb-button-toggle-group>
```

```html
<alb-button-toggle-group>
  <alb-button-toggle checked>Botão 1</alb-button-toggle>
  <alb-button-toggle>Botão 2</alb-button-toggle>
  <alb-button-toggle>Botão 3</alb-button-toggle>
</alb-button-toggle-group>
```

```html
<alb-button-toggle-group>
  <alb-button-toggle checked>Botão 1</alb-button-toggle>
  <alb-button-toggle>Botão 2</alb-button-toggle>
  <alb-button-toggle disabled>Botão 3</alb-button-toggle>
</alb-button-toggle-group>
```

```html
<alb-button-toggle-group direction="vertical">
  <alb-button-toggle>Botão 1</alb-button-toggle>
  <alb-button-toggle>Botão 2</alb-button-toggle>
  <alb-button-toggle>Botão 3</alb-button-toggle>
</alb-button-toggle-group>
```

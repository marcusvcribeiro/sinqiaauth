# Input

O componente **alb-input** É utilizado para campo de textos simples. Funciona com Reactive Forms do angular. O componente input também internamento utiliza a lib
[Imask](https://imask.js.org/), a qual você pode pegar sua referencia atráves da prop `maskRef` através do `@ViewChild` ou `@ContentChield`, e realizar qualquer tipo de manipulação.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade | Tipo                               | Descrição                                                                                                     |
| ----------- | ---------------------------------  | ------------------------------------------------------------------------------------------------------------- |
| placeholder | `string`                           | Aceita uma `string` que define o _placeholder_ do input.                                                      |
| value       | `string`                           | Aceita uma `string` que define o valor padrão do input.                                                       |
| value       | `string<'left','center','right'>`  | Aceita uma `string` que define o alinhamento do texto do inout                                                |
| required    | `boolean`                          | Aceita um `boolean` que define se é obrigatório que o input tenha valor ou não para completar o formulário.   |
| disabled    | `boolean`                          | Aceita um `boolean` que define se o input está desabilitado ou não.                                           |
| mask        | `IMask.AnyMaskedOptions`           | Aceita uma `IMask.AnyMaskedOptions` que define a máscara que o input deverá atribuir ao seu valor.            |
| password    | `string<'text','password'>`        | Aceita uma `string` que define o tipo do input como password.                                                 |
| maxLength   | `number`                           | Aceita um `number` que define a quantidade máxima de caracteres.                                              |
| error       | `string`                           | Aceita uma `string` que define a mensagem de erro para campo inválido.                                        |
| hint        | `string`                           | Aceita uma `string` que define o texto de descrição adicional.                                                |

## Outputs

| Propriedade | Tipo                  | Descrição                                                           |
| ----------- | --------------------- | ------------------------------------------------------------------- |
| change      | `EventEmitter<Event>` | Evento emitido quando um valor completo do input é alterado.        |
| input       | `EventEmitter<Event>` | Evento emitido a cada caracter digitado no input.                   |

## Exemplo de uso

### HTML

```html
<alb-input placeholder="Apenas um input"></alb-input>
```

```html
<alb-input placeholder="Input Value" value="Hello world"></alb-input>
```

```html
<alb-input placeholder="Input Required" required></alb-input>
```

```html
<alb-input placeholder="Input Required" required error="Campo inválido" hint="Label adicional" ></alb-input>
```

```html
<alb-input placeholder="Input Disabled" disabled></alb-input>
```

```html
<alb-input placeholder="Input ReadOnly" readonly></alb-input>
```

```html
<alb-input placeholder="Input Mask" [mask]="{mask: '+{7}(000)000-00-00'}"></alb-input>
```

```html
<alb-input placeholder="Input Password" [type]="password"></alb-input>
```

```html
<alb-input placeholder="Input File" type="file"></alb-input>
```


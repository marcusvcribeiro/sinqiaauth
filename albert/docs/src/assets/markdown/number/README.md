# Number

É utilizado para campo de numéricos. Funciona com Reactive Forms do angular.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

Possui as seguintes propriedades a serem passadas:

## Inputs

| Propriedade               | Tipo                              | Descrição                                                                 |
| ------------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| placeholder               | `string`                          | Passa-se o texto para o placeholder do input                              |
| value                     | `number`                          | Caso necessário passar um texto padrão                                    |
| required                  | `boolean`                         | Utilizado quando o input é requerido para completar o formulário          |
| disabled                  | `boolean`                         | Desabilita o input                                                        |
| textAlign                 | `string<'left','center','right'>` | Alinhamento de texto                                                      |
| length                    | `number`                          | Quantidade de digitos do número                                           |
| decimal                   | `boolean`                         | Define se o número possuí casa decimal                                    |  
| decimalLength             | `number`                          | Quantidade de casas decimais                                              |
| thousandsSeparator        | `string`                          | Caractere que separa milhar                                               |
| decimalSeparator          | `string`                          | Caractere que separa decimal de fracionado                                |
| allowNegative             | `boolean`                         | Define se número negativo é permitido                                     |
| error                     | `string`                          | Aceita uma `string` que define a mensagem de erro para campo inválido.    |
| hint                      | `string`                          | Aceita uma `string` que define o texto de descrição adicional.            |
| disableThousandsSeparator | `boolean`                         | Desabilita o separador de casas de milhar                                  |

## Outputs

| Propriedade        | Tipo                     | Descrição                                                                   |
| -------------------| -------------------------| --------------------------------------------------------------------------- |
| changeValue        | EventEmitter<\number>\   | Emite o valor número do input alterado                                      |

## Exemplos

### HTML

```html
  <alb-number placeholder="Apenas um número"></alb-number>
```

```html
  <alb-number placeholder="Apenas um número" [value]="100"></alb-number>
```

```html
  <alb-number placeholder="Apenas um número" [allowNegative]="false"></alb-number>
```

```html
  <alb-number
    placeholder="Apenas um número"
    [decimal]="true"
    decimalLength="2"
    [value]="100">
  </alb-number>
```

```html
  <alb-number
    placeholder="Apenas um número"
    [decimal]="true"
    decimalLength="2"
    required error="Campo inválido" hint="Label adicional"
    [value]="100">
  </alb-number>
```

```html
  <alb-number
    placeholder="Apenas um número"
    [value]="10000" 
    [decimal]="true"
    [disableThousandsSeparator]="true">
  </alb-number>
```
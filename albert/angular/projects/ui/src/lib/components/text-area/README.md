# Text-area

É utilizado para campo de input que requerem grandes entradas de texto.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade        | Tipo                              | Descrição                                                                 |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------- |
| placeholder        | `string`                          | Passa-se o texto para o placeholder do text-area                          |
| value              | `string`                          | Valor inicial do text-area                                                |
| disabled           | `boolean`                         | Desabilita o text-area                                                    |
| length             | `number`                          | Quantidade máxima de caracteres que o text-area pode ter                  |
| rows               | `number`                          | Número de rows que o text-area vai ter por default                        |

## Outputs

| Propriedade         | Tipo                      | Descrição                                                                   |
| ------------------- | ------------------------- | --------------------------------------------------------------------------- |
| changeValue         | EventEmitter<string>      | Emite o valor string do text-area quando alterado                           |

## Utilização
Importar o módulo `TextAreaModule` ou o módulo `UiModule`, e depois utilizar a tag `alb-textarea`.

## Exemplos

### HTML

```html
<alb-textarea
    placeholder="Meu Text Area" 
    [rows]="5" 
    [length]="500">
</alb-textarea>
```

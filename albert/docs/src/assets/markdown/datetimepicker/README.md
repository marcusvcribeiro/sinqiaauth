# Datetimepicker

O componente ```alb-datetimepicker``` é responsável por criar um input de edição de data com tempo (hora, minuto e segundo). A data e hora são tratadas no padrão ISO 8601, ou em uma string, ou em uma instância de ```Date```.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade  | Tipo                     | Descrição                                                             |
|--------------|------------------------- |-----------------------------------------------------------------------|
| value        | `string, Date`           | Aceita no padrão **ISO 8601** ou em uma instância de `Date`.          |
| placeholder  | `string`                 | Passa-se o texto para o placeholder do input                          |
| disabled     | `boolean`                | Aceita um `boolean` que define se o botão está desabilitado ou não.   |
| mask         | `IMask.AnyMaskedOptions` | Aceita um objeto de configuração da máscara                           |
| error        | `string`                 | Aceita uma `string` que define a mensagem de erro para campo inválido.|
| hint         | `string`                 | Aceita uma `string` que define o texto de descrição adicional.        |

## Outputs

| Propriedade | Tipo                        | Descrição                                                                                                                      |
|-------------|---------------------------- |--------------------------------------------------------------------------------------------------------------------------------|
| changeValue | `EventEmitter<Timepicker>`  | Valor emitido quando o input ou data do calendário ou tempo do relógio são alterados. (Sera emitido apenas para datas válidas) |

## Exemplo de uso

### HTML

```html
<alb-datetimepicker placeholder="Apenas uma data"></alb-datetimepicker>
```

```html
<alb-datetimepicker placeholder="Apenas uma data" value="2020-09-03 00:00:00"></alb-datetimepicker>
```

```html
<alb-datetimepicker placeholder="Apenas uma data" [value]="date"></alb-datetimepicker>
```

```html
<alb-datetimepicker placeholder="Apenas uma data" required></alb-datetimepicker>
```

```html
<alb-datetimepicker placeholder="Apenas uma data" required error="Campo inválido" hint="Label adicional"></alb-datetimepicker>
```
### Typescript

```javascript
export class SomeComponent {
  date = new Date("1995-08-25 12:30:40");
 }
```

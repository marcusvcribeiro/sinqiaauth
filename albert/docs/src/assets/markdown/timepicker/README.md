# Timepicker

O componente ```alb-timepicker``` é responsável por criar um input de edição de tempo (hora, minuto e segundo). Os tempos são tratados no padrão ISO 8601, ou em uma string, ou em uma instância de ```Date```.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade  | Tipo                     | Descrição                                                             |
|--------------|------------------------- |-----------------------------------------------------------------------|
| value        | `string, Date`           | Aceita no padrão **ISO 8601** ou em uma instância de `Date`.          |
| hour         | `number`                 | Aceita um `number` que define a hora iniciada pelo relógio.           |
| minute       | `number`                 | Aceita um `number` que define a minuto iniciada pelo relógio.         |
| second       | `number`                 | Aceita um `number` que define a segundo iniciada pelo relógio.        |
| placeholder  | `string`                 | Passa-se o texto para o placeholder do input                          |
| disabled     | `boolean`                | Aceita um `boolean` que define se o botão está desabilitado ou não.   |
| mask         | `IMask.AnyMaskedOptions` | Aceita um objeto de configuração da máscara                           |
| error        | `string`                 | Aceita uma `string` que define a mensagem de erro para campo inválido.|
| hint         | `string`                 | Aceita uma `string` que define o texto de descrição adicional.        |

## Outputs

| Propriedade | Tipo                        | Descrição                                                                                                      |
|-------------|---------------------------- |--------------------------------------------------------------------------------------------------------------- |
| changeValue | `EventEmitter<Timepicker>`  | Valor emitido quando o input ou tempo do relógio é alterado. (Sera emitido apenas para datas válidas)          |

## Exemplo de uso

### HTML

```html
<alb-timepicker placeholder="Apenas uma data">
</alb-timepicker>
```

```html
<alb-timepicker placeholder="Apenas uma data" value="2020-09-03">
</alb-timepicker>
```

```html
<alb-timepicker placeholder="Apenas uma data" [value]="date">
</alb-timepicker>
```

```html
<alb-timepicker placeholder="Apenas uma data" required>
</alb-timepicker>
```

```html
<alb-timepicker placeholder="Apenas uma data" value="12:05:11" required>
</alb-timepicker>
```

```html
<alb-timepicker placeholder="Apenas uma data" [hour]="hour" [minute]="minute" [second]="second" required>
</alb-timepicker>
```

```html
<alb-timepicker placeholder="Apenas uma data" required error="Campo inválido" hint="Label adicional">
</alb-timepicker>
```

### Typescript

```javascript
export class SomeComponent {
  date = new Date("1995-08-25");

  hour = 12;

  minute = 30;

  second = 40;
 }
```

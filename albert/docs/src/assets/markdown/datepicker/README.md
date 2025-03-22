# Datepicker

O componente ```alb-datepicker``` é responsável por criar um input de edição de Data. As datas são tratadas no padrão ISO 8601 ou em uma
instância de ```Date```.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Inputs

| Propriedade  | Tipo                     | Descrição                                                             |
|--------------|------------------------- |-----------------------------------------------------------------------|
| value        | `string, Date`           | Aceita no padrão **ISO 8601** ou em uma instância de `Date`.          |
| placeholder  | `string`                 | Passa-se o texto para o placeholder do input                          |
| disabled     | `boolean`                | Aceita um `boolean` que define se o botão está desabiltiado ou não.   |
| mask         | `IMask.AnyMaskedOptions` | Aceita um objeto de configuração da máscara                           |
| error        | `string`                 | Aceita uma `string` que define a mensagem de erro para campo inválido.|
| hint         | `string`                 | Aceita uma `string` que define o texto de descrição adicional.        |

## Outputs

| Propriedade | Tipo                        | Descrição                                                                                                      |
|-------------|---------------------------- |--------------------------------------------------------------------------------------------------------------- |
| changeValue | `EventEmitter<Datepicker>`  | Valor emitido quando o input ou calendário de uma data é alterado. (Sera emitido apenas para datas válidas)    |

## Exemplo de uso

### HTML

```html
<alb-datepicker placeholder="Apenas uma data">
</alb-datepicker>
```

```html
<alb-datepicker placeholder="Apenas uma data" value="2020-09-03">
</alb-datepicker>
```

```html
<alb-datepicker placeholder="Apenas uma data" [value]="date">
</alb-datepicker>
```

```html
<alb-datepicker placeholder="Apenas uma data" required>
</alb-datepicker>
```

```html
<alb-datepicker
  placeholder="Apenas uma data"
  value="2020-09-03"
  required>
</alb-datepicker>
```

```html
<alb-datepicker
  placeholder="Apenas uma data"
  value="2020-09-03"
  required
  error="Campo inválido" hint="Label adicional">
</alb-datepicker>
```


### Typescript

```javascript
export class SomeComponent {
  date = new Date("1995-08-25");
 }
```

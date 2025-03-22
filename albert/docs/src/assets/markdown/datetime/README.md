# Datetime

O componente **alb-datetime** irá gerar um botão que quando for clicado irá aparecer um popup com um calendário e um relógio ao lado.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade   | Tipo           | Descrição                                                      |
| -----------   | -------------- | -------------------------------------------------------------- |
| date          | `Date`         | Aceita um `Date` que define a data iniciada pelo calendário.   |
| hour          | `number`       | Aceita um `number` que define a hora iniciada pelo relógio.    |
| minute        | `number`       | Aceita um `number` que define a minuto iniciada pelo relógio.  |
| second        | `number`       | Aceita um `number` que define a segundo iniciada pelo relógio. |

## Output

| Propriedade   | Tipo                 | Descrição                                                                    |
| -----------   | -------------------- |----------------------------------------------------------------------------- |
| change        | `EventEmitter<Date>` | Emite a data com hora, minuto e segundo selecionada no calendário e relógio. |

## Exemplo de uso

### HTML

```html
<alb-datetime></alb-datetime>
```

```html
<alb-datetime [date]="date" (change)="onTimeChange($event)"></alb-datetime>
```

```html
<alb-datetime [hour]="hour" [minute]="minute" [second]="second" (change)="onDatetimeChange($event)"></alb-datetime>
```

### TypeScript

```javascript
export class SomeComponent {

  date = new Date("1995-08-02");

  hour = 12;

  minute = 30;

  second = 50;

  onDatetimeChange($event) {
    console.log("A hora marcada foi clicada foi ", $event);
  }
 }
```

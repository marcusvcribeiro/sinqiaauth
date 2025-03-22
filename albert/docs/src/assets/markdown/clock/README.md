# Calendar

O componente **alb-clock** irá gerar um botão que quando for clicado irá aparecer um popup de relógio.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade   | Tipo           | Descrição                                                      |
| -----------   | -------------- | -------------------------------------------------------------- |
| date          | `Date`         | Aceita um `Date` que define a data iniciada pelo relógio.      |
| hour          | `number`       | Aceita um `number` que define a hora iniciada pelo relógio.    |
| minute        | `number`       | Aceita um `number` que define a minuto iniciada pelo relógio.  |
| second        | `number`       | Aceita um `number` que define a segundo iniciada pelo relógio. |

## Output

| Propriedade   | Tipo                 | Descrição                                                       |
| -----------   | -------------------- |---------------------------------------------------------------- |
| change        | `EventEmitter<Date>` | Emite a data com hora, minuto e segundo selecionada no relógio. |

## Exemplo de uso

### HTML

```html
<alb-clock></alb-clock>
```

```html
<alb-clock [date]="date" (change)="onTimeChange($event)"></alb-clock>
```

```html
<alb-clock [hour]="hour" [minute]="minute" [second]="second" (change)="onTimeChange($event)"></alb-clock>
```

### TypeScript

```javascript
export class SomeComponent {

  date = new Date("1995-08-02 12:30:50");

  hour = 12;

  minute = 30;

  second = 50;

  onTimeChange($event) {
    console.log("A hora marcada foi clicada foi ", $event);
  }
 }
```

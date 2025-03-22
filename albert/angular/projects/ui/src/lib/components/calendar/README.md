# Calendar

O componente **alb-calendar** irá gerar um botão que quando for clicado irá aparecer um popup de calendário.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade   | Tipo                     | Descrição                                                                        |
| -----------   | ------------------------ | -------------------------------------------------------------------------------- |
| date          | `Date`                   | Aceita um `Date` que define a data iniciada pelo canderário.                     |
| onlyIcon      | `Booelan`                | Aceita um `Boolean` que define se vai ser mostrado apenas o icone do calendário. |
| date          | `ElementRef ou HTMLElement`| Elemento a qual pode ser passado para o calendário ser vinculado.                |

## Output

| Propriedade   | Tipo                 | Descrição                               |
| -----------   | -------------------- |---------------------------------------- |
| change        | `EventEmitter<Date>` | Emite a data selecionada no calendário. |

## Exemplo de uso

### HTML

```html
<alb-calendar></alb-calendar>
```

```html
<alb-calendar [date]="date" (change)="onDateChange($event)"></alb-calendar>
```

### TypeScript

```javascript
export class SomeComponent {

  date = new Date("1995-08-02");

  onDateChange($event) {
    console.log("A data clicada foi ", $event);
  }
 }
```

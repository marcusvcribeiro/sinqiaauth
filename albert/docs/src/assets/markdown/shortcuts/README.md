# Shortcuts

Para utilização de atalho de teclado utilizamos a biblioteca [ng-keyboard-shortcuts](https://www.npmjs.com/package/ng-keyboard-shortcuts).

Lembrando que devemos sempre seguir as instruções de atalhos de teclado presentes no [design-system](https://dev.sinqia.io/albert/design-system/guidelines/keyboard-shortcut).

## Passo 1

Importar o modulo **KeyboardShortcutsModule**

### TypeScript

```javascript
import { KeyboardShortcutsModule } from 'ng-keyboard-shortcuts';

imports: [
  KeyboardShortcutsModule
]
```

## Passo 2

Criar uma variável para receber uma lista com os atalhos

### TypeScript

```javascript
shortcuts = [];
this.shortcuts.push(
  {
      key: "ctrl + q",
      preventDefault: true,
      command: e => {
        console.log("função para focar elemento", e)
      }
  }
)
```

## Passo 3

No HTML, adicionar a tag **ng-keyboard-shortcuts** passando a variável criada no passo anterior

```html
<ng-keyboard-shortcuts [shortcuts]="shortcuts"></ng-keyboard-shortcuts>
```

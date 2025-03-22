# Chips

O componente **alb-chips** serve para representar um atribut

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

O alb-chips possui as seguintes propriedades:

## Inputs

| Propriedade    | Tipo                               |  Descrição                                                                                                                                           |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| chips          | `Chips[]`                          | Aceita um array de chips que serão exíbidos na interface                                                                                             | 
| noWrap         | `boolean`                          | Aceita um `boolean` que define se na exibição dos chips eles não vão ser quebrados em nova linha quando excederem o width do container pai           |
| remove         | `boolean`                          | Aceita um `boolean` que define se está habilitado a remoção de chips                                                                                 |
| placeholder    | `boolean`                          | Aceita um `boolean` que define se está habilitado a exibição de placeholder                                                                          |
| isSelectable   | `boolean`                          | Aceita um `boolean` que define se está habilitado a seleção de chips                                                                                 |
| isList         | `boolean`                          | Aceita um `boolean` que define se está habilitado a exibição em lista (chip abaixo do outro)                                                         |

## Exemplos

```html
<alb-chips></alb-chips>
```

### Adicionando um chip

```javascript
  @Input(ChipsComponent, { static: true }) chips: ChipsComponent; 

  addChip() {
    this.chips.addChips({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest',
      onDestroy: () => {}
    });
  }
```

### Removendo um chip

```javascript
  @Input(ChipsComponent, { static: true }) chipsComponent: ChipsComponent; 

  // Você pode remover com o próprio chip
  removerChip(chip: Chips) {
    this.chipsComponent.removeChip(chip);
  }

  // Também pode remover usando a chave do chip
  removerChipComChave(key: string) {
    this.chipsComponent.removeChipByKey(key);
  }
```

### Recuperando a lista de chips

```javascript
  @Input(ChipsComponent, { static: true }) chipsComponent: ChipsComponent; 

  getChips() {
    this.chips.chips;
  }

```

### Disparando evento quando o chip é removido

```javascript
  @Input(ChipsComponent, { static: true }) chips: ChipsComponent; 

  addChip() {
    this.chips.addChip({
      key: 'test',
      placeholder: 'PlaceholderTest',
      value: 'ValueTest',
      onDestroy: () => {
          // Insira aqui o código que será executado na remoção do chip
      }
    });
  }
```
# RadioGroup

A diretiva **alb-radio-group** é utilizada como pai de um conjunto de botões.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade | Tipo      | Descrição                                                                                                                |
|------------ |---------- |------------------------------------------------------------------------------------------------------------------------- |
| required    | `boolean` | Aceita um `boolean` que define se é obrigatório que um dos radio buttons tenha valor ou não para completar o formulário. |
| disabled    | `boolean` | Desabilita / Habilita todos radio buttons                                                                                |
| name        | `string`  | Adiciona o atributo name no input radio HTML (esse atributo é gerado automatico sem a prop )                             |

## Output

| Propriedade | Tipo                                 | Descrição                                                        |
|------------ |------------------------------------- |----------------------------------------------------------------  |
| change      | `EventEmitter<RadioButtonComponent>` | Emite um output quando é realizada uma mudança no botão clicado. |
| changeValue | `EventEmitter<RadioButton>`          | Emite o botão que foi clicado.                                   |

## RadioButton

 O componente **alb-radio-button** é utilizado para selecionar entre duas ou mais opções, podendo selecionar apenas uma delas. Deve ser utilizado como filho da diretiva **alb-radio-group**.

### Inputs

| Propriedade | Tipo      | Descrição                                                                                   |
|------------ |---------- |-------------------------------------------------------------------------------------------- |
| value       | `number`  | Valor do radio button                                                                       |
| checked     | `boolean` | Aceita um `boolean` que define se o botão está _checked_ ou não.                            |
| disabled    | `boolean` | Aceita um `boolean` que define se o input está desabilitado ou não.|completar o formulário. |

### Output

| Propriedade | Tipo                                 | Descrição                         |
|-------------|--------------------------------------|-----------------------------------|
| change      | `EventEmitter<Event>`                | Emite o botão que foi clicado.    |

## Exemplos

### HTML

```html
<alb-radio-group>
  <alb-radio-button value="1"> Exemplo 1 </alb-radio-button>
  <alb-radio-button value="2"> Exemplo 2 </alb-radio-button>
</alb-radio-group>
```

```html
<alb-radio-group>
  <alb-radio-button value="1" checked> Exemplo 1 </alb-radio-button>
  <alb-radio-button value="2"> Exemplo 2 </alb-radio-button>
</alb-radio-group>
```

```html
<alb-radio-group>
  <alb-radio-button value="1" disabled> Exemplo 1 </alb-radio-button>
  <alb-radio-button value="2"> Exemplo 2 </alb-radio-button>
</alb-radio-group>
```

```html
<alb-radio-group>
  <alb-radio-button value="1" checked disabled> Exemplo 1 </alb-radio-button>
  <alb-radio-button value="2"> Exemplo 2 </alb-radio-button>
</alb-radio-group>
```

```html
<alb-radio-group disabled>
  <alb-radio-button value="1"> Exemplo 1 </alb-radio-button>
  <alb-radio-button value="2"> Exemplo 2 </alb-radio-button>
</alb-radio-group>
```

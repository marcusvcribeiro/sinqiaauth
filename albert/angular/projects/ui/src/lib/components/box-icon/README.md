# BoxIcon

O componente **alb-box-icon** pode ser utilizado dentro de uma div ou diretamente em seu layout. O componente foi feito para se adequar ao container que se encontra.

Possui um input chamado **icon**, no qual deve-se passar o nome do ícone dentro da tag. Caso não passe nenhum ícone, há um ícone default.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

O alb-box-icon possui as seguintes propriedades a serem passadas:

## Inputs

| Propriedade | Tipo                              | Descrição                                                                 |
| ----------- | --------------------------------- | ------------------------------------------------------------------------- |
| icon        | `string`                          | Passa-se o texto equivalente ao ícone do material                         |


## Exemplos de uso

### HTML

```html
<alb-search icon='filter_list'>
    <alb-input placeholder="Placeholder"></alb-input>
    <alb-radio-group>
      <alb-radio-button value="1"> Exemplo 1 </alb-radio-button>
      <alb-radio-button value="2"> Exemplo 2 </alb-radio-button>
    </alb-radio-group>
</alb-search>
```

```html
<alb-search icon='filter_list'>
    <alb-input placeholder="Placeholder 1"></alb-input>
    <alb-input placeholder="Placeholder 2"></alb-input>
    <alb-input placeholder="Placeholder 3"></alb-input>
</alb-search>
```
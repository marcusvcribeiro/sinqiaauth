# Accordion

É utilizado para criar um accordion.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

O alb-accordion possui as seguintes propriedades a serem passadas:

## Inputs

| Propriedade | Tipo                              | Descrição                                                                 |
| ----------- | --------------------------------- | ------------------------------------------------------------------------- |
| icon        | `string`                          | Passa-se o texto equivalente ao ícone do material                         |
| title       | `string`                          | Passa-se o texto que preencherá o título do accordion                     |
| open        | `boolean`                         | Passa-se um boolean para definir se o accordion iniciará aberto ou não    |



## Customizações

  Além da alteração do ícone e configuração default para aberto/fechado, também é possível configurar um header para quando o accordion se encontra fechado, basta adicionar o componente <albAccordionHeader></albAccordionHeader> como nos exemplos abaixo.

## Exemplos

### HTML

```html
  <alb-accordion icon="filter_list" [open]="false">
    <albAccordionHeader>
      <alb-input placeholder="header"></alb-input>
    </albAccordionHeader>
    <alb-input placeholder="content"></alb-input>
  </alb-accordion>
```

```html
  <alb-accordion icon="filter_list" [open]="true">
    <alb-input placeholder="content"></alb-input>
  </alb-accordion>
```


## Inputs

| Propriedade | Tipo                              | Descrição                                                                 |
| ----------- | --------------------------------- | ------------------------------------------------------------------------- |
| icon        | `string`                          | Passa-se o texto equivalente ao ícone do material                         |
| title       | `string`                          | Passa-se o texto que preencherá o título do accordion                     |
| open        | `boolean`                         | Passa-se um boolean para definir se o accordion iniciará aberto ou não    |



## Customizações

  Além da alteração do ícone e configuração default para aberto/fechado, também é possível configurar um header para quando o accordion se encontra fechado, basta adicionar o componente <albAccordionHeader></albAccordionHeader> como nos exemplos abaixo.

## Exemplos

```html
  <alb-accordion icon="filter_list" [open]="false">
    <albAccordionHeader>
      <alb-input placeholder="header"></alb-input>
    </albAccordionHeader>
    <alb-input placeholder="content"></alb-input>
  </alb-accordion>
```

```html
  <alb-accordion icon="filter_list" [open]="true">
    <alb-input placeholder="content"></alb-input>
  </alb-accordion>
```

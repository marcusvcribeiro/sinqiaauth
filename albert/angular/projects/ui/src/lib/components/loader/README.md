# Loader

O componente **alb-loader** renderiza um componente de visualizacao de loading.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade  | Tipo     | Descrição                                                                     |
|------------  |----------|-------------------------------------------------------------------------------|
| description  | `string`               | Aceita uma `string` que define uma descricao em texto do loader |
| type         | `string<'dark','light'>` | Aceita uma `string` que define o tipo de estilo do loader       |

## Exemplo de uso

### HTML

```html
  <alb-loader description="Carregando..."></alb-loader>
```

```html
  <alb-loader type="light" description="Carregando..."></alb-loader>
```

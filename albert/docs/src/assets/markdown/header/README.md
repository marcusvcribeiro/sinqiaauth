# Header

O componente **alb-header** gera o header de uma aplicação.

## Inputs

| Propriedade        | Tipo     | Descrição                                                          |
| ------------------ | -------- | ------------------------------------------------------------------ |
| name               | `string` | Aceita uma `string` que define o nome da Aplicação no header.      |
| description        | `string` | Aceita uma `string` que define a descrição da Aplicação no header. |
| logoColor          | `string` | Aceita uma `string` que define a a cor do ícone do logo Sinqia.    |

## alb-header-group

A diretiva **alb-header-group** deve ser utilizada como tag filho do componente **alb-header** agrupa outros componentes no header da aplicação.

## Exemplo de uso

### HTML

```html
<alb-header>
  <alb-header-group>
    <button alb-button></button>
  </alb-header-group>
</alb-header>
```

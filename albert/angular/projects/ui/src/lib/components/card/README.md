# Card

O componente **alb-card** pode ser utilizado dentro de uma div ou diretamente em seu layout. O componente foi feito para se adequar ao container que se encontra.

Possui um input chamado **title**, no qual deve-se passar o título dentro da tag. Esta configuração é opcional.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

## Input

| Propriedade   | Tipo             | Descrição                                             |
| -----------   | ---------------  | ----------------------------------------------------- |
| title         | `string`         | Aceita um `string` que define o título do card.       |

## CardAside

Além disso, pode-se utilizar uma diretiva dentro da tag do card chamada de **alb-card-aside**, fazendo possível a utilização de algum elemento qualquer (botão, ícone, texto, etc) no canto direito do header.

## Exemplo de uso

### HTML

```html
<alb-card title="Título">
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo saepe quidem illum earum, veniam esse quibusdam reiciendis assumenda temporibus sit fugit ipsa minus iure, vitae qui nisi cupiditate necessitatibus soluta?
  </p>
</alb-card>
```

```html
<alb-card title="Título">
  <alb-card-aside>
    <alb-menu [items]="menu"></alb-menu>
  </alb-card-aside>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo saepe quidem illum earum, veniam esse quibusdam reiciendis assumenda temporibus sit fugit ipsa minus iure, vitae qui nisi cupiditate necessitatibus soluta?
  </p>
</alb-card>
```

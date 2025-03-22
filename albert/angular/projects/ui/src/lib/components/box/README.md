# Box

A diretiva **alb-box** pode ser utilizada dentro de uma div ou diretamente em seu layout. O elemento foi feito para se adequar ao container que se encontra.
Difere-se do alb-card no seu design e utilização, uma vez que o box deve ir dentro de um card e raramente será solto no layout da página.

Lembrando que para a utilização do componente é preciso importar o **UiModule**.

Possui um input chamado **title**, no qual deve-se passar o título dentro da tag. Esta configuração é opcional. Além disso, possui a configuração **formview** que, como o nome sugere, é utilizado para agrupamento em formulários.

## Inputs

| Propriedade | Tipo      | Descrição                                                                                    |
|-------------|-----------|--------------------------------------------------------------------------------------------- |
| title       | `string`  | Aceita uma `string` que define o título que será exibido.                                    |
| formview    | `boolean` | Aceita um `boolean` que define se o box agrupará elementos como radio buttons ou checkboxes. |

## Exemplo de uso

### HTML

```html
<alb-box title="Título"> Conteúdo </alb-box>
```

```html
<alb-box title="Título" formview> Conteúdo </alb-box>
```

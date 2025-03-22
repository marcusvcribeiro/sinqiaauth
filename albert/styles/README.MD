# alb-styles

O projeto alb-styles centraliza todos os estilos de acordo com o Design System Albert.

## Sumário

1. [Como baixar](#como-baixar)
2. [Como utilizar](#como-utilizar)
3. [Váriaveis Globais](#váriaveis-globais)
4. [Tipográfia](#tipográfia)
5. [Cores](#cores)
6. [Icones](#icones)
7. [Breakpoints](#breakpoints)
8. [Divisor](#divisor)
9. [Grupo de botões](#grupo-de-botões)
10. [Espaçamento entre elementos (bottom e top)](#espaçamento-entre-elementos-(bottom-e-top))
11. [Style guide](#style-guide)

## Como baixar?

Você pode baixar os estilos facilmente utilizando o **NPM**

```shell
npm install https://nexus.sinqia.com.br/repository/npm-repo/@albert/styles/1.0.0.tgz
```

## Como utilizar

Neste projeto será gerado arquivos dos tipos **scss** e **css**, a qual você pode utilizar em qualquer projeto, importando no seguinte caminho:

`node_modules/@albert/styles/scss/all.scss`

ou

`node_modules/@albert/styles/css/all.css`

Você também pode utilizar um conjunto de estilo específico:

`node_modules/@albert/styles/scss/core.scss`
`node_modules/@albert/styles/scss/utils.scss`

### Como utilizar no Angular

Para utilizar em projetos Angular, basta adicionar em seu **angular.json** o mesmo caminho na propriedade **styles**:

```json
"styles": [
  "node_modules/@albert/styles/scss/all.scss"
],

```

## Váriaveis globais

Você pode utilizar qualquer [váriavel CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS/Using_CSS_custom_properties) no projeto.
Como no exemplo a baixo:

```scss
  .cor-sinqia {
    color: var(--sinqia);
  }

  .meu-estilo-alerta {
    background-color: var(--warn);
  }
```

### Váriaveis - cores

| Váriavel        | Valor                   |
| --------------- | ----------------------- |
| --primary       | var(--sinqia)           |
| --success       | var(--mantis)           |
| --warn          | var(--alizarin-crimson) |
| --alert         | var(--buttercup)        |
| --link          | var(--royal-blue)       |
| --new           | var(--heliotrope)       |
| --accent        | var(--trout)            |
| --background    | var(--aluminium)        |
| --border        | var(--athens)           |
| --contrast      | var(--white)            |
| --disabled      | var(--athens)           |
| --disabled-font | var(--santas)           |
| --hover         | var(--athens)           |
| --icon          | var(--trout)            |
| --placeholder   | var(--santas)           |
| --text          | var(--trout)            |

### Váriaveis - tipografia

| Váriavel                       | Valor            |
| ------------------------------ | ---------------- |
| --font-family-title            | 'Rubik Medium'   |
| --font-size-title              | 24px             |
| --font-color-title             | var(--accent0    |
| --font-family--header-subtitle | 'Rubik Medium'   |
| --font-size-header-subtitle    | 16px             |
| --font-color-header-subtitle   | var(--accent)    |
| --font-family-subtitle         | 'Rubik Regular'  |
| --font-size-subtitle           | 16px             |
| --font-color-subtitle          | var(--primary)   |
| --font-family-body             | 'Roboto Regular' |
| --font-size-body               | 14px             |
| --font-color-body              | var(--accent)    |
| --font-family-button           | 'Rubik Regular'  |
| --font-size-button             | 11px             |
| --font-color-button-disabled   | var(--aluminium) |
| --font-family-input            | 'Roboto Regular' |
| --font-size-input              | 11px             |
| --font-color-input             | var(--accent)    |
| --font-family-table            | 'Roboto Regular  |
| --font-size-table              | 11px             |
| --font-color-table             | var(--aluminium) |
| --font-family-aplication-name  | 'Dosis Regular'  |
| --font-size-aplication-name    | 15px             |
| --font-color-aplication-name   | var(--santas)    |

### Váriaveis - layers (z-index)

| Váriavel       | Valor |
| -------------- | ----- |
| --layer-base   | 500   |
| --layer-loader | 750   |
| --layer-navbar | 1000  |
| --layer-drawer | 1500  |
| --layer-toast  | 2000  |
| --layer-dialog | 2500  |

## Tipográfia

A tipográfia é gerada automáticamente. Além das váriaveis utilitárias, você pode utilizar as segunites classes:

- .alb-title
- .alb-subtitle-header
- .alb-subtitle

## Cores

Há também classes específicar para estilizar **cores de texto**

- .alb-primary-color
- .alb-success-color
- .alb-warn-color
- .alb-accent-color
- .alb-alert-color
- .alb-link-color
- .alb-new-color

## Icones

Os icones são baseados no [Material Icons](https://google.github.io/material-design-icons/). Para utiliza-los você deve utilizar em uma tag \<i> com a classe `alb-icon` e dentro dela passar o ícone desejado:

```html
<i class="alb-icon">done</i>
```

Os navegadores modernos simplesmente entenderá o nome da fonte desejada por utilizar uma nova feature chamada **ligatures**, a qual permite renderizar um icone com um nome.
Você pode ver mais sobre como essa tecnologia funciona no site oficial do [material design icons](https://google.github.io/material-design-icons/)

## Diagramação de telas (Bootstrap 4.0)

Par a diagramação de telas usamos o GRID do Bootstrap 4.0 por considerar que é uma solução muito completa para responsividade.

Nesta utilização somente devemos usar os arquivos .scss que podem ser achados no [github](https://github.com/twbs/bootstrap) do Bootstrap, não devem ser importados compoenntes nem arquivos baseados em Javascript.

Breakpoints no Bootstrap:

| Breakpoint | Valor  |
| ---------- | ------ |
| xs         | 0px    |
| sm         | 576px  |
| md         | 768px  |
| lg         | 992px  |
| xl         | 1200px |
| xxl        | 1400px |

Abaixo temos as funcionalidades importadas do Bootstrap 4.0:

https://getbootstrap.com/docs/5.0/layout/grid/
https://getbootstrap.com/docs/5.0/layout/columns/
https://getbootstrap.com/docs/5.0/layout/gutters/
https://getbootstrap.com/docs/5.0/utilities/flex/
https://getbootstrap.com/docs/5.0/layout/utilities/

## Respopnsive Divisor

Baseado do "row cols" do Bootstrap criamos algumas classe com um padrão de quebra de colunas nos Breakpoints. Isso pode reduzir o número de classes CSS que seriam necessárias:

Exemplo com Row Cols:
```html
<div class="row row-cols-xs-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4">
  <div>coluna</div> 
  <div>coluna</div> 
  <div>coluna</div> 
  <div>coluna</div> 
</div>
```

Exemplo com o Responsive Divisor:
```html
<div class="res-div-4">
  <div>coluna</div> 
  <div>coluna</div> 
  <div>coluna</div> 
  <div>coluna</div> 
</div>
```

## Breakpoints [Depricated]

As classes de breakpoints são utilizadas para realizar váriaveis de quebras:

| Breakpoint | Valor  |
| ---------- | ------ |
| xs         | 480px  |
| sm         | 768px  |
| md         | 1000px |
| lg         | 1200px |
| xl         | 1400px |

Ela também possuí classes de larguras destes breakpoints:

- .alb-width-xs
- .alb-width-sm
- .alb-width-md
- .alb-width-lg
- .alb-width-xl

Caso deseje utilizar as váriaveis scss, importe o arquivo **/core/breakpoints.scss** e utilize a função **map-get()** do scss

```scss
  @media(max-width: map-get($alb-breakpoints, md)) {
  }
```

## Divisor [Depricated]

Não recomendamos o uso do Divisor, mas vamos manter por questões de retrocompatibilidade de produtos já desenvolvidos com ele. Esta solução pode ser substituida por funcionalidades do Bootstrap 4.0 tais como [Row Columns](https://getbootstrap.com/docs/5.0/layout/grid/#row-columns).

A classe **alb-divisor** é utilizada para realizar divisões de layout. Ela é composta por sua classe e seu modificador de estado, a qual todos os
filhos correspondentes serão realizado uma divisão igual.

```html
<div class="alb-divisor --two">
  <div>Filho 1</div>
  <div>Filho 2</div>
  <div>Filho 3</div>
  <div>Filho 4</div>
</div>
```

A classe possuí até 7 divisões de estado:

- --two
- --three
- --four
- --five
- --six
- --seven

## Grupo de botões

A classe utilitária `alb-button-group`, é respoonsável por realizar por alinhas um conjunto de grupo de botões

```html
<div class="alb-button-group">
  <button>Botão 1</button>
  <button>Botão 2</button>
  <button>Botão 3</button>
</div>
```

## Espaçamento entre elementos (bottom e top)

A classe utilitária `alb-box-space`, é respoonsável por adicionar uma margin top e bottom, para cada elementos filho

```html
  <div class="alb-box-space">
    <alb-display title="Titulo 1"> Texto 1</alb-display>
    <alb-display title="Titulo 2"> Texto 2</alb-display>
    <alb-display title="Titulo 3"> Texto 3</alb-display>
  </div>
```

## Style guide

O projeto de estilos foi desenvolvido apenas para gerar arquivos de estilos css ou scss e para isto ele utiliza o bundler [Webpack](https://webpack.js.org/). Caso você implementar uma nova pasta na arquitetura
de estilos, você deve adicionar ela no arquivo **webpack.dev.js** e **webpack.prod.js**

### Como realizar a criação de um estilo?

Todo estilo deve ser pensado de forma componentizada, por isto ele deve ser encapsulado em um [mixen scss](https://sass-lang.com/documentation/at-rules/mixin) e isolado em um arquivo. Pois assim será evitado
gerar qualquer estilo de forma repetida e será possível gerar estilos de formas especificas. Transformando em mixens, também é posível criar váriaveis isoladas em cada arquivos, realizados assim
seu reaproveitamento em outros componentes

```scss
$size: 100px;

@mixin alb-component() {
  .alb-component {
    width: $size;
  }
}
```

A classe deve ser totalmente semântica e utilizar a mesma filosofia do [BEM (Block Element Modifier)](http://getbem.com/introduction/), porém sem usar sua sintaxe,
apenas deve respeitar sua hierarquia. Exemplo:

```scss
.alb-component {
  &.--light {
  }
}

.alb-component-header {
}
```

**OBSERVALÇÃO**: Utilize apenas o `--` em uma classe pra representar algum tipo de estado

Os arquivos de estilos são divido pastas representado em módulos semânticos de estilos:

- Components
- Core
- Pages
- Third-components
- Utils

### Components

A pasta components é responsável por todos componentes compartilhados pelo grupo Albert, atualmente ela possui a mesma estrutura
do projeto angular, divido em submódulos `layout` e `ui`

### Core

A pasta core é responsável por todos estilos universais que uma aplicação utilizando o Design System Albert deve possuír.

### Utils

A pasta utils é responsável por todos estilos utilitário.

### Pages

A pasta pages será responsável por estilo de paginas padrões que uma aplicação deve possuir (loading, login, 404, etc).

### Third Components

A pasta third-components é responsável pela estilização de todos componentes de terceiro.

## Contribuição: Recomendações

Node: 14.16+
NPM: 6.14+
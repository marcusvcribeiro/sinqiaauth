# Drawer

Para a utilização do **alb-drawer** devemos importar o módulo **DrawerModule** ou **UiModule**. Além disso, devemos adicionar no **providers** do seu módulo o **DrawerService**.

O componente **alb-drawer** é um componente responsável pela criação de uma área lateral. Para realizar a utilização desse componente você deve realizar chamando em uma instância do serviço `DrawerService`. 
Esse serviço possuí o método `create()`, que recebe como parâmetro a interface `Drawer`.

## Inputs

| Propriedade    | Tipo                               |  Descrição                                                                                                                                           |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| component      | `class`                            | Aceita uma `class` que define o nome do componente a ser instanciado.                                                                               |
| title          | `string`                           | Aceita uma `string` que define o título que será gerado no header do Drawer.                                                                         |
| componentProps | `{ [key: string]: any }`           | Aceita um `object` que define as propriedades do input do componente a ser instanciado (caso existir).                                               |
| size           | `string<'extra-small'|'small'|'medium'|'large'|'extra-large'>` | Aceita uma `string` que define qual tamanho que o Drawer deve possuir ao ser gerado. Aceita os valores `extra-large`, `large`, `medium`, `small` e `extra-small`.                 |
| lastPosition   | `number`                           | Aceita um `number` que define a última posição do **drawer** instanciado. Esse input é utilizado para realizar a animação de "leque (fanAnimation)". |

## Outputs

| Propriedade | Tipo           |  Descrição                                                                                    |
| ----------- | -------------- |--------------------------------------------------------------------------------------         |
| created     | `EventEmitter<Event>` | Emite quando o componente é instanciado e todas as modificações no DOM são realizados. |
| close       | `EventEmitter<Event>` | Emite quando um drawer é fechado.                                                      |

## Diretivas do Drawer

* `alb-drawer-title`: responsável por gerar o título do Drawer.
* `alb-drawer-footer`: responsável por gerar o footer do Drawer.
* `alb-drawer-actions` (descontinuada): responsável por gerar uma barra de ações ao lado do título.
**OBS:** Se você utilizar a diretiva `alb-drawer-title`, a prop `title` na criação do drawer vai ser desconsiderada.

## Exemplos

#### HTML

```html
<alb-body>
  <h1 alb-drawer-title>Hello World!</h1>
  <footer alb-drawer-footer>
    <button alb-button type="secondary">Button 1</button>
    <button alb-button>Button 2</button>
  </footer>
</alb-body>
```

### Criando uma drawer

#### TypeScript

```javascript
  constructor(
    private drawerService: DrawerService,
  ) {}

  onOpenDrawer() {
    this.drawerService.create({
      component: PageComponent,
      title: 'Apenas um test',
    });
  }
```

### Inputs e Outputs do componente a ser instanciado

Você pode tratar todos os inputs do componente instanciado pela drawer pela propriedade `componentProps`, a qual receberá o nome do input e seu valor.
Para tratar os outputs, você deve armazenar o Drawer em uma váriavel e tratar os eventos nesta váriavel:

#### TypeScript

```javascript
  constructor(
    private drawerService: DrawerService,
  ) {}

  async onOpenDrawer() {
    const { component } = await this.drawerService.create({
      component: PageComponent,
      title: 'Apenas um test',
      componentProps: {
        meuInput: 'Oi',
      }
    });

    component.instance.meuOutput.subscribe(valor => console.log(valor));
  }
```

### Tratando eventos após o Drawer emitir o evento 'close'

Caso você deseje capturar o evento de fechamento de Drawer, faça o seguinte:

#### TypeScript

```javascript
  constructor(
    private drawerService: DrawerService,
  ) {}

  async onOpenDrawer() {
    const { drawerComponent } = await this.drawerService.create({
      component: PageComponent,
      title: 'Apenas um test',
    });

    drawerComponent.instance.close.subscribe(() => {
      console.log('Isto é executado com Drawer fechar!')
    })
  }
```

## Fechando o Drawer através de um serviço

Caso você queira fechar o Drawer através de uma outra ação sem ser cliquando no ícone de fechar, basta utilizar o método **close** do DrawerService

### TypeScript

```javascript
this.drawerService.close();
```

## Empilhamento de Drawers

Você pode empilhar drawer, chamando o método `create()`, você _escutar_ essa pilha atráves do seu retorno da criação na propriedade `drawers$`, a qual retorna um Observable da sua pilha.

## Overlay

Você pode controlar todo overlay do Drawer retornado em sua criação. [Saiba mais aqui](https://material.angular.io/cdk/overlay/overview)

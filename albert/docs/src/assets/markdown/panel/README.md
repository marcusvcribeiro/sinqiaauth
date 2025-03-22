# Panel

Para a utilização do **alb-panel** devemos importar o módulo **PanelModule** ou **UiModule**. Além disso, devemos adicionar no **providers** do seu módulo o **PanelService**.

O componente **alb-panel** é um componente responsável pela criação de container suspenso na interface. Para realizar a utilização desse componente você deve realizar chamando em uma instância do serviço `PanelService`. 
Esse serviço possuí o método `create()` e `togglePanel()`, que recebe como parâmetro a interface `Panel`. O parâmetro principal da interface `Panel` é o `anchor` (tipo `ElementRef`). Nele deve ser informado qual component da página será o ponto de referência do panel a ser criado e exibido logo abaixo.

## Inputs

| Propriedade    | Tipo                               |  Descrição                                                                                                                                           |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| component      | `class`                            | Aceita uma `class` que define o nome do componente a ser instanciado.                                                                                |
| componentProps | `{ [key: string]: any }`           | Aceita um `object` que define as propriedades do input do componente a ser instanciado (caso existir).                                               |

## Outputs

| Propriedade | Tipo           |  Descrição                                                                                    |
| ----------- | -------------- |--------------------------------------------------------------------------------------         |
| created     | `EventEmitter<Event>` | Emite quando o componente é instanciado e todas as modificações no DOM são realizados. |
| close       | `EventEmitter<Event>` | Emite quando um panel é fechado.                                                       |

## Exemplos

### Diretivas do Panel

No componente a ser instanciado é possível utilizar a diretiva de atributo `alb-panel-actions` a qual será responsável por gerar uma barra de ações abaixo do conteúdo do panel.

#### HTML

```html
<alb-body>
  <p>Conteúdo dentro do panel</p>
  <aside alb-panel-actions>
    <button alb-button>Button 1</button>
    <button alb-button>Button 2</button>
  </aside>
</alb-body>
```

### Criando um panel

#### HTML
```html
    <div #anchorPoint>Elemento de Referência</div>
```

#### TypeScript

```javascript
  @ViewChild('anchorPoint', { read: ElementRef, static: true }) anchorPoint: ElementRef<any>;

  constructor(
    private panelService: panelService,
  ) {}

  onOpenPanel() {
    this.panelService.create({
      component: PageComponent,
      title: 'Apenas um test',
      anchor: this.anchorPoint
    });
  }
```

### Inputs e Outputs do componente a ser instanciado

Você pode tratar todos os inputs do componente instanciado pela panel pela propriedade `componentProps`, a qual receberá o nome do input e seu valor.
Para tratar os outputs, você deve armazenar o Panel em uma váriavel e tratar os eventos nesta váriavel:

#### TypeScript

```javascript
  constructor(
    private panelService: PanelService,
  ) {}

  async onOpenPanel() {
    const { component } = await this.panelService.create({
      component: PageComponent,
      title: 'Apenas um test',
      componentProps: {
        meuInput: 'Oi',
      }
    });

    component.instance.meuOutput.subscribe(valor => console.log(valor));
  }
```

### Tratando eventos após o Panel emitir o evento 'close'

Caso você deseje capturar o evento de fechamento de Panel, faça o seguinte:

#### TypeScript

```javascript
  constructor(
    private panelService: PanelService,
  ) {}

  async onOpenPanel() {
    const { panelComponent } = await this.panelService.create({
      component: PageComponent,
      title: 'Apenas um test',
    });

    panelComponent.instance.close.subscribe(() => {
      console.log('Isto é executado com Panel fechar!')
    })
  }
```

## Abrindo e Ocultando o Panel

Caso você queira abrir e fechar o Panel através de uma outra ação na página, basta utilizar o método **toggleOpen** da seguinte maneira:

### TypeScript

```javascript

  constructor(
    private panelService: PanelService,
  ) {}

  async onOpenPanel() {
    await this.panelService.togglePanel({
      component: PageComponent,
      title: 'Apenas um test',
    });
  }
```

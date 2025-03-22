# Bottom Sheet

Primeiramente verifique se no seu módulo foi importado(seção **imports**) o **OverlayModule**. Também verifique se adicionou o **BottomSheetService** no seu **providers**.

O componente **alb-bottom-sheet** é um componente responsável pela criação de uma área abaixo de sua tela. Para realizar a utilização desse componente você deve realizar chamando em uma instância do serviço `BottomSheetService`. 
Esse serviço possuí o método `create()`, que recebe como parâmetro a interface `BottomSheet`.

## Inputs

| Propriedade    | Tipo                               |  Descrição                                                                                                                                           |
| -------------- | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| component      | `class`                            | Aceita uma `class` que define o nome do componente a ser instanciado.                                                                                |
| title          | `string`                           | Aceita uma `string` que define o título que será gerado no header do Bottom Sheet.                                                                   |
| componentProps | `{ [key: string]: any }`           | Aceita um `object` que define as propriedades do input do componente a ser instanciado (caso existir).                                               |

## Outputs

| Propriedade | Tipo           |  Descrição                                                                                    |
| ----------- | -------------- |--------------------------------------------------------------------------------------         |
| created     | `EventEmitter<Event>` | Emite quando o componente é instanciado e todas as modificações no DOM são realizados. |
| close       | `EventEmitter<Event>` | Emite quando um Bottom Sheet é fechado.                                                |

## Exemplos

### Diretivas do Bottom Sheet

No componente a ser instanciado é possível utilizar as diretivas de atributos `alb-bottom-sheet-title` a qual será responsável por gerar o título do Bottom Sheet, ou `alb-bottom-sheet-actions` a qual será responsável por gerar uma barra de ações ao lado do título.
**OBS:** Se você utilizar a diretiva `alb-bottom-sheet-title`, a prop `title` na criação do bottom sheet vai ser desconsiderada.

#### HTML

```html
<alb-body>
  <h1 alb-bottom-sheet-title>Hello World!</h1>
  <aside alb-bottom-sheet-actions>
    <button alb-button>Button 1</button>
  </aside>
</alb-body>
```

## Criando um bottom sheet

### TypeScript

```javascript
  constructor(
    private bottomSheetService: BottomSheetService,
  ) {}

  onOpenBottomSheet() {
    this.bottomSheetService.create({
      component: PageComponent,
      title: 'Titulo',
    });
  }
```

## Inputs e Outputs do componente a ser instanciado

Você pode tratar todos os inputs do componente instanciado pelo bottom sheet através da propriedade `componentProps`, a qual receberá o nome do input e seu valor.
Para tratar os outputs, você deve armazenar o BottomSheet em uma váriavel e tratar os eventos nesta váriavel:

### TypeScript

```javascript
  constructor(
    private bottomSheetService: BottomSheetService,
  ) {}

  async onOpenBottomSheet() {
    const { component } = await this.bottomSheetService.create({
      component: PageComponent,
      title: 'Apenas um test',
      componentProps: {
        meuInput: 'Oi',
      }
    });

    component.instance.meuOutput.subscribe(valor => console.log(valor));
  }
```

## Tratando eventos após o Bottom Sheet emitir o evento 'close'

Caso você deseje capturar o evento de fechamento do Bottom Sheet, faça o seguinte:

### TypeScript

```javascript
  constructor(
    private bottomSheetService: BottomSheetService,
  ) {}

  async onOpenBottomSheet() {
    const { bottomSheetComponent } = await this.bottomSheetService.create({
      component: PageComponent,
      title: 'Apenas um test',
    });

    bottomSheetComponent.instance.close.subscribe(() => {
      console.log('Isto é executado quando o Bottom Sheet fechar!')
    })
  }
```
## Fechando o Bottom Sheet através de um serviço

Caso você queira fechar o Bottom Sheet através de uma outra ação sem ser cliquando no ícone de fechar, basta utilizar o método **close** do bottomSheetService

### TypeScript

```javascript
this.bottomSheetService.close();
```

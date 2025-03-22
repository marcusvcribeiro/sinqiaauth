# Dialog

O componente **alb-dialog** utiliza do Overlay do @angular/cdk. A documentação deste pode ser encontrada [aqui](https://material.angular.io/cdk/overlay/overview). Em resumo, ele é utilizado para que não seja necessário chamar uma tag dentro do componente que utiliza o dialog.

Para a utilização do **alb-dialog**, lembre de colocar no **imports** do seu modulo o **UiModule** para importar o Dialog e todos os outros componentes Albert ou o **DialogModule** para importar somente o Dialog no seu projeto. Além disso, tenha certeza se o **DialogService** foi adicionado no **providers** do seu módulo. 

Existem 3 tipos de Dialog: confirm, error, info e custom. Error e info são mais simples, possuindo apenas um botão primário que as fecha. No confirm, a utilização é diferente, uma vez que é necessário implementar um callback para seu botão primário, já que o botão secundário é o responsável por fechá-la. A utilização do tipo custom é diferente de todos os outros, é instânciado um component dentro da dialog seguindo o padrão de inputs custimizados. 

Para utilizar qualquer tipo de dialog, basta criar um método na aplicação que chama o método *showModal* da **dialog.service**. Este método recebe um objeto do tipo Dialog, que contém as seguintes propriedades:

## Inputs

| Propriedade       | Tipo                                  | Descrição                                                                                                                       |
| ----------------- |-------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------  |
| type              | `string<'confirm','error','info'>`    | Aceita uma `string` que indica o tipo de dialog. Aceita três os valores `confirm`, `error` e `info`.                            |
| title             | `string`                              | Aceita uma `string` que define o título do dialog.                                                                              |
| message           | `string`                              | Aceita uma `string` que define a mensagem que será exibida no dialog.                                                           |
| btnPrimaryText    | `string`                              | Aceita uma `string` que define o texto do botão primário.                                                                       |
| callback?         | `Function`                            | Aceita uma `Function` que define o callback do botão primário. Esta opção só é disponível para o `type` com valor `confirm`.    |
| btnColor?         | `string`                              | Aceita uma `string` que define a cor do botão primário. Esta opção só é disponível para o `type` com valor `confirm`.           |
| btnSecondaryText? | `string`                              | Aceita uma `string` que define o texto do botão secundário. Esta opção só é disponível para o `type` com valor `confirm`.       |

## Inputs para o type custom

| Propriedade       | Tipo                                  | Descrição                                                                                                                       |
| ----------------- |-------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------  |
| type              | `string<'custom'>`                    | Aceita uma `string` que indica o tipo de dialog. Esse tipo define o intellisense dos próximos campos.                           |
| component         | `class`                               | Aceita uma `class` que define o componente a ser instanciado.                                                                   |
| componentProps    | `{ [key: string]: any }`              | Aceita um `object` que define as propriedades do input do componente a ser instanciado (caso existir).                          |

## Output

| Propriedade | Tipo           | Descrição                                                                                                                                              |
| ----------- | -------------  | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| close       | `EventEmitter` | Emite evento para que o service possa fechar o overlay a partir do botão sem que haja interação circular entre os dois arquivos (component e service). |
| created     | `EventEmitter` | Emite um evento assim que o dialog terminar de carregar |

## Exemplo de uso

### HTML

```html
<button alb-button (click)="showDialog()"> Abra aqui uma Dialog! </button>
```

### Typescript

```javascript
export class SomeComponent {
  
  constructor(private dialogService: DialogService) {}

  showDialog() {
   this.dialogService.create({
     type: 'info',
     title: 'Hello world',
     message: 'Olá mundo!!',
     btnPrimaryText: 'Okay',
   })
 }
}
```

```javascript
export class SomeComponent {
  
  constructor(private dialogService: DialogService) {}

  showDialog() {
   this.dialogService.create({
     type: 'error',
     title: 'Erro',
     message: 'Você não pode realizar esta ação!',
     btnPrimaryText: 'Okay'
   })
 }
}
```

```javascript
export class SomeComponent {
  
  constructor(private dialogService: DialogService) {}

  showDialog() {
   this.dialogService.create({
     type: 'confirm',
     title: 'Confirm',
     message: 'Você quer realizar isso?',
     btnPrimaryText: 'Sim',
     btnSecondaryText: 'Não',
     callback: () => { console.log('Confirmado') }
   })
 }
}
```
## Criando uma dialog customizada

### TypeScript

```javascript
  constructor(
    private dialogService: DialogService,
  ) {}

  onOpenDialog() {
    this.dialogService.create({
      type: 'custom',
      component: PageComponent,
      module: PageModule,
    });
  }
```

## Inputs e Outputs do componente a ser instanciado

Você pode tratar todos os inputs do componente instanciado pela dialog pela propriedade `componentProps`, a qual receberá o nome do input e seu valor.
Para tratar os outputs, você deve armazenar a Dialog em uma váriavel e tratar os eventos nesta váriavel:

### TypeScript

```javascript
  constructor(
    private dialogService: DialogService,
  ) {}

  async onOpenDialog() {
    const { component } = await this.dialogService.create({
      component: PageComponent,
      module: PageModule,
      title: 'Apenas um test',
      componentProps: {
        meuInput: 'Oi',
      }
    });

    component.instance.close.subscribe(eventClosed => console.log(eventClosed));
    component.instance.meuOutput.subscribe(valor => console.log(valor));
  }
```

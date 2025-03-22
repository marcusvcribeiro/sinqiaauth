# Modal

O componente **alb-modal** utiliza do Overlay do @angular/cdk a fim de criar uma modal customizada de acordo com as necessidades do projeto. A documentação do Overlay pode ser encontrada [aqui](https://material.angular.io/cdk/overlay/overview). Em resumo, ele é utilizado para que não seja necessário chamar uma tag dentro do componente que utiliza a modal.

Para a utilização do **alb-modal**, lembre de colocar no **imports** do seu modulo o **UiModule** para importar o Modal e todos os outros componentes Albert ou o **ModalModule** para importar somente o Modal no seu projeto. Além disso, tenha certeza se o **ModalService** foi adicionado no **providers** do seu módulo. 

## Inputs

| Propriedade       | Tipo        | Descrição                                                                                     |
| ----------------- |------------ | --------------------------------------------------------------------------------------------  |
| component         | `Component` | Aceita um `Component` para mostrar dentro da Modal. Qualquer componente pode ser instanciado. |
| title          | `string`                           | Aceita uma `string` que define o título que será gerado no header da Modal. |
| componentProps | `{ [key: string]: any }`           | Aceita um `object` que define as propriedades do input do componente a ser instanciado (caso existir). |
| size           | `string<'small'|'medium'|'large'>` | Aceita uma `string` que define qual tamanho que a Modal deve possuir ao ser gerado. Aceita os valores `large` e `medium` e `small`. |                  |

## Outputs

| Propriedade       | Tipo           | Descrição |
| ----------------- |--------------- | --------- |
| close             | `EventEmitter` | Emite evento para que o service possa fechar o overlay a partir do botão sem que haja interação circular entre os dois arquivos (component e service). |

## Diretivas

* `alb-modal-footer`: responsável por gerar o footer do Modal.

## Exemplo de Uso

### HTML

```html
<button alb-button (click)="showModal()"></button>
```

### Typescript

```javascript
export class SomeComponent {
  
  constructor(private modalService: ModalService) {}


  showModal() {
    this.modalService.create({
      component: ExampleComponent,
    });
  }
}
```

```javascript
export class SomeComponent {
  
  constructor(private modalService: ModalService) {}


  showModal() {
    this.modalService.create({
      component: ExampleComponent,
      title: 'Exemplo',
      size: 'small'
    });
  }
}
```

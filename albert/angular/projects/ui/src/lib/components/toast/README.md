# Alb-Toast

O componente **alb-toast** utiliza do Overlay do @angular/cdk. A documentação deste pode ser encontrada [aqui](https://material.angular.io/cdk/overlay/overview). Em resumo, ele é utilizado para que não seja necessário chamar uma tag dentro do componente que utiliza o toast.

Para a utilização do **alb-toast**, lembre de colocar no **imports** do seu modulo o **UiModule** para importar o Toast e todos os outros componentes Albert ou o **ToastModule** para importar somente o Toast no seu projeto. Além disso, tenha certeza se o **ToastService** foi adicionado no **providers** do seu módulo. 

Existem 4 tipos de Toast: alert, error, info e success. A única diferença entre eles são as cores e os ícones.

Para utilizar qualquer tipo de toast, basta criar um método na aplicação que chama o método *create* da **toast.service**. Este método recebe um objeto do tipo Toast, que contém as seguintes propriedades:

## Inputs

| Propriedade       | Tipo                                         | Descrição                                                                                                                           |
| ----------------- |--------------------------------------------- |----------------------------------------------------------------------------------------------------------------------------------- |
| type              | `string<'alert','error','info','success'>`   | Aceita uma `string` que indica o tipo de toast. Aceita quatro os valores `alert`, `error`, `info` e `success`.                                                                                       |
| text              | `string`                                     | Aceita uma `string` que define o título do toast.                                                                                                                              |

## Outputs

| Propriedade       | Tipo             | Descrição                                                                 |
| ----------------- |----------------- | ------------------------------------------------------------------------- |
| closed            | `EventEmitter`   | Emite um evento para mostrar setar o lastToast na service como undefined. |

## Exemplo de uso

### HTML

```html
<button alb-button (click)="showToast()"> Abra aqui um Toast! </button>
```

### Typescript

```javascript
export class SomeComponent {
  
  constructor(private toastService: ToastService) {}

  showToast() {
   this.toastService.create({
     text: 'Hello, World!',
   })
 }
}
```

```javascript
export class SomeComponent {
  
  constructor(private toastService: ToastService) {}


  showToast() {
   this.toastService.create({
     type: 'info',
     text: 'Hello, World!',
   })
 }
}
```

```javascript
export class SomeComponent {
  
  constructor(private toastService: ToastService) {}


  showToast() {
   this.toastService.create({
     type: 'error',
     text: 'Erro encontrado!',
   })
 }
}
```

```javascript
export class SomeComponent {
  
  constructor(private toastService: ToastService) {}


  showToast() {
   this.toastService.create({
     type: 'success',
     text: 'Transação realizada com sucesso!',
   })
 }
}
```

```javascript
export class SomeComponent {
  
  constructor(private toastService: ToastService) {}


  showToast() {
   this.toastService.create({
     type: 'alert',
     text: 'Cuidado!',
   })
 }
}
```

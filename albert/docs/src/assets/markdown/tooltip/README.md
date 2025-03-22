# Tooltip

O **albertTooltip** é uma diretiva criada utilizando do Overlay do @angular/cdk. A documentação deste pode ser encontrada [aqui](https://material.angular.io/cdk/overlay/overview). E essa diretiva pode ser adicionada em qualquer outro componente do seu projeto conforme os exemplos.

Para a utilização do **Albert Tooltip**, lembre de colocar no **imports** do seu modulo o **UiModule** para importar o Tooltip e todos os outros componentes Albert ou o **TooltipModule** para importar somente o Albert Tooltip no seu projeto.

O uso do Albert Tooltip é muito simples, basta você adicionar a diretiva **albertTooltip** passando o texto do tooltip. Então assim que o usuário passar o cursor sobre o componente, o tooltip irá aparecer.

## Exemplo de uso

### HTML

```html
<button alb-button albertTooltip="Texto para tooltip"> Button </button>
```

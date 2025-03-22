
# Body

O alb-body é um componente criado para padronizar a estruturação do **corpo** de uma página. Assim, a página fica dividida em um título no canto superior esquerdo e a opção de colocar qualquer outro elemento no canto superior direito. Além disso, todo código fora das tags **h1** e **aside** vai ser entendido como o conteúdo da página.

- **h1**: Para gerar o título da página no canto superior esquerdo
- **aside**: Área lateral de ações da página no canto superior direito

## Exemplo de uso

### HTML

```html
<alb-body>
  <h1>Hello world</h1>
  <aside>
    <button alb-button>Button 1</button>
    <button alb-button>Button 2</button>
  </aside>

  <alb-card title="Just a test">
    <p>Hi!</p>
  </alb-card>
</alb-body>
```

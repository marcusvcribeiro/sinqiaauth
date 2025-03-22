# Design Tokens

O Style Dictionary é responsável por gerar os design tokens a partir do JSON gerado no Figma Tokens. 

## Como atualizar os tokens

Basta colar os JSONs gerado pelo Figma Tokens dentro da pasta style-dictionary/tokens e na pasta raiz do projeto rodar o seguinte comando:

```shell
npm run generate-tokens
```

Os arquivos da pasta styles/core/design-tokens serão sobrescritos e, quando houver novas categorias, serão criados automaticamente novos arquivos.

## Como configurar o Style Dictionary

Todas as configurações para a conversão estão no arquivo app.js. Para acessar a documentação do Style Dictionary basta clicar [aqui](https://amzn.github.io/style-dictionary/#/).
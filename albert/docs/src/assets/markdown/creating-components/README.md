# Criando e alterando componentes

Caso não tenha visto a documentação de como contribuir com o Albert, é importante lê-la antes de seguir esse tutorial. [Clique aqui](https://dev.sinqia.io/albert/docs/utils/contributing) para acessar.

## Estrutura

Os componentes do Albert encontram-se no diretório angular > projects.

* Componentes globais estruturais, que modificam o layout da tela, ficam na pasta **layout**. Exemplos desse tipo são header e navbar.
* Componentes reutilizáveis e que não modificam o layout da tela ficam na pasta **ui**. Exemplos desse tipo são botões e cards. 

Todo componente tem os seguintes arquivos:

![](./assets/img/component-structure.PNG)

### HTML

Nesse arquivo é desenvolvida a parte visual do componente. Um componente do Albert pode utilizar outros componentes da própria biblioteca em sua construção.

### Spec

Nesse arquivo são desenvolvidos os testes automatizados do componente. O framework utilizado é o Jasmine. Em caso de alteração de um componente já existente, deve ser analisado se é necessária atualização nos testes.

### Component

Nesse arquivo está a classe do objeto, com seus atributos e eventos. 

### Module

Nesse arquivo são importadas e exportadas funcionalidades.

### README

Nesse arquivo é feita a documentação do componente. Nele deve conter a descrição do componente, como ele se comporta, seus atributos e como implementá-lo. Visualize a documentação de componentes já existentes para seguir padrões de conteúdo e organização. Em caso de alteração de um componente já existente, deve ser analisado se é necessária atualização da documentação.

## Criando novos componentes

Para o caso de criação de um novo componente, o primeiro passo é identificar se realmente não existe um componente que tenha a função que você precisa, seja da forma como está ou sendo necessária a criação de um novo atributo. Isso evita repetições de código e pode resolver um *gap* que passou despercebido em um componente já existente.

### Gerando os arquivos necessários

Dentro da pasta em questão, acesse src > lib > components e rode o comando a seguir para gerar o novo componente:

```
ng generate component nome-do-componente
```

Será criada uma pasta com os arquivos necessários para o seu novo componente, com exceção do README que deve ser criado manualmente, e ele será importado automaticamente no respectivo módulo. 

O documento css gerado automaticamente deverá ser apagado, pois todos os estilos do Albert são implementados no projeto Styles. Lembre-se de apagar o stylesUrl do arquivo component.ts para que não apresente erro no componente ao tentar buscar o arquivo apagado.

**Importante:** É necessário exportar o seu novo componente no arquivo public-api.ts que fica dentro da pasta do projeto correspondente (layout ou ui).

### Documentação

Além do arquivo README dentro da pasta do seu componente, é necessário atualizar o projeto da documentação, que também se encontra dentro do repositório do Albert.

Seguindo o caminho docs > src > app você encontrará as pastas layout e ui, onde deverá criar uma página para o seu novo componente dentro da pasta correspondente com o mesmo comando do tópico **Gerando os arquivos necessários**. Os únicos arquivos necessários serão o html e o ts, o resto pode ser apagado.

Além disso, será necessário criar a navegação para a nova página criada no arquivo routing.module.ts dentro da pasta correspondente e incluir a nova documentação no menu adicionando-a na *lista* dentro do arquivo app.component.ts.

O html deverá estar no seguinte padrão:

```html
<alb-body>
  <doc-template>

    <docTemplateTitle>Nome do componente</docTemplateTitle>

    <docTemplateCode>
      <markdown [src]="'./assets/markdown/nome-do-componente/README.md'"></markdown>
    </docTemplateCode>

  </doc-template>
</alb-body>
```

## Teste Unitários

Toda funcionalidade no Albert deve vir acompanhada com seus respectivos casos de testes. Os testes devem cumprir as seguintes exigências: 

* Testes simples e especificos para cada funcionalidade
* Os testes devem abrangir todas as funcionalidades do componente
* Devem ser genéricos, ou seja, não tratar situações específicas.

Para testes utilizamos o padrão Angular (Jasmine e o Karma). Para mais informações segue o link de [testes na documentação do Angular](https://angular.io/guide/testing).

## Testando componentes

Após a criação/alteração do componente, é possível testar o seu funcionamento no projeto Playground.

### Nomenclatura de commits

Todos os commits dentro da branch devem estar no seguinte padrão: **prefixo**(**projeto**/**componente-alterado**): **descrição-da-alteração**.

Prefixos: 
- **fix** -> bug
- **feature** -> features novas
- **test** -> testes
- **build** -> gerar versão
- **docs** -> documentação
- **refactor** -> refatoração do código

Aqui está um exemplo:
  > feature(angular/sq-button): adiciona sq-button.

## Disponibilizando suas alterações

Para que suas alterações fiquem disponíveis na biblioteca, é necessário fazer um Pull Request, que será analisado por um ou mais Core Commiters do projeto. Após a aprovação do seu PR, o novo componente estará disponível assim que uma nova versão do Albert for publicada.

Para fazer o Pull Request, acesse o [Processo de PR's](https://dev.sinqia.io/albert/docs/utils/pr-process).

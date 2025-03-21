# Pix Front

Esse projeto é responsável por ser o frontend da solução de Pagamentos Instantâneos da Sinqia: o PIX.

## Principais tecnologias

O Pix Front está sendo desenvolvido apoiado no framework [Angular](https://angular.io/) na versão 9.1.3.

Para seguir os padrões do Design System da Sinqia de componentes e estilos, a biblioteca [Albert](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-front) está sendo utilizada.

## Executando o projeto

Para executar o projeto, certifique-se de que você tenha o Node (versão mínima: v12.16.2) instalado na sua máquina. Com ele instalado, você terá acesso ao NPM (gerenciador de pacotes do Node).

Após certificar-se de que possui o Node instalado em sua máquina, clone o projeto para o diretório que desejar em sua máquina. Após clonar o projeto, entre no diretório do projeto clonado, através de um terminal de linha de comando, e execute o seguinte comando para instalar as dependências do projeto:

```bash
$ npm install
```

Após instalar as dependências do projeto, execute o projeto com o seguinte comando:

```bash
$ ng serve
```

*Se for a primeira vez que você está executando o projeto, é possível que demore um pouco para compilar a aplicação e deixar ela pronta para utilização.*


Quando a aplicação estiver pronta para uso você verá, no terminal que executou o comando `ng serve`, a seguinte mensagem:

```
** Angular Live Development Server is listening on localhost:8771, open your browser on http://localhost:8771/ **
: Compiled successfully.
```

**Note que a aplicação está sendo executada na porta 8771.**

## Executando testes

As ferramentas utilizadas para testes da aplicação são as próprias que o Angular utiliza: [Karma](https://karma-runner.github.io) para testes unitários e [Protractor](http://www.protractortest.org/) para testes e2e.

Para executar os testes dessa aplicação, execute o seguinte comando:

```bash
## Para testes unitários
$ ng test

## Para testes e2e
$ ng e2e
```

## Mais informações

Para mais informações sobre o PIX, acesse o [Confluence](https://confluence.sinqia.com.br/pages/viewpage.action?pageId=73468787).

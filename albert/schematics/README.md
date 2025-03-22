

## Usando o Schematics

Utilize nosso Schematics para instalar a lib e todas as dependencias de forma simples com o comando:

Crie uma nova aplicação angular
```shell
  ng new minhaaplicacao
```

Temos que instalar a biblioteca @albert/schematics:
```shell
  npm install https://nexus.sinqia.io/repository/npm-repo/@albert/cli/-/scheamtics-1.0.0.tgz
```

Rode o seguinte comando para fazer a instalação:
```shell
  ng add @albert/schematics
```

Agora já pode rodar a aplicação:
```shell
  ng serve
```

O comando **ng add** irá executar uma instalação básica em usa a aplicação:
1. No __Package.json__ irá adicionar as seguintes bibliotecas:
  - @albert/layout
  - @albert/styles
  - @albert/ui
  - @angular/animations
  - @angular/cdk
  - angular-imask
  - date-fns
  - imask

2. Em __angular.json__:
  - Adiciona o style do projeto @albert/styles 
    ```json
    "styles": [
              "...",
              "node_modules/@albert/styles/css/all.css"
            ],
    ```

  - Configura o @albert/schematics como biblioteca de schematics default adicionando:
    ```json
    "cli": {
        "defaultCollection": "@albert/schematics"
      }
    ```

3. Em __app.module.ts__ adiciona aos imports as seguintes bibliotecas:
  - UiModule
  - LayoutModule
  - BrowserAnimationsModule

Com o Schematics instalado você também terá acesso a novos comandos que podem auxiliar na criação de componentes, veja mais detalhes em: [Documentação dos Schematics](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-front?path=%2Fangular%2Fprojects%2Fschematics%2FREADME.md&_a=preview)


## Comandos disponíveis


## NG ADD
Instala dependências e configura um projeto Angular com o básico para usar o Albert
```
ng add
```

## Module
```
ng g module
```
| Opções 	| Descrição 	|
|-	|-	|
| ng g module nomedomodule 	| Passando um caminho que seja um Módulo ele já adicionar o componente a sua rota (Lazy Load) 	|
| m 	| Alias 	|

## Component
```
ng g component
```
| Opções 	| Descrição 	|
|-	|-	|
| ng g component nomedomodule/component 	| Passando um caminho que seja um Módulo ele já adicionar o componente a sua rota (Lazy Load) 	|
| c 	| Alias 	|

## Desenvolvimento
Caso você queira contribuir com o desenvolvimento dos Schematics, aqui vamos falar como compilar o código.

## OBS:
 - Não esquecer de entrar em: angular/projects/schematics/

## Install
```
npm install
```

## Build
```
npm run build
```

## Empacotar para desenvolvimento
```
npm pack
```

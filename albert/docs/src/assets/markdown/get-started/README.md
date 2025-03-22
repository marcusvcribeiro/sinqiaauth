# Get Started

Ao começar a utilizar o **Albert Angular**, existem uma série de passos simples que devem ser seguidos para começar um projeto.

## Pré-Requisitos

* Acesso ao nexus da Sinqia
* Um editor de texto (recomenda-se o *Visual Studio Code*)
* Node.js ^13.0.0
* Angular 9.0.0

## Passo a passo

Para utilizar o Albert Angular em seu projeto, existem três possíveis formas de realizar a instalação:

### 1. Albert Maker

O **Albert Maker** é uma ferramenta de linha de comando para instalar um projeto angular (existente ou novo) e configurá-lo com o Albert Angular de forma automática. Você encontra mais informações e instruções de utilização no [README](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-maker?path=%2FREADME.md&_a=preview) do projeto.

### 2. Albert Schematics

O **Albert Schematics** instala o Albert Angular no projeto que já está na sua máquina. As instruções para sua utilização podem ser encontradas no [README](https://tfs.seniorsolution.com.br/PD/Albert/_git/alb-front?path=%2Fschematics%2FREADME.md&_a=preview) do projeto.

### 3. Instalação manual

Com o projeto já clonado/criado em sua máquina, acesse a pasta raiz do projeto e rode o comando `npm install link-da-dependencia`. Você pode fazer isso através de um terminal que encontra-se no diretório de seu projeto ou, no caso de estar usando o Visual Studio Code, pode também utilizar o terminal do próprio editor de texto. Os links das versões mais recentes dos projetos no nexus podem ser encontrados na seção [Releases](https://dev.sinqia.io/albert/docs/utils/releases).

---
#### Peer Dependencies

As bibliotecas UI e Layout possuem algumas *peerDependencies* que devem ser adicionadas manualmente.
* [@angular/cdk](https://www.npmjs.com/package/@angular/cdk)
* [imask](https://imask.js.org/guide.html)
* [date-fns](https://date-fns.org/)
* [@ng-select/ng-select](https://www.npmjs.com/package/@ng-select/ng-select)
---

Após a instalação, é necessário importar os Módulos **UiModule**, **LayoutModule** e **BrowserAnimationsModule** no **app.module**. Abaixo temos um exemplo:

```javascript

import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

import { UiModule } from '@albert/ui';
import { LayoutModule } from '@albert/layout';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';



@NgModule({
   declarations: [
      AppComponent,
   ],
   imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    LayoutModule,
    UiModule,
   ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Também será necessário indicar a utilização do projeto Albert Styles no arquivo **angular.json**. Isso pode ser feito como o exemplo abaixo:

```javascript

"styles": [
          "src/styles.scss",
          "node_modules/@albert/styles/css/all.css",
        ],

```

Para a construção básica de uma tela, de uma olhada no tópico [Layout -> Container](https://dev.sinqia.io/albert/docs/layout/container).

Seguindo todos esses passos, o Albert Angular estará pronto para ser utilizado! Prossiga para as páginas de cada componente para ver a utilização específica de cada um deles.
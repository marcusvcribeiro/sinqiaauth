# Container

O componente **alb-container** é responsável por padronizar a estruturação de uma página.

Caso queira que a sua aplicação tenha um **header**, basta adicionar o componente [alb-header](https://dev.sinqia.io/albert/docs/layout/header) e acrescentar a classe **alb-container-header**

Caso deseje ter um **sidenav** com o menu de navegação, é preciso adicionar o componente [alb-navigation](https://dev.sinqia.io/albert/docs/layout/navigation) e acrescentar a classe **alb-container-sidenav**

E o conteúdo da página deve dentro de uma div com a classe **alb-container-body**


## Exemplo básico de uma aplicação com header e navegação

```html
<alb-container>
  <alb-header class="alb-container-header" name="Nome da aplicação"></alb-header>
  <alb-navigation [items]="items" class="alb-container-sidenav"></alb-navigation>
  <div class="alb-container-body">
   <router-outlet></router-outlet>
  </div>
</alb-container>
```

```javascript
import { NavigationItem } from '@albert/layout';

items: NavigationItem[] = [
  {
    id: '1',
    name: 'Home',
    icon: 'work',
    path: '/page-2',
  },
  {
    id: '2',
    name: 'Favorito',
    icon: 'today',
    path: '/page-2',
  }
]
```

## Exemplo básico de uma aplicação apenas com header

```html
<alb-container>
  <alb-header class="alb-container-header" name="Nome da aplicação"></alb-header>
  <div class="alb-container-body">
   <router-outlet></router-outlet>
  </div>
</alb-container>
```

## Exemplo básico de uma aplicação apenas com sidenav

```html
<alb-container>
  <alb-header class="alb-container-header" name="Nome da aplicação"></alb-header>
  <div class="alb-container-body">
   <router-outlet></router-outlet>
  </div>
</alb-container>
```

## Exemplo básico de uma aplicação simples

```html
<alb-container>
  <div class="alb-container-body">
   <router-outlet></router-outlet>
  </div>
</alb-container>
```

## Exemplo de criação de um layout com elementos customizados

```html
<alb-container>
  <div class="alb-container-header"></div>
  <div class="alb-container-sidenav"></div>
  <div class="alb-container-body">
    <router-outlet></router-outlet>
  </div>
</alb-container>
```

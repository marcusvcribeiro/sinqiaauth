# LoaderAsync

O componente **alb-loader-async** renderiza um componente de visualizacao de loading. Ele foi feito para ser exibido enquanto uma requisição está pendente. Pra isso, ele utiliza de um service para controlar o estado e um interceptor http para identificar quando esse estado será alterado.

## Como utilizar

Para a utilização do componente é preciso importar o **UiModule** ou **LoaderAsyncModule**. Além disso, é necessário configurar o interceptor **LoaderInterceptor** na sua aplicação, de preferência nos providers do app.module.ts.


## Interceptor

```ts
   providers: [   
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    },
  ],
```

Após a configuração do interceptor, você pode usar o componente aonde quiser. No layout do Albert, nós sugerimos que ele fique entre o component de alb-navigation e alb-container-body. Deste modo, ele fica abaixo do header e antes do contexto do menu.


## LoaderAsync

```html
<alb-container>
  <alb-header class="alb-container-header" name="SPB" logoColor="#3e50b4">
    <app-global-action-buttons></app-global-action-buttons>
  </alb-header>
  <alb-navigation albUIMNavigationProvider class="alb-container-sidenav"></alb-navigation>
  <alb-loader-async></alb-loader-async>
  <div class="alb-container-body">
    <router-outlet></router-outlet>
  </div>
</alb-container>
```

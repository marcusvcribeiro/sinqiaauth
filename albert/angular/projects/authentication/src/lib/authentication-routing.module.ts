import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForbiddenComponent } from './component/forbidden/forbidden.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { PostLoginComponent } from './component/post-login/post-login.component';
import { PostLogoutComponent } from './component/post-logout/post-logout.component';
import { SessionExpiredComponent } from './component/session-expired/session-expired.component';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';

// Rotas utilizadas para autenticação
const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'post-login', component: PostLoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'forbidden', component: ForbiddenComponent },
      { path: 'post-logout', component: PostLogoutComponent },
      { path: 'session-expired', component: SessionExpiredComponent },
      { path: 'unauthorized', component: UnauthorizedComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AuthenticationRoutingModule { }

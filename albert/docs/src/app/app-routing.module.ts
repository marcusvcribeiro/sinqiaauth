import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home/home.module').then(m => m.HomeDocModule)
  },
  {
    path: 'ui',
    loadChildren: () => import('./ui/ui.module').then(m => m.UiDocModule)
  },
  {
    path: 'layout',
    loadChildren: () => import('./layout/layout.module').then(m => m.LayoutDocModule)
  },
  {
    path: 'styles',
    loadChildren: () => import('./styles/styles.module').then(m => m.StylesDocModule)
  },
  {
    path: 'utils',
    loadChildren: () => import('./utils/utils.module').then(m => m.UtilsDocModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

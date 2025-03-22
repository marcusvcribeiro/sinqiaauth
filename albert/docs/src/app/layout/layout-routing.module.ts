import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BodyDocComponent } from './pages/body/body.component';
import { BottomSheetDocComponent } from './pages/bottom-sheet/bottom-sheet.component';
import { ContainerDocComponent } from './pages/container/container.component';
import { HeaderDocComponent } from './pages/header/header.component';
import { NavbarFullDocComponent } from './pages/navbar-full/navbar-full.component';
import { NavbarSimpleDocComponent } from './pages/navbar-simple/navbar-simple.component';
import { NavigationDocComponent } from './pages/navigation/navigation.component';
import { SidenavDocComponent } from './pages/sidenav/sidenav.component';

const routes: Routes = [
  {
    path: 'body',
    component: BodyDocComponent,
  },
  {
    path: 'bottom-sheet',
    component: BottomSheetDocComponent,
  },
  {
    path: 'container',
    component: ContainerDocComponent,
  },
  {
    path: 'header',
    component: HeaderDocComponent,
  },
  {
    path: 'navbar-full',
    component: NavbarFullDocComponent,
  },
  {
    path: 'navbar-simple',
    component: NavbarSimpleDocComponent,
  },
  {
    path: 'navigation',
    component: NavigationDocComponent,
  },
  {
    path: 'sidenav',
    component: SidenavDocComponent,
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }

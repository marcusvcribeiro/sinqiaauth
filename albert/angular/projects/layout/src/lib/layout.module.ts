import { NgModule } from '@angular/core';
import { BodyModule } from './components/body/body.module';
import { ContainerModule } from './components/container/container.module';
import { HeaderModule } from './components/header/header.module';
import { NavbarFullModule } from './components/navbar-full/navbar-full.module';
import { NavbarSimpleModule } from './components/navbar-simple/navbar-simple.module';
import { NavigationModule } from './components/navigation/navigation.module';
import { SidenavModule } from './components/sidenav/sidenav.module';
import { SmartPanelModule } from './components/smart-panel/smart-panel.module';

@NgModule({
  imports: [
    BodyModule,
    ContainerModule,
    HeaderModule,
    NavbarFullModule,
    NavbarSimpleModule,
    NavigationModule,
    SidenavModule,
    SmartPanelModule
  ],
  exports: [
    BodyModule,
    ContainerModule,
    HeaderModule,
    NavbarFullModule,
    NavbarSimpleModule,
    NavigationModule,
    SidenavModule,
    SmartPanelModule
  ],
  declarations: []
})
export class LayoutModule { }

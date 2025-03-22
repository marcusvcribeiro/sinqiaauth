import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

import { LayoutModule, BottomSheetService } from '@albert/layout';
import { MarkdownModule } from 'ngx-markdown';
import { UiModule } from '@albert/ui';

import { BodyDocComponent } from './pages/body/body.component';
import { BottomSheetDocComponent } from './pages/bottom-sheet/bottom-sheet.component';
import { ContainerDocComponent } from './pages/container/container.component';
import { DocTemplateModule } from 'src/app/doc-template/doc-template.module';
import { HeaderDocComponent } from './pages/header/header.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { NavbarFullDocComponent } from './pages/navbar-full/navbar-full.component';
import { NavbarSimpleDocComponent } from './pages/navbar-simple/navbar-simple.component';
import { NavigationDocComponent } from './pages/navigation/navigation.component';
import { SidenavDocComponent } from './pages/sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    DocTemplateModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    LayoutModule,
    LayoutRoutingModule,
    UiModule,
    OverlayModule
  ],
  declarations: [
    BodyDocComponent,
    BottomSheetDocComponent,
    ContainerDocComponent,
    HeaderDocComponent,
    NavbarFullDocComponent,
    NavbarSimpleDocComponent,
    NavigationDocComponent,
    SidenavDocComponent
  ],
  providers: [
    BottomSheetService
  ]
})
export class LayoutDocModule {}

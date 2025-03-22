import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { OverlayModule } from '@angular/cdk/overlay';

import { LayoutModule } from '@albert/layout';
import { MarkdownModule } from 'ngx-markdown';
import { UiModule } from '@albert/ui';

import { BoxSpaceDocComponent } from './pages/box-space/box-space.component';
import { ButtonGroupDocComponent } from './pages/button-group/button-group.component';
import { DivisorDocComponent } from './pages/divisor/divisor.component';
import { DocTemplateModule } from './../doc-template/doc-template.module';
import { IconDocComponent } from './pages/icon/icon.component';
import { StylesRoutingModule } from './styles-routing.module';
import { VariablesDocComponent } from './pages/variables/variables.component';

@NgModule({
  imports: [
    CommonModule,
    DocTemplateModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    LayoutModule,
    StylesRoutingModule,
    UiModule,
    OverlayModule
  ],
  declarations: [
    BoxSpaceDocComponent,
    ButtonGroupDocComponent,
    DivisorDocComponent,
    VariablesDocComponent,
    IconDocComponent
  ],
})
export class StylesDocModule {}

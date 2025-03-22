import { ButtonIconModule, ButtonModule, InputModule, LoaderModule, MenuModule, TabsModule } from '@albert/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GridsterModule } from 'angular-gridster2';
import { DashboardPageComponent } from './component/dashboard-page/dashboard-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { NewDashboardComponent } from './component/new-dashboard/new-dashboard.component';
import { NewWidgetComponent } from './component/new-widget/new-widget.component';
import { WidgetComponent } from './component/widget/widget.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GridsterModule,
    InputModule,
    MenuModule,
    ButtonModule,
    ButtonIconModule,
    TabsModule,
    LoaderModule
  ],
  declarations: [
    DashboardComponent,
    DashboardPageComponent,
    NewDashboardComponent,
    WidgetComponent,
    NewWidgetComponent
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule {

}

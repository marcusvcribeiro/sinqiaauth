import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './page/home-page.component';
import { GlobalActionButtonsComponent } from './global-action-buttons/global-action-buttons.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([]),
  ],
  declarations: [
    HomePageComponent,
    GlobalActionButtonsComponent
  ],
  exports: [
    HomePageComponent,
    GlobalActionButtonsComponent
  ]
})
export class HomeModule { }

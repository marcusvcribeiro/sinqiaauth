import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';

@NgModule({
  imports: [
    ComponentsModule,
  ],
  exports: [
    ComponentsModule
  ],
  declarations: [
  ]
})
export class UiModule { }

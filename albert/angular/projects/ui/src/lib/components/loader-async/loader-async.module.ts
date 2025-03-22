import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderAsyncComponent } from './loader-async.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    LoaderAsyncComponent
  ],
  exports: [
    LoaderAsyncComponent
  ]
})
export class LoaderAsyncModule { }

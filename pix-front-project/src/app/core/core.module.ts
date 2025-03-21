import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './component/main/main.component';
import { ConfigService } from './service/config.service';
import { GlobalHttpErrorService } from './service/global-http-error.service';
import { HomeModule } from '../home/home.module';

@NgModule({
  imports: [
    SharedModule,
    HomeModule
  ],
  exports: [
    MainComponent,
  ],
  declarations: [
    MainComponent,
  ],
  providers: [
    ConfigService,
    GlobalHttpErrorService,
  ]
})
export class CoreModule { }

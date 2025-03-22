import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UIMDashboardProviderModule } from './dashboard-provider/uim-dashboard-provider.module';
import { UIMNavigationProviderModule } from './navigation-provider/uim-provider.module';

@NgModule({
  declarations: [
  ],
  imports: [
    HttpClientModule,
    UIMNavigationProviderModule,
    UIMDashboardProviderModule
  ],
  exports: [
  ]
})
export class UIMProviderModule { }

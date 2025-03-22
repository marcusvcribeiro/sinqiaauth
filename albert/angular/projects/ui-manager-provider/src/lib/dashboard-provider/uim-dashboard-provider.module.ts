import { DashboardModule } from '@albert/dashboard';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UIMDashboardProviderDirective } from './uim-dashboard-provider.directive';

@NgModule({
  declarations: [
    UIMDashboardProviderDirective
  ],
  imports: [
    HttpClientModule,
    DashboardModule,
  ],
  exports: [
    UIMDashboardProviderDirective
  ]
})
export class UIMDashboardProviderModule { }

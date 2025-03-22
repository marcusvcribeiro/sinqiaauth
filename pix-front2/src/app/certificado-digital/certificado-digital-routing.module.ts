import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificadoDigitalComponent } from './page/certificado-digital/certificado-digital.component';


const routes: Routes = [
  {
    path: '',
    component: CertificadoDigitalComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class CertificadoDigitalRoutingModule { }

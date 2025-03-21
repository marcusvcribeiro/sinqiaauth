import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { CertificadoDigitalRoutingModule } from './certificado-digital-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CertificadoDigitalComponent } from './page/certificado-digital/certificado-digital.component';
import { CertificadoDigitalDrawerComponent } from './component/certificado-digital-drawer/certificado-digital-drawer.component';


@NgModule({
  declarations: [
    CertificadoDigitalComponent,
    CertificadoDigitalDrawerComponent
  ],
  imports: [
    SharedModule,
    CertificadoDigitalRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  exports:[
    CertificadoDigitalComponent,
    CertificadoDigitalDrawerComponent
  ]
})
export class CertificadoDigitalModule { }

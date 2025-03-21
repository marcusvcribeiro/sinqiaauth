import { SegurancaModule } from './../seg/seguranca.module';
import { NgModule } from '@angular/core';
import { MonitorRepositorioRoutingModule } from './monitor-repositorio-routing.module';
import { MonitorRepositorioComponent } from './page/monitor-repositorio.component';
import { MonitorRepositorioService } from './service/monitor-repositorio.service';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RepositorioEntradaComponent } from './component/repositorio-entrada/repositorio-entrada.component';
import { RepositorioSaidaComponent } from './component/repositorio-saida/repositorio-saida.component';
import { MonitorEntradaComponent } from './component/monitor-entrada/monitor-entrada.component';
import { MonitorSaidaComponent } from './component/monitor-saida/monitor-saida.component';

@NgModule({
  imports: [
    SharedModule,
    MonitorRepositorioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    MonitorRepositorioComponent,
    RepositorioEntradaComponent,
    RepositorioSaidaComponent,
    MonitorEntradaComponent,
    MonitorSaidaComponent,
  ],
  providers: [
    MonitorRepositorioService
  ]
})
export class MonitorRepositorioModule { }

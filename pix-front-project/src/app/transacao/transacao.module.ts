import { NgModule } from '@angular/core';
import { SegurancaModule } from '../seg/seguranca.module';
import { SharedModule } from '../shared/shared.module';
import { AvisoLiberacaoBloqueioDrawerComponent } from './component/aviso-liberacao-bloqueio-drawer/aviso-liberacao-bloqueio-drawer.component';
import { DesbloqueioTransacaoListaComponent } from './page/desbloqueio-transacao-lista.component';
import { TransacaoRoutingModule } from './transacao-routing.module';

@NgModule({
  declarations: [
    DesbloqueioTransacaoListaComponent,
    AvisoLiberacaoBloqueioDrawerComponent
  ],
  imports: [
    SharedModule,
    TransacaoRoutingModule,
    SegurancaModule
  ],
})
export class TransacaoModule { }

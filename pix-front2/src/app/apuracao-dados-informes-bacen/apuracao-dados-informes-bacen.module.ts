import { MesesDoAnoPipe } from './../shared/pipe/meses-do-ano.pipe';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ApuracaoDadosInformesBacenRoutingModule } from './apuracao-dados-informes-bacen-routing.module';
import { ApuracaoDadosInformesBacenComponent } from './page/apuracao-dados-informes-bacen.component';
import { ApuracaoDadosInformesBacenListaSinteticoComponent } from './component/apuracao-dados-informes-bacen-lista-sintetico/apuracao-dados-informes-bacen-lista-sintetico.component';
import { ApuracaoDadosInformesBacenGerarDrawerComponent } from './component/apuracao-dados-informes-bacen-gerar-drawer/apuracao-dados-informes-bacen-gerar-drawer.component';
import { ApuracaoDadosInformesBacenImportarCadastroTabComponent } from './component/apuracao-dados-informes-bacen-importar-cadastro-tab/apuracao-dados-informes-bacen-importar-cadastro-tab.component';
import { ApuracaoDadosInformesBacenImportarDrawer } from './component/apuracao-dados-informes-bacen-importar-drawer/apuracao-dados-informes-bacen-importar-drawer.component';
import { ApuracaoDadosInformesBacenImportarUploadTabComponent } from './component/apuracao-dados-informes-bacen-importar-upload-tab/apuracao-dados-informes-bacen-importar-upload-tab.component';
import { ApuracaoDadosInformesBacenListaAnaliticoComponent } from './component/apuracao-dados-informes-bacen-lista-analitico/apuracao-dados-informes-bacen-lista-analitico.component';
import { ApuracaoDadosInformesBacenListaBloqueio } from './component/apuracao-dados-informes-bacen-lista-bloqueio/apuracao-dados-informes-bacen-lista-bloqueio.component';
import { ApuracaoDadosInformesBacenListaDisponibilidadeComponent } from './component/apuracao-dados-informes-bacen-lista-disponibilidade/apuracao-dados-informes-bacen-lista-disponibilidade.component';
import { ApuracaoDadosInformesBacenService } from './service/apuracao-dados-informes-bacen.service';

import { DictChaveInclusaoPipe } from './pipe/dict-chave-inclusao.pipe';
import { DictStatusTransacaoPipe } from './pipe/dict-status-transacao.pipe';
import { DictTipoTransacaoPipe } from './pipe/dict-tipo-transacao.pipe';
import { PixDetalheTransacaoPipe } from './pipe/pix-detalhe-transacao.pipe';
import { PixEnvolvidoTransacaoPipe } from './pipe/pix-envolvido-transacao.pipe';
import { PixFonteReceitaPipe } from './pipe/pix-fonte-receita.pipe';
import { PixStatusTransacaoPipe } from './pipe/pix-status-transacao.pipe';
import { TipoTransacaoPipe } from './pipe/tipo-transacao.pipe';
import { PixMotivoRejeicaoPipe } from './pipe/pix-motivo-rejeicao.pipe';
import { PixCanalIniciacaoPipe } from './pipe/pix-canal-iniciacao.pipe';
import { PixMecanismoIniciacaoPipe } from './pipe/pix-mecanismo-iniciacao.pipe';
import { PixNaturezaUsuarioPipe } from './pipe/pix-natureza-usuario.pipe';
import { PixProcessoIniciacaoPipe } from './pipe/pix-processo-iniciacao.pipe';
import { PixFinalidadeTransacaoPipe } from './pipe/pix-finalidade-transacao';
import { BloDetalheBloqueioPipe } from './pipe/blo-detalhe-bloqueio';
import { SegurancaModule } from './../seg/seguranca.module';

@NgModule({
  imports: [
    SharedModule,
    ApuracaoDadosInformesBacenRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SegurancaModule
  ],
  declarations: [
    ApuracaoDadosInformesBacenComponent,
    ApuracaoDadosInformesBacenListaAnaliticoComponent,
    ApuracaoDadosInformesBacenListaSinteticoComponent,
    ApuracaoDadosInformesBacenImportarDrawer,
    ApuracaoDadosInformesBacenImportarCadastroTabComponent,
    ApuracaoDadosInformesBacenImportarUploadTabComponent,
    ApuracaoDadosInformesBacenGerarDrawerComponent,
    ApuracaoDadosInformesBacenListaBloqueio,
    ApuracaoDadosInformesBacenListaDisponibilidadeComponent,
    DictChaveInclusaoPipe,
    DictStatusTransacaoPipe,
    DictTipoTransacaoPipe,
    PixDetalheTransacaoPipe,
    PixEnvolvidoTransacaoPipe,
    PixFonteReceitaPipe,
    PixStatusTransacaoPipe,
    TipoTransacaoPipe,
    PixMotivoRejeicaoPipe,
    PixCanalIniciacaoPipe,
    PixMecanismoIniciacaoPipe,
    PixNaturezaUsuarioPipe,
    PixProcessoIniciacaoPipe,
    PixFinalidadeTransacaoPipe,
    BloDetalheBloqueioPipe
  ],
  providers: [
    ApuracaoDadosInformesBacenService
  ]
})
export class ApuracaoDadosInformesBacenModule { }

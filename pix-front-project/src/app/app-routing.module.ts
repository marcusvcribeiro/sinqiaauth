import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './core/component/main/main.component';
import { AuthenticationGuard } from '@albert/authentication';
import { ParametrosGlobaisResolve } from './shared/resolve/parametros-globais.resolve';
import { ModuloNivelHierarquicoComponent } from './cadastros/page/modulo-nivel-hierarquico/modulo-nivel-hierarquico.component';
import { ModuloParticipanteIndiretoComponent } from './cadastros/page/modulo-participante-indireto/modulo-participante-indireto.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthenticationGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.AppDashboardModule)
      },
      {
        path: 'boletagem',
        loadChildren: () => import('./boletagem-consulta/boletagem-consulta.module').then(m => m.BoletagemConsultaModule)
      },
      {
        path: 'alertas',
        loadChildren: () => import('./alerta/alerta.module').then(m => m.AlertaModule)
      },
      {
        path: 'consulta-log-ocorrencia',
        loadChildren: () => import('./consulta-log-ocorrencia/consulta-log-ocorrencia.module').then(m => m.ConsultaLogOcorrenciaModule)
      },
      {
        path: 'conciliacao-mensagens-tarifadas',
        loadChildren: () => import('./conciliacao-mensagem/conciliacao-mensagens.module').then(m => m.ConciliacaoMensagensModule)
      },
      {
        path: 'consulta-detalhada',
        loadChildren: () => import('./consulta-detalhada/consulta-detalhada.module').then(m => m.ConsultaDetalhadaModule)
      },
      {
        path: 'transacao',
        loadChildren: () => import('./transacao/transacao.module').then(m => m.TransacaoModule)
      },
      {
        path: 'reprocessamento-mensagem',
        loadChildren: () => import('./reprocessamento-mensagem/reprocessamento-mensagem.module').then(m => m.ReprocessamentoMensagemModule)
      },
      {
        path: 'monitor-repositorio',
        loadChildren: () => import('./monitor-repositorio/monitor-repositorio.module').then(m => m.MonitorRepositorioModule)
      },
      {
        path: 'consulta-mensagem',
        loadChildren: () => import('./consulta-mensagem/consulta-mensagem.module').then(m => m.ConsultaMensagemModule)
      },
      {
        path: 'pix-recebido-nao-creditado',
        loadChildren: () => import('./pix-recebido-nao-creditado/pix-recebido-nao-creditado.module').then(m => m.PixRecebidoNaoCreditadoModule)
      },      
      {
        path: 'reprocessamento-mensagem-webhook',
        loadChildren: () => import('./pix-recebido-nao-creditado/pix-recebido-nao-creditado.module').then(m => m.PixRecebidoNaoCreditadoModule)
      },
      {
        path: 'consulta-cobranca',
        loadChildren: () => import('./cob/consulta-cobranca.module').then(m => m.ConsultaCobrancaModule)
      },
      {
        path: 'configuracao',
        loadChildren: () => import('./configuracao/configuracao.module').then(m => m.ConfiguracaoModule)
      },
      {
        path: 'acompanhamento-reserva',
        loadChildren: () => import('./acompanhamento-reserva/acompanhamento-reserva.module').then(m => m.AcompanhamentoReservaModule)
      },
      {
        path: 'certificado-digital',
        loadChildren: () => import('./certificado-digital/certificado-digital.module').then(m => m.CertificadoDigitalModule)
      },
      {
        path: 'dict',
        loadChildren: () => import('./dict/dict.module').then(m => m.DictModule)
      },
      {
        path: 'apuracao-dados-informes-bacen',
        loadChildren: () => import('./apuracao-dados-informes-bacen/apuracao-dados-informes-bacen.module')
        .then(m => m.ApuracaoDadosInformesBacenModule)
      },
      {
        path: 'seguranca',
        loadChildren: () => import('./seg/seguranca.module')
        .then(m => m.SegurancaModule)
      },
      {
        path: 'conciliacao-contabil',
        loadChildren: () => import('./conciliacao-contabil/conciliacao-contabil.module').then(m => m.ConciliacaoContabilModule)
      },
      {
        path: 'tempos-ans',
        loadChildren: () => import('./tempos-ans/tempos-ans.module').then(m => m.TemposAnsModule)
      },
      {
        path: 'cadastros',
        loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)
      },
      {
        path: 'nivel-hierarquico',
        component: ModuloNivelHierarquicoComponent,
        loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)
      },
      {
        path: 'cadastros/composicao-grupo-usuarios',
        component: ModuloNivelHierarquicoComponent,
        loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)
      },
      {
        path: 'participante-indireto',
        component: ModuloParticipanteIndiretoComponent,
        loadChildren: () => import('./cadastros/cadastros.module').then(m => m.CadastrosModule)
      },
      {
        path: 'api-pix',
        loadChildren: () => import('./api-pix/api-pix.module').then(m => m.ApiPixModule)
      },
      {
        path: 'consulta-transacoes',
        loadChildren: () => import('./consulta-transacoes/consulta-transacoes.module').then(m => m.TransacoesConsultaModule)
      },
      {
        path: 'marcacao-fraude',
        loadChildren: () => import('./marcacao-fraude/marcacao-fraude.module').then(m => m.MarcacaoFraudeModule)
      }
    ],
    resolve: {
      parametrosIniciaisSistema: ParametrosGlobaisResolve
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ParametrosGlobaisResolve
  ]
})
export class AppRoutingModule { }

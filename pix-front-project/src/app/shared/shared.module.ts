import { HistoricoPesquisaComposicaoComponent } from './../boleto/component/edicao/historico-pesquisa-composicao/historico-pesquisa-composicao.component';
import { DashboardModule } from '@albert/dashboard';
import { LayoutModule } from '@albert/layout';
import { UiModule } from '@albert/ui';
import { UIMDashboardProviderModule, UIMNavigationProviderModule } from '@albert/ui-manager-provider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng';
import { AlertaListaComponent } from './component/alerta-lista/alerta-lista.component';
import { DebitoCreditoDropdownComponent } from './component/debito-credito-dropdown/debito-credito-dropdown';
import { DrawerContentComponent } from './component/drawer-content/drawer-content.component';
import { EstadoTransacaoDropdownComponent } from './component/estado-transacao-dropdown/estado-transacao-dropdown';
import { GenericDropdownComponent } from './component/generic-dropdown/generic-dropdown.component';
import { MensagemDropdownComponent } from './component/mensagem-dropdown/mensagem-dropdown.component';
import { OperacaoBancariaDropdownComponent } from './component/operacao-bancaria-dropdown/operacao-bancaria-dropdown.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { SistemaDropdownComponent } from './component/sistema-dropdown/sistema-dropdown.component';
import { SituacaoMensagemDropdownComponent } from './component/situacao-mensagem-dropdown/situacao-mensagem-dropdown.component';
import { TipoEntradaMensagemDropdownComponent } from './component/tipo-entrada-mensagem-dropdown/tipo-entrada-mensagem-dropdown.component';
import { VerificarMensagemDialogComponent } from './component/verificar-mensagem-dialog/verificar-mensagem-dialog.component';
import { XmlPrettyDisplayComponent } from './component/xml-pretty-display/xml-pretty-display.component';
import { SinqiaDataSourceDirective } from './directive/sinqia-data-source.directive';
import { DateTimePipe } from './pipe/date-time.pipe';
import { DebidoCreditoPipe } from './pipe/debido-credito.pipe';
import { TranslatAliasPipe } from './pipe/translate.pipe';
import { ValorFinanceiroPipe } from './pipe/valor-financeiro.pipe';
import { ChipComponent } from './component/chip/chip.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MonacoEditorModule } from 'ngx-monaco-editor';
import { ComposicaoOperacaoDropdownComponent } from './component/composicao-operacao-dropdown/composicao-operacao-dropdown';
import { NullablePipe } from './pipe/nullable.pipe';
import { BooleanPipe } from './pipe/boolean.pipe';
import { CpfCnpjInputComponent } from './component/cpf-cnpj-input/cpf-cnpj-input.component';
import { CpfCnpjPipe } from './pipe/cpf-cnpj.pipe';
import { DebounceClickDirective } from './directive/debounce-click.directive';
import { SistemaComposicaoDropdownComponent } from './component/sistema-composicao-dropdown/sistema-composicao-dropdown.component';
// tslint:disable-next-line: max-line-length
import { FinalidadeCertificadoDropdownComponent } from './component/finalidade-certificado-dropdown/finalidade-certificado-dropdown.component';
import { SituacaoCertificadoDropdownComponent } from './component/situacao-certificado-dropdown/situacao-certificado-dropdown.component';
import { OcorrenciaDropdownComponent } from './component/ocorrencia-dropdown/ocorrencia-dropdown.component';
import { EntidadeDropdownComponent } from './component/entidade-dropdown/entidade-dropdown.component';
import { ChaveDropdownComponent } from './component/chave-dropdown/chave-dropdown.component';
import { DonoDropdownComponent } from './component/dono-dropdown/dono-dropdown.component';
import { SituacaoChaveDropdownComponent } from './component/situacao-chave-dropdown/situacao-chave-dropdown.component';
import { ContaDropdownComponent } from './component/conta-dropdown/conta-dropdown.component';
import { ProdutoDropdownComponent } from './component/produto-dropdown/produto-dropdown.component';
import { SistemaOriginalDropdownComponent } from './component/sistema-original-dropdown/sistema-original-dropdown.component';
import { EntidadeConveniadaDropdownComponent } from './component/entidade-conveniada-dropdown/entidade-conveniada-dropdown.component';
import { IndicadorDropdownComponent } from './component/indicador-dropdown/indicador-dropdown.component';
import { MesesDoAnoPipe } from './pipe/meses-do-ano.pipe';
import { SomenteTempoPipe } from './pipe/somente-tempo.pipe';
import { TrackDirective} from './directive/user-tracker.directive';
import { DonoChaveDictPipe } from './pipe/dono-chave-dict.pipe';
import { MaskCpfCnpjPipe } from './pipe/mask-cpf-cnpj.pipe';
import { CertificadoraDigitalDropdownComponent } from './component/certificadora-digital-dropdown/certificadora-digital-dropdown.component';
import { CategoriaBaldeFichaDictDropdownComponent } from './component/categoria-balde-ficha-dict-dropdown/categoria-balde-ficha-dict-dropdown.component';
import { tipoNotificacaoWebhookPipe } from './pipe/tipo-notificacao-webhook';
import { SituacaoReprocessamentoPipe } from './pipe/situacao-reprocessamento';
import { CanalMensagemPipe } from './pipe/canal-mensagem.pipe';
import { CanalMensagemDropdownComponent } from './component/canal-mensagem-dropdown/canal-mensagem-dropdown.component';

@NgModule({
  imports: [
    LayoutModule,
    CommonModule,
    UiModule,
    TableModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardModule,
    UIMDashboardProviderModule,
    DragDropModule,
    MonacoEditorModule.forRoot()
  ],
  exports: [
    LayoutModule,
    CommonModule,
    UiModule,
    TranslatAliasPipe,
    TableModule,
    SinqiaDataSourceDirective,
    DateTimePipe,
    ValorFinanceiroPipe,
    DebidoCreditoPipe,
    SituacaoReprocessamentoPipe,
    tipoNotificacaoWebhookPipe,
    MensagemDropdownComponent,
    GenericDropdownComponent,
    NgSelectModule,
    XmlPrettyDisplayComponent,
    SidenavComponent,
    DebitoCreditoDropdownComponent,
    TipoEntradaMensagemDropdownComponent,
    SistemaDropdownComponent,
    SistemaComposicaoDropdownComponent,
    OperacaoBancariaDropdownComponent,
    SituacaoMensagemDropdownComponent,
    EstadoTransacaoDropdownComponent,
    DashboardModule,
    UIMDashboardProviderModule,
    UIMNavigationProviderModule,
    VerificarMensagemDialogComponent,
    AlertaListaComponent,
    DrawerContentComponent,
    ChipComponent,
    DragDropModule,
    ComposicaoOperacaoDropdownComponent,
    NullablePipe,
    BooleanPipe,
    CpfCnpjInputComponent,
    CpfCnpjPipe,
    DebounceClickDirective,
    FinalidadeCertificadoDropdownComponent,
    SituacaoCertificadoDropdownComponent,
    OcorrenciaDropdownComponent,
    EntidadeDropdownComponent,
    ChaveDropdownComponent,
    DonoDropdownComponent,
    SituacaoChaveDropdownComponent,
    ContaDropdownComponent,
    ProdutoDropdownComponent,
    SistemaOriginalDropdownComponent,
    EntidadeConveniadaDropdownComponent,
    IndicadorDropdownComponent,
    MesesDoAnoPipe,
    SomenteTempoPipe,
    HistoricoPesquisaComposicaoComponent,
    TrackDirective,
    DonoChaveDictPipe,
    MaskCpfCnpjPipe,
    CertificadoraDigitalDropdownComponent,
    CategoriaBaldeFichaDictDropdownComponent,
    CanalMensagemPipe,
    CanalMensagemDropdownComponent
  ],
  declarations: [
    TranslatAliasPipe,
    DateTimePipe,
    ValorFinanceiroPipe,
    SinqiaDataSourceDirective,
    DebidoCreditoPipe,
    SituacaoReprocessamentoPipe,
    tipoNotificacaoWebhookPipe,
    MensagemDropdownComponent,
    GenericDropdownComponent,
    XmlPrettyDisplayComponent,
    SidenavComponent,
    DebitoCreditoDropdownComponent,
    TipoEntradaMensagemDropdownComponent,
    SistemaDropdownComponent,
    SistemaComposicaoDropdownComponent,
    OperacaoBancariaDropdownComponent,
    SituacaoMensagemDropdownComponent,
    EstadoTransacaoDropdownComponent,
    VerificarMensagemDialogComponent,
    AlertaListaComponent,
    DrawerContentComponent,
    ChipComponent,
    ComposicaoOperacaoDropdownComponent,
    NullablePipe,
    BooleanPipe,
    CpfCnpjInputComponent,
    CpfCnpjPipe,
    DebounceClickDirective,
    FinalidadeCertificadoDropdownComponent,
    SituacaoCertificadoDropdownComponent,
    OcorrenciaDropdownComponent,
    EntidadeDropdownComponent,
    ChaveDropdownComponent,
    DonoDropdownComponent,
    SituacaoChaveDropdownComponent,
    ContaDropdownComponent,
    ProdutoDropdownComponent,
    SistemaOriginalDropdownComponent,
    EntidadeConveniadaDropdownComponent,
    IndicadorDropdownComponent,
    MesesDoAnoPipe,
    SomenteTempoPipe,
    HistoricoPesquisaComposicaoComponent,
    TrackDirective,
    DonoChaveDictPipe,
    MaskCpfCnpjPipe,
    CertificadoraDigitalDropdownComponent,
    CategoriaBaldeFichaDictDropdownComponent,
    CanalMensagemPipe,
    CanalMensagemDropdownComponent
  ],
  providers: [
    ValorFinanceiroPipe,
    MesesDoAnoPipe,
    SomenteTempoPipe,
    CanalMensagemPipe
  ]
})
export class SharedModule {
}

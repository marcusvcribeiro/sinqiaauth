import { DrawerService } from '@albert/ui';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, zip } from 'rxjs';
import { BoletagemConsultaService } from 'src/app/boletagem-consulta/service/boletagem.service';
import { BoletoHelper } from 'src/app/boleto/helper/boleto-helper';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { BoletagemConsulta } from 'src/app/shared/model/boletagem-consulta';
import { ComposicaoOperacao } from 'src/app/shared/model/composicao-operacao';
import { BoletoTipoCampo } from 'src/app/shared/model/enum/boleto-tipo-campo';
import { Operacao } from 'src/app/shared/model/enum/operacao';
import { SituacaoBoleto } from 'src/app/shared/model/enum/situacao-boleto';
import { SidenavItem } from '../../../../shared/component/sidenav/sidenav.component';
import { BoletoGrupo, BoletoPayload, BoletoTag, BoletoConsulta, AtributoTag } from '../../../../shared/model/boleto';
import { ParametrosGlobaisService } from '../../../../shared/service/parametros-globais.service';
import { PixMessageService } from '../../../../shared/service/pix-message-service';
import { DateHelper } from '../../../../shared/helper/date-helper';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.component.html',
  styleUrls: ['./boleto.component.scss']
})
export class BoletoComponent implements OnInit {

  @Input() transacao: BoletagemConsulta;
  @Input() composicaoOperacao: ComposicaoOperacao;
  @Input() operacao: Operacao;

  dataReferencia: Date;
  form: FormGroup;
  boleto: BoletoGrupo;

  hasSideNav = false;
  idBoletoSelecionado: string;
  sidenavItems: SidenavItem[] = [];
  valorUltOrdem: number;

  listaSituacaoBoleto = [
    { id: SituacaoBoleto.PRE_BOLETO, descricao: `Pré-Boleto` },
    { id: SituacaoBoleto.BLOQUEADA, descricao: `Bloqueada` },
    { id: SituacaoBoleto.LIBERADA, descricao: `Liberada` },
    { id: SituacaoBoleto.MODELO, descricao: `Modelo` }
  ];

  listaOrdenacao = [];
  listaOrdenacaoBackup = [];

  mostrarNomeModelo = false;
  clicked=false;

  constructor(
    private formBuilder: FormBuilder,
    private boletoService: BoletagemConsultaService,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService
  ) { }

  ngOnInit() {
    this.construirBoleto();
  }

  criarForm() {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.form = this.formBuilder.group({
      nomeModelo: [],
      situacao: [null, Validators.required],
      dataMovimento: null
    });
    this.criarFormSubscription();
  }

  get ctrl() {
    return this.form.controls;
  }

  translateQuantidadeChars(value) {
    return { quantidadeChars: value };
  }


  construirBoleto() {
    if (this.operacao) {
      zip(
        this.boletoService.listarBoletoCampos(new BoletoConsulta(this.transacao, false)),
        this.boletoService.listarValoresBoleto(this.transacao.dataReferencia, this.transacao.numeroSequenciaTransacao)
      ).subscribe((values: any) => {
        const estrutura: BoletoGrupo = values[0]; // nova
        const dados: BoletoGrupo = values[1]; // antiga

        this.boleto = BoletoHelper.criarEditar(estrutura, dados);
        this.criarForm();
        this.criarOrdenacao();
      });
    } else {
      this.boletoService.listarBoletoCampos(new BoletoConsulta(this.composicaoOperacao, false))
        .subscribe(v => {
          this.boleto = v;
          this.criarForm();
          this.criarOrdenacao();
        });
    }
  }

  onSalvarClick() {
    this.clicked = true;
    if (this.listaOrdenacao.length != this.listaOrdenacaoBackup.length) {
      this.listaOrdenacao = Object.assign([], this.listaOrdenacaoBackup);
    }

    if (this.operacao && this.operacao === Operacao.ATUALIZAR) {
      this.atualizarBoleto();
    } else {
      this.salvarBoleto();
    }
  }

  salvarBoleto() {
    const boletoPayload = this.criarBoletoPayload();
    this.boletoService.salvarMensagem(boletoPayload).subscribe(data => {
      this.pixMessageService.toastSuccess('mensagem.salvarSucesso');
      this.drawerService.close();
    });
  }

  atualizarBoleto() {
    const boletoPayload = this.criarBoletoPayload();
    boletoPayload.dataReferencia = this.transacao.dataReferencia;
    boletoPayload.numeroSequenciaTransacao = this.transacao.numeroSequenciaTransacao;
    this.boletoService.atualizarMensagem(boletoPayload).subscribe(data => {
      this.pixMessageService.toastSuccess('mensagem.atualizarSucesso');
      this.drawerService.close();
    });
  }

  isDateType(tipoCampo: BoletoTipoCampo) {
    return tipoCampo !== BoletoTipoCampo.DATE && tipoCampo !== BoletoTipoCampo.DATETIME && tipoCampo !== BoletoTipoCampo.TIME;
  }

  onNavigate(item: SidenavItem) {
    this.idBoletoSelecionado = item.id;
    const element = document.getElementById(this.idBoletoSelecionado);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

  private criarFormSubscription() {
    this.ctrl.situacao.valueChanges.subscribe(v => {
      this.clicked = false;
      if (v === SituacaoBoleto.MODELO) {
        this.mostrarNomeModelo = true;
      } else {
        this.ctrl.nomeModelo.reset();
        this.mostrarNomeModelo = false;
      }
    });
  }

  private criarBoletoPayload(): BoletoPayload {
    const grupo = this.form.getRawValue();
    const grupoBoleto = this.criarBoletoGrupo(grupo);
    const boletoPayload = new BoletoPayload({});
    const {dataMovimento, nomeModelo, situacao} = this.form.getRawValue();

    boletoPayload.dataMovimento = dataMovimento;
    boletoPayload.nomeModeloMensagem = nomeModelo;
    // alterando id da transação para ser igual a pré boleto quando o que foi selecionado for modelo
    boletoPayload.idSituacaoTransacao = situacao === SituacaoBoleto.MODELO ? SituacaoBoleto.PRE_BOLETO : situacao;

    if (this.composicaoOperacao) {
      this.setCamposComposicaoBoletoPayload(boletoPayload);
    } else {
      this.setCamposTransacaoBoletoPayload(boletoPayload);
    }

    boletoPayload.estrutura = grupoBoleto;
    return boletoPayload;
  }

  private setCamposComposicaoBoletoPayload(boletoPayload: BoletoPayload) {
    boletoPayload.codigoSistema = this.composicaoOperacao.codigoSistemaParticipante;
    boletoPayload.codigoProduto = this.composicaoOperacao.produto;
    boletoPayload.idTipoMensagem = this.composicaoOperacao.idTipoMensagem;
    boletoPayload.codigoOperacaoBancaria = this.composicaoOperacao.codigoOperacaoBancariaParticipante;
    boletoPayload.idLiquidacao = this.composicaoOperacao.liquidacao;
    boletoPayload.codigoMensagem = this.composicaoOperacao.idMensagem;
    boletoPayload.idComprovanteOperacao = this.composicaoOperacao.numeroOperacao;
  }

  private setCamposTransacaoBoletoPayload(boletoPayload: BoletoPayload) {
    boletoPayload.codigoSistema = this.transacao.codigoSistemaParticipante;
    boletoPayload.codigoProduto = this.transacao.produto;
    boletoPayload.idTipoMensagem = this.transacao.idTipoMensagem;
    boletoPayload.codigoOperacaoBancaria = this.transacao.codigoOperacaoBancariaParticipante;
    boletoPayload.idLiquidacao = this.transacao.liquidacao;
    boletoPayload.codigoMensagem = this.transacao.codigoMensagem;
    boletoPayload.idComprovanteOperacao = Number(this.transacao.numeroOperacao);
  }

  // tipo any porque é o rawValue do form
  private criarBoletoGrupo(grupo: any): BoletoGrupo {
    const grupoGrupos = grupo['grupos'];
    const grupoTags = grupo['tags'];

    return new BoletoGrupo({ tags: this.obterTags(grupoTags), grupos: this.obterGrupos(grupoGrupos) });
  }

  private obterTags(tags, tagPai: string = null): BoletoTag[] {
    if (!tags) {
      return null;
    }

    const boletoTags: BoletoTag[] = [];
    for (const tag in tags) {
      if (tags[tag]) {
        const boletoTag = this.obterValorTag(tag, tags[tag])

        if (tagPai) {
          boletoTag.tagPai = tagPai;
        }
        boletoTag.atributoTags = this.obterAtributoTag(tag);
        boletoTag.ordemCampo = this.obterOrdenacao(tag, tagPai);
        boletoTags.push(boletoTag);
      }
    }
    return boletoTags;
  }

  private obterValorTag(id: string, valorTag: string) {
    if (DateHelper.canBeParsedToDateTime(valorTag)) {
      valorTag = DateFormatHelper.toDateTimeWithTimezone(valorTag);
    }

    return new BoletoTag({ id, valorTag });
  }

  private obterGrupos(grupos): BoletoGrupo[] {
    if (!grupos) {
      return null;
    }
    const boletoGrupos: BoletoGrupo[] = [];
    for (const grupoId in grupos) {
      const grupo = grupos[grupoId];
      if (grupo) {
        if (grupo && Array.isArray(grupo) && grupo.length) {
          for (const grupoRepeticao of grupo) {
            var ordemRet = this.obterOrdenacao(grupoId);
            ordemRet = ordemRet > 0 ? ordemRet : boletoGrupos.length > 0 ? boletoGrupos.reverse().find(x => x.id === grupoId.substr(0, grupoId.indexOf('_duplic'))).ordem : this.valorUltOrdem++;
            this.valorUltOrdem = ordemRet;
            boletoGrupos.push(
              new BoletoGrupo({
                id: grupoId.includes('_duplic') ? grupoId.substr(0, grupoId.indexOf('_duplic')) : grupoId,
                ordem: ordemRet,
                grupos: this.obterGrupos(grupoRepeticao.grupos),
                tags: this.obterTags(grupoRepeticao.tags, (grupoId.includes('_duplic') ? grupoId.substr(0, grupoId.indexOf('_duplic')) : grupoId))
              })
            );
          }
        } else {
          var ordemRet = this.obterOrdenacao(grupoId);
          ordemRet = ordemRet > 0 ? ordemRet : boletoGrupos.length > 0 ? boletoGrupos.reverse().find(x => x.id === grupoId.substr(0, grupoId.indexOf('_duplic'))).ordem : this.valorUltOrdem++;
          this.valorUltOrdem = ordemRet;
          boletoGrupos.push(
            new BoletoGrupo({
              id: grupoId.includes('_duplic') ? grupoId.substr(0, grupoId.indexOf('_duplic')) : grupoId,
              ordem: ordemRet,
              grupos: this.obterGrupos(grupo.grupos),
              tags: this.obterTags(grupo.tags, (grupoId.includes('_duplic') ? grupoId.substr(0, grupoId.indexOf('_duplic')) : grupoId))
            })
          );
        }
      }
    }
    return boletoGrupos;
  }

  private obterOrdenacao(valuId: string, valueTagPai?: string): number {
    const valueId = valuId.includes('_duplic') ? valuId.substr(0, valuId.indexOf('_duplic')) : valuId;
    const valor = valueTagPai ? this.listaOrdenacao.find(x => x.id === valueId && x.tag_pai === valueTagPai) : this.listaOrdenacao.find(x => x.id === valueId && x.tag_pai === '');
    if(!valor){
      if(!valueTagPai){
        const backOrdem = this.listaOrdenacaoBackup.find(x => x.id === valueId);
        return backOrdem ? backOrdem.ordem : 0;             
      }else{
        const backOrdem = this.listaOrdenacaoBackup.find(x => x.id === valueId && x.tag_pai === valueTagPai); 
        return backOrdem ? backOrdem.ordem : 0;         
      }            
    }else{
      const valorPosicao = this.listaOrdenacao.indexOf(valor);
      this.listaOrdenacao.forEach(tag => {
        if(tag.id === valueId && !valor){
          return 0;
        }
        else if(valor){
          if(tag.id === valor.id && tag.ordem === valor.ordem){
            this.listaOrdenacao.splice(valorPosicao, 1);
          }
        }
      });
    }
    
    return valor ? valor.ordem : 0;
  }

  private obterAtributoTag(valuId: string): AtributoTag[]{
    const atributoTag: AtributoTag[] = [];
    const valueId = valuId.includes('_duplic') ? valuId.substr(0, valuId.indexOf('_duplic')) : valuId;
    this.listaOrdenacaoBackup.forEach(x => {
      if (x.id === valueId) {
        x.atributoTags.forEach(i => {
          atributoTag.push(i);
        });
      }
    });
    return atributoTag;
  }

  private criarOrdenacao() {
    this.obterOrdemTgas(this.boleto.tags);
    this.obterOrdemGrupo(this.boleto.grupos);
  }

  private obterOrdemGrupo(grupos: BoletoGrupo[]){
    grupos.forEach(x => {
      this.listaOrdenacao.push({id: x.id, tag_pai:'', ordem: x.ordem, atributoTags: []});
      this.listaOrdenacaoBackup.push({ id: x.id, tag_pai: '', ordem: x.ordem, atributoTags: [] });
      this.obterOrdemTgas(x.tags);
      this.obterOrdemGrupo(x.grupos);
    });
  }

   private obterOrdemTgas(tags: BoletoTag[]){
    tags.forEach(x => {
      const atributoTag: AtributoTag[] = [];
      x.atributoTags.forEach(i => {
        atributoTag.push({nome: i.nome, valor: i.valor});
      })
      this.listaOrdenacao.push({id: x.id, tag_pai: x.tagPai, ordem: x.ordemCampo, atributoTags: atributoTag});
      this.listaOrdenacaoBackup.push({ id: x.id, tag_pai: x.tagPai, ordem: x.ordemCampo, atributoTags: atributoTag });
    })
  }
}

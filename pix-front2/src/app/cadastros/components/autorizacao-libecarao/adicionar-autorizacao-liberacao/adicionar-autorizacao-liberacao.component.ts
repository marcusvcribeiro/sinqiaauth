import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { DrawerService } from '@albert/ui';
import { NivelHierarquico } from 'src/app/cadastros/model/nivelHierarquico';
import { AutorizacaoLiberacao } from './../../../model/autorizacaoLiberacao';
import { AutorizacaoLiberacaoService } from './../../../service/autorizacao-liberacao.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Seg from 'src/app/cadastros/model/seg';
import { NivelHierarquicoService } from 'src/app/cadastros/service/nivel-hierarquico.service';
import { ComposicaoOperacao } from 'src/app/cadastros/model/composicaoOperacao';

@Component({
  selector: 'app-adicionar-autorizacao-liberacao',
  templateUrl: './adicionar-autorizacao-liberacao.component.html',
  styleUrls: ['./adicionar-autorizacao-liberacao.component.scss']
})
export class AdicionarAutorizacaoLiberacaoComponent implements OnInit {
  formData: FormGroup;

  seg: Seg = new Seg();

  listaNivelHierarquico: NivelHierarquico[];

  @Input() composicao: ComposicaoOperacao;
  @Output() event = new EventEmitter();

  constructor(
    private formBuild: FormBuilder,
    private nivelHierarquicoService: NivelHierarquicoService,
    private autorizacaoLiberacaoService: AutorizacaoLiberacaoService,
    private drawerService: DrawerService,
    private pixMessageService: PixMessageService
  ) { }

  ngOnInit(): void {
    this.listarNiveisHierarquicos();
    this.instanciarFormulario();
  }

  private listarNiveisHierarquicos(){
    this.nivelHierarquicoService.listarNivelHierarquico().subscribe(niveis => this.listaNivelHierarquico = niveis);
  }

  private instanciarFormulario() {
    this.formData = this.formBuild.group({
      valor: [],
      autorizacoes: [],
      nivelHierarquico: [],
    });
  }

  get controls() {
    return this.formData.controls;
  }

  onAdicionar(){
    let autorizacaoLiberacao: AutorizacaoLiberacao = this.generateAutorizacaoLiberacaoObject();

    this.autorizacaoLiberacaoService.adicionarAutorizacaoLiberacao(autorizacaoLiberacao).subscribe(() => {
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit()
    })
  }

  generateAutorizacaoLiberacaoObject(){
    let autorizacao = new AutorizacaoLiberacao();
    autorizacao.codEmpPar = this.composicao.codEmpPar;
    autorizacao.codSisPar = this.composicao.codigoSistemaParticipante;
    autorizacao.codPrdPar = this.composicao.produto;
    autorizacao.codOpeBanPar = this.composicao.codigoOperacaoBancariaParticipante;
    autorizacao.idLiqPar = this.composicao.liquidacao;
    autorizacao.numComOpe = this.composicao.numeroOperacao;
    autorizacao.vrLimAut = this.controls.valor.value;
    autorizacao.qtdAut = this.controls.autorizacoes.value;
    autorizacao.codNivHie = this.controls.nivelHierarquico.value;
    autorizacao.codUsuUltMnt = 0;
    autorizacao.datUltMnt = null;

    return autorizacao;
  }
}

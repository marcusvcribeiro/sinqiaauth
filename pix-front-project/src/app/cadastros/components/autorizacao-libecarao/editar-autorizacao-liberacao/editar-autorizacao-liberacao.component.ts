import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { NivelHierarquicoService } from 'src/app/cadastros/service/nivel-hierarquico.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutorizacaoLiberacaoService } from './../../../service/autorizacao-liberacao.service';
import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { AutorizacaoLiberacao } from 'src/app/cadastros/model/autorizacaoLiberacao';
import { NivelHierarquico } from 'src/app/cadastros/model/nivelHierarquico';
import { ComposicaoOperacao } from 'src/app/cadastros/model/composicaoOperacao';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-editar-autorizacao-liberacao',
  templateUrl: './editar-autorizacao-liberacao.component.html',
  styleUrls: ['./editar-autorizacao-liberacao.component.scss']
})
export class EditarAutorizacaoLiberacaoComponent implements OnInit {
  formData: FormGroup;

  listaNivelHierarquico: NivelHierarquico[];

  @Input() edit?: AutorizacaoLiberacao;
  @Input() event = new EventEmitter();

  seg: Seg = new Seg();

  constructor(
    private formBuild: FormBuilder,
    private autorizacaoLiberacaoService: AutorizacaoLiberacaoService,
    private nivelHierarquicoService: NivelHierarquicoService,
    private drawerService: DrawerService,
    private pixMessageService: PixMessageService
  ) { }

  ngOnInit(): void {
    this.instanciarFormulario();
    this.listarNiveisHierarquicos();
  }

  get controls() {
    return this.formData.controls;
  }

  private instanciarFormulario() {
    this.formData = this.formBuild.group({
      valor: [this.edit?.vrLimAut ? this.edit?.vrLimAut : '', Validators.required],
      autorizacoes: [this.edit?.qtdAut ? this.edit?.qtdAut : '', Validators.required],
      nivelHierarquico: [this.edit?.codNivHie ? this.edit?.codNivHie : '', Validators.required],
    });
  }

  private listarNiveisHierarquicos(){
    this.nivelHierarquicoService.listarNivelHierarquico().subscribe(niveis => this.listaNivelHierarquico = niveis);
  }

  onEditar(){
    let queryP: ComposicaoOperacao = this.generateQueryParamsObject();
    let autorizacaoLiberacao: AutorizacaoLiberacao = this.generateAutorizacaoObj();

    this.autorizacaoLiberacaoService.atualizarAutorizacaoLiberacao(queryP, autorizacaoLiberacao).subscribe(() => {
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    })
  }

  generateAutorizacaoObj(){
    let autorizacao = new AutorizacaoLiberacao();
    autorizacao.codNivHie = this.controls.nivelHierarquico.value;
    autorizacao.vrLimAut = this.controls.valor.value;
    autorizacao.qtdAut = this.controls.autorizacoes.value;
    autorizacao.codUsuUltMnt = 0;
    autorizacao.datUltMnt = new Date().toISOString();

    return autorizacao;
  }

  generateQueryParamsObject(){
    let composicao = new ComposicaoOperacao();

    composicao.codEmpPar = this.edit.codEmpPar;
    composicao.codigoSistemaParticipante = this.edit.codSisPar;
    composicao.produto = this.edit.codPrdPar;
    composicao.codigoOperacaoBancariaParticipante = this.edit.codOpeBanPar;
    composicao.liquidacao = this.edit.idLiqPar;
    composicao.numeroOperacao = this.edit.numComOpe;
    composicao.numSeqAutLibOpe = this.edit.numSeqAutLibOpe;

    return composicao;
  }
}

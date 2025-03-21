import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { DrawerService } from '@albert/ui';
import { AssociacaoAlcadaGrpUsuService } from './../../../service/associacao-alcada-grp-usu.service';
import { AssociacaoEnum } from 'src/app/cadastros/enum/associacaoEnum';
import { GrupoUsuario } from 'src/app/cadastros/model/grupoUsuario';
import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AssociacaoAlcadaGrupoUsuario } from 'src/app/cadastros/model/associacaoAlcadaGrpUsuario';
import { ComposicaoOperacao } from 'src/app/shared/model/composicao-operacao';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-associacao-cadastrar',
  templateUrl: './associacao-cadastrar.component.html',
  styleUrls: ['./associacao-cadastrar.component.scss']
})
export class AssociacaoCadastrarComponent implements OnInit {
  formData: FormGroup;
  gruposList: GrupoUsuario[];

  seg: Seg = new Seg();

  @Input() operacao: number;
  @Input() composicao: ComposicaoOperacao;
  @Input() edit?: AssociacaoAlcadaGrupoUsuario;
  @Output() event = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private alcadaService: AlcadaService,
    private associacaoAlcadaGrpUsuService: AssociacaoAlcadaGrpUsuService,
    private drawerService: DrawerService,
    private pixMessageService: PixMessageService) { }


  ngOnInit(): void {
    this.listarGrupos();
    this.instanciarForm();
  }

  get controls() {
    return this.formData.controls;
  }

  get isInsert() {
    return this.edit == undefined && this.edit == null;
  }

  private instanciarForm() {
    this.formData = this.formBuilder.group({
      grupo: ["", Validators.required],
      valor: ["", Validators.required]
    });
  }

  private listarGrupos(){
    this.alcadaService.getGrupos().subscribe(grupos => this.gruposList = grupos)
  }

  onSalvar(){
    let associacao = new AssociacaoAlcadaGrupoUsuario();
    associacao.idGrpUsu = this.controls.grupo.value;
    associacao.codEmpPar = this.composicao.codEmpPar;
    associacao.codSisPar = Number(this.composicao.codigoSistemaParticipante);
    associacao.codPrdPar = this.composicao.produto;
    associacao.codOpeBanPar = this.composicao.codigoOperacaoBancariaParticipante;
    associacao.idLiqPar = this.composicao.liquidacao;
    associacao.numComOpe = this.composicao.numeroOperacao;
    associacao.idAcaAlcOpe = this.operacao;
    associacao.vrLimOpe = this.controls.valor.value;

    this.associacaoAlcadaGrpUsuService.cadastrarAssociacao(associacao).subscribe(() =>{
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    })
  }
}

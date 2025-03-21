import { AssociacaoEditarComponent } from './../associacao-editar/associacao-editar.component';
import { DrawerService } from '@albert/ui';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { AssociacaoAlcadaGrpUsuService } from './../../../service/associacao-alcada-grp-usu.service';
import { ComposicaoOperacao } from 'src/app/shared/model/composicao-operacao';
import { Component, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssociacaoEnum } from 'src/app/cadastros/enum/associacaoEnum';
import { AssociacaoAlcadaGrupoUsuario } from 'src/app/cadastros/model/associacaoAlcadaGrpUsuario';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-associacao-liberacao',
  templateUrl: './associacao-liberacao.component.html',
  styleUrls: ['./associacao-liberacao.component.scss']
})
export class AssociacaoLiberacaoComponent implements OnInit, OnChanges {

  form: FormGroup;

  seg: Seg = new Seg();

  @Input() composicao: ComposicaoOperacao;
  @Input() eventUpdate: EventEmitter<any>;

  associacaoLista: AssociacaoAlcadaGrupoUsuario[] = []

  constructor(
    private formBuilder: FormBuilder,
    private associacaoAlcadaGrpUsuService: AssociacaoAlcadaGrpUsuService,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService) { }

  ngOnInit(): void {
    this.instanciarFormulario();

    this.listarAssociacoes();

    this.eventUpdate.subscribe(()=>{
      this.listarAssociacoes();
    });
  }

  ngOnChanges(){
    this.listarAssociacoes();
  }

  instanciarFormulario(){
    this.form = this.formBuilder.group({
      grupo: ['', Validators.required],
      valor: ['', Validators.required],
    })
  }

  private listarAssociacoes(){
    if(this.composicao){
      const searchParams = {
        cod_sis_par: Number(this.composicao.codigoSistemaParticipante),
        cod_prd_par: Number(this.composicao.produto),
        id_liq_par: Number(this.composicao.liquidacao),
        cod_ope_ban_par: Number(this.composicao.codigoOperacaoBancariaParticipante),
        num_com_ope: Number(this.composicao.numeroOperacao)
      }
      this.associacaoAlcadaGrpUsuService.listarAssociacao(searchParams).subscribe(associacao => {
        this.associacaoLista = associacao.filter(item => item.idAcaAlcOpe === AssociacaoEnum.LIBERACAO);
      });
    }
  }

  onDeletar(associacao: AssociacaoAlcadaGrupoUsuario){
    this.associacaoAlcadaGrpUsuService.deletarAssociacao(associacao).subscribe(() => {
      this.listarAssociacoes()
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
    });
  }

  onEditar(associacao: AssociacaoAlcadaGrupoUsuario){
    this.drawerService.create({
      component: AssociacaoEditarComponent,
      size: "small",
      componentProps: {
        edit: associacao,
        event: this.eventUpdate }
    })
  }
}

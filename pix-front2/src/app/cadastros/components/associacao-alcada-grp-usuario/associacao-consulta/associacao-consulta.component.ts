import { DrawerService } from '@albert/ui';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { AssociacaoAlcadaGrpUsuService } from './../../../service/associacao-alcada-grp-usu.service';
import { Component, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssociacaoAlcadaGrupoUsuario } from 'src/app/cadastros/model/associacaoAlcadaGrpUsuario';
import { AssociacaoEnum } from 'src/app/cadastros/enum/associacaoEnum';
import { AssociacaoEditarComponent } from '../associacao-editar/associacao-editar.component';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-associacao-consulta',
  templateUrl: './associacao-consulta.component.html',
  styleUrls: ['./associacao-consulta.component.scss']
})
export class AssociacaoConsultaComponent implements OnInit, OnChanges{
  form: FormGroup;

  seg: Seg = new Seg();

  @Input() composicao;
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
        this.associacaoLista = associacao.filter(item => item.idAcaAlcOpe === AssociacaoEnum.CONSULTA);
      });
    }
  }

  instanciarFormulario(){
    this.form = this.formBuilder.group({
      grupo: ['', Validators.required],
      valor: ['', Validators.required],
    })
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

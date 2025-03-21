import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { AutorizacaoLiberacaoService } from './../../../service/autorizacao-liberacao.service';
import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, OnChanges } from '@angular/core';
import { AutorizacaoLiberacao } from 'src/app/cadastros/model/autorizacaoLiberacao';
import { EditarAutorizacaoLiberacaoComponent } from '../editar-autorizacao-liberacao/editar-autorizacao-liberacao.component';
import { ComposicaoOperacao } from 'src/app/cadastros/model/composicaoOperacao';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-lista-autorizacao-liberacao',
  templateUrl: './lista-autorizacao-liberacao.component.html',
  styleUrls: ['./lista-autorizacao-liberacao.component.scss']
})
export class ListaAutorizacaoLiberacaoComponent implements OnInit, OnChanges{
  @Input() composicao;
  @Input() eventUpdate: EventEmitter<any>;

  seg: Seg = new Seg();

  autorizacaoLiberacaoLista: AutorizacaoLiberacao[] = [];

  constructor(
    private drawerService: DrawerService,
    private autorizacaoLiberacaoService: AutorizacaoLiberacaoService,
    private pixMessageService: PixMessageService
  ) { }

  ngOnInit(): void {
    this.eventUpdate.subscribe(()=>{
      this.listarAutorizacaoLiberacao();
    });
  }

  ngOnChanges(){
    this.listarAutorizacaoLiberacao();
  }

  private listarAutorizacaoLiberacao(){
    this.autorizacaoLiberacaoService.listarAutorizacaoLiberacao(this.gerarObjetoComposicaoOperacaoGET()).subscribe(value =>{
      this.autorizacaoLiberacaoLista = value;
    })
  }

  onEditar(item: AutorizacaoLiberacao){
    this.drawerService.create({
      component: EditarAutorizacaoLiberacaoComponent,
      size: "medium",
      title: 'Editar Autorização x Liberação',
      componentProps: {
        edit: item,
        event: this.eventUpdate
      }
    })
  }

  onDelete(autorizacaoLiberacao: AutorizacaoLiberacao){
    this.autorizacaoLiberacaoService.excluirAutorizacaoLiberacao(autorizacaoLiberacao).subscribe(() =>{
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.listarAutorizacaoLiberacao();
    })
  }

  private gerarObjetoComposicaoOperacaoGET(){
    let queryP = new ComposicaoOperacao();
    queryP.codEmpPar = this.composicao.codEmpPar;
    queryP.codigoSistemaParticipante = this.composicao.codigoSistemaParticipante;
    queryP.produto = this.composicao.produto;
    queryP.codigoOperacaoBancariaParticipante = this.composicao.codigoOperacaoBancariaParticipante;
    queryP.liquidacao = this.composicao.liquidacao;
    queryP.numeroOperacao = this.composicao.numeroOperacao;

    return queryP;
  }
}

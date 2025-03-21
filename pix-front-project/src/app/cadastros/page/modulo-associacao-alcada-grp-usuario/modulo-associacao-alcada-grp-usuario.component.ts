import { AssociacaoCadastrarComponent } from './../../components/associacao-alcada-grp-usuario/associacao-cadastrar/associacao-cadastrar.component';
import { AssociacaoEnum } from 'src/app/cadastros/enum/associacaoEnum';
import { TabsAssociacao } from './../../model/tabs-associacao';
import { TranslateService } from '@ngx-translate/core';
import { SelecaoComposicaoOperacaoComponent } from './../../components/associacao-alcada-grp-usuario/selecao-composicao-operacao/selecao-composicao-operacao.component';
import { DrawerService } from '@albert/ui';
import { HistoricoComposicao } from './../../../shared/model/historico-composicao';
import { ComposicaoOperacaoService } from './../../../shared/service/composicao-operacao.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ComposicaoOperacao } from 'src/app/shared/model/composicao-operacao';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import Seg from '../../model/seg';

@Component({
  selector: 'app-modulo-associacao-alcada-grp-usuario',
  templateUrl: './modulo-associacao-alcada-grp-usuario.component.html',
  styleUrls: ['./modulo-associacao-alcada-grp-usuario.component.scss']
})
export class ModuloAssociacaoAlcadaGrpUsuarioComponent implements OnInit {
  seg: Seg = new Seg();

  tab_inclusao: TabsAssociacao = TabsAssociacao.Inclusao;
  tab_liberacao: TabsAssociacao = TabsAssociacao.Liberacao;
  tab_consulta: TabsAssociacao = TabsAssociacao.Consulta;
  tab_selected: TabsAssociacao = TabsAssociacao.Inclusao;

  eventEmitterComposicao = new EventEmitter();
  eventEmitterComposicaoUpdate = new EventEmitter();

  composicao: ComposicaoOperacao;

  eventEmitterCadastro = new EventEmitter();
  eventEmitterCadastroUpdate = new EventEmitter();

  constructor(
    private drawerService: DrawerService,
    private translateService: TranslateService) { }

  ngOnInit(): void {
    this.eventEmitterCadastro.subscribe(() => this.eventEmitterCadastroUpdate.emit())
    this.eventEmitterComposicao.subscribe(composicao => this.composicao = composicao);
  }

  onTrocarTab(event){
    this.tab_selected = event;
  }

  onSelecaoComposicaoOperacao(){
    this.drawerService.create({
      component: SelecaoComposicaoOperacaoComponent,
      size: "medium",
      title: this.translateService.instant("titulo.selecaoComposicaoOperacao"),
      componentProps: { event: this.eventEmitterComposicao }
    });
  }

  onAdicionar(){
    this.drawerService.create({
      component: AssociacaoCadastrarComponent,
      size: "medium",
      title: 'Cadastrar',
      componentProps: {
        operacao: this.getOperacao(),
        composicao: this.composicao,
        event: this.eventEmitterCadastro
      }
    })
  }

  getOperacao(){
    if(this.tab_selected === 1){
      return AssociacaoEnum.INCLUSAO
    }
    if(this.tab_selected === 2){
      return AssociacaoEnum.LIBERACAO;
    }
    if(this.tab_selected === 3){
      return AssociacaoEnum.CONSULTA;
    }
  }
}

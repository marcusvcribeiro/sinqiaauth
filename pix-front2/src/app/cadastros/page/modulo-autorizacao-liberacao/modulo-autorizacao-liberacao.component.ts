import { AdicionarAutorizacaoLiberacaoComponent } from './../../components/autorizacao-libecarao/adicionar-autorizacao-liberacao/adicionar-autorizacao-liberacao.component';
import { TranslateService } from '@ngx-translate/core';
import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, OnInit } from '@angular/core';

import { SelecaoComposicaoAutorizacaoComponent } from '../../components/autorizacao-libecarao/selecao-composicao-autorizacao/selecao-composicao-autorizacao.component';
import Seg from '../../model/seg';
import { ComposicaoOperacao } from 'src/app/cadastros/model/composicaoOperacao';

@Component({
  selector: 'app-modulo-autorizacao-liberacao',
  templateUrl: './modulo-autorizacao-liberacao.component.html',
  styleUrls: ['./modulo-autorizacao-liberacao.component.scss']
})
export class ModuloAutorizacaoLiberacaoComponent implements OnInit {
  seg: Seg = new Seg();

  eventEmitterAutorizacao = new EventEmitter();
  eventEmitterAutorizacaoUpdate = new EventEmitter();

  eventEmitterComposicao = new EventEmitter();
  eventEmitterComposicaoUpdate = new EventEmitter();

  composicao?: ComposicaoOperacao;

  constructor(
    private drawerService: DrawerService,
    private translateService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.eventEmitterComposicao.subscribe(composicao => {
      this.composicao = composicao;
      this.eventEmitterComposicaoUpdate.emit(composicao)
    });
    this.eventEmitterAutorizacao.subscribe(() => this.eventEmitterAutorizacaoUpdate.emit());
  }

  onAdicionar(){
    this.drawerService.create({
      component: AdicionarAutorizacaoLiberacaoComponent,
      size: "medium",
      title: 'Cadastrar',
      componentProps: {
        composicao: this.composicao,
        event: this.eventEmitterAutorizacao
      }
    })
  }

  onSelecaoComposicaoAutorizacao(){
    this.drawerService.create({
      component: SelecaoComposicaoAutorizacaoComponent,
      size: "medium",
      title: this.translateService.instant("titulo.selecaoComposicaoAutorizacao"),
      componentProps: { event: this.eventEmitterComposicao }
    });
  }
}

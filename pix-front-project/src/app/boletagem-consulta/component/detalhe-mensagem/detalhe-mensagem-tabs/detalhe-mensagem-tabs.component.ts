import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { BottomSheetService } from '@albert/layout';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';

@Component({
  selector: 'app-detalhe-mensagem-tabs',
  templateUrl: './detalhe-mensagem-tabs.component.html',
  styleUrls: ['./detalhe-mensagem-tabs.component.scss'],
})

export class DetalheMensagemTabsComponent implements OnInit, OnChanges {
  @Input() filtro: TransacaoMensagensRelacionadasFiltro;

  constructor(
    private bottomSheetService: BottomSheetService
  ) { }

  ngOnInit() { }

  ngOnChanges() { }

  fecharBottomSheet() {
    this.bottomSheetService.close();
  }
}

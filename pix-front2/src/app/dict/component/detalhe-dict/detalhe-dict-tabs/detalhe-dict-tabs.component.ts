import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChaveDict } from '../../../model/chave-dict';
import { BottomSheetService } from '@albert/layout';

@Component({
  selector: 'app-detalhe-dict-tabs',
  templateUrl: './detalhe-dict-tabs.component.html',
  styleUrls: ['./detalhe-dict-tabs.component.scss'],
})
export class DetalheDictTabsComponent implements OnInit, OnChanges {
  @Input() filtro: ChaveDict;

  constructor(private bottomSheetService: BottomSheetService) { }

    ngOnInit() { }

    ngOnChanges() { }

    fecharBottomSheet() {
      this.bottomSheetService.close();
    }

}

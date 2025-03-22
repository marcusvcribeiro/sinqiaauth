import { Component, OnInit } from '@angular/core';

import { BottomSheetService } from '@albert/layout';

import { LayoutDocModule } from '../../layout.module';

@Component({
  selector: 'doc-bottom-sheet',
  templateUrl: './bottom-sheet.component.html'
})
export class BottomSheetDocComponent implements OnInit {

  constructor(private bottomSheetService: BottomSheetService) { }

  ngOnInit() {
  }

  openBottomSheet() {
    this.bottomSheetService.create({
      component: BottomSheetDocComponent,
      title: 'Titulo',
    });
  }

  closeBottomSheet() {
    this.bottomSheetService.close();
  }

}

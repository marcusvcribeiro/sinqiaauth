import { SegService } from './../../../seg/services/seg.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  constructor(private segService: SegService) { }

  ngOnInit() {
    this.segService.loadPermissions();
  }

}

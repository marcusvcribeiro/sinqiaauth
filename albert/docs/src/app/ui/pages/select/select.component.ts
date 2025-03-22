import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectDocComponent implements OnInit {

  list = [
    {
      label: 'Label 1',
      key: 'label1'
    },
    {
      label: 'Label 2',
      key: 'label2'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

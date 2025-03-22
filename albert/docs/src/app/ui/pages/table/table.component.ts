import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'doc-table',
  templateUrl: './table.component.html'
})
export class TableDocComponent implements OnInit {
  dataSource = [];
  data = [
    {
      id: 1,
      nome: 'Brasil',
      sigla: 'BRZ'
    },
    {
      id: 2,
      nome: 'Chile',
      sigla: 'CL'
    },
    {
      id: 3,
      nome: 'Bélgica',
      sigla: 'BE'
    }
  ];
  cols = [
    { field: 'nome', header: 'nome' },
    { field: 'sigla', header: 'sigla' },
  ];
  first = 1;
  rows = 2;
  totalRecords = 3;
  loading: boolean;

  constructor() { }

  ngOnInit(): void {}

  loadData(event: LazyLoadEvent) {
    this.loading = true;
    setTimeout(() => {
      if (this.data) {
        this.dataSource = this.data.slice(
          event.first,
          event.first + event.rows
        );
        this.loading = false;
      }
    }, 1000);
  }
}

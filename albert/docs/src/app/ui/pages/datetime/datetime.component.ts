import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-datetime',
  templateUrl: './datetime.component.html'
})
export class DatetimeDocComponent implements OnInit {

  date = new Date('1995-08-02');

  hour = 12;

  minute = 30;

  second = 50;

  constructor() { }

  ngOnInit() {
  }

}

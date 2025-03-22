import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-clock',
  templateUrl: './clock.component.html'
})
export class ClockDocComponent implements OnInit {

  date = new Date('1995-08-02 12:30:50');

  hour = 12;

  minute = 30;

  second = 50;

  constructor() { }

  ngOnInit() {
  }

}

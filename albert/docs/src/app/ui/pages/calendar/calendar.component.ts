import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'doc-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarDocComponent {
  date = new Date('1995-08-25');

  onDateChange($event) {
    console.log('A data clicada foi' , $event);

  }

  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/input-date');
  }
 }

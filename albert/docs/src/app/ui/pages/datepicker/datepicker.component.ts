import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'doc-datepicker',
  templateUrl: './datepicker.component.html'
})
export class DatepickerDocComponent implements OnInit {
  date = new Date('1995-08-25');

  datepickerDoc: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.datepickerDoc = this.fb.group({
      required: [ '', Validators.required ],
      errorInput: [ '', Validators.required ]
    });
  }

  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/input-date');
  }
 }

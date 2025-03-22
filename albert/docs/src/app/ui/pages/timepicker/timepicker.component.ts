import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'doc-timepicker',
  templateUrl: './timepicker.component.html'
})
export class TimepickerDocComponent implements OnInit {
  timepickerDoc: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.timepickerDoc = this.fb.group({
      errorInput: [ '', Validators.required ]
    });
  }
}

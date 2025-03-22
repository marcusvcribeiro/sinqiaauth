import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'doc-datetime-picker',
  templateUrl: './datetime-picker.component.html'
})
export class DatetimePickerDocComponent implements OnInit {
  datetimepickerDoc: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.datetimepickerDoc = this.fb.group({
      errorInput: [ '', Validators.required ]
    });
  }
}

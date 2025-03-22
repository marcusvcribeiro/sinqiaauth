import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'doc-number',
  templateUrl: './number.component.html',
  styleUrls: [ './number.component.scss' ]
})
export class NumberDocComponent implements OnInit {
  numberDoc: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.numberDoc = this.fb.group({
      required: [ '', Validators.required ]
    });
  }
}

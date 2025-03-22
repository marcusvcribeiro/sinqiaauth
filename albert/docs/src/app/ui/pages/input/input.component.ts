import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'doc-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputDocComponent implements OnInit {
  inputDoc: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.inputDoc = this.fb.group({
      required: [ '', Validators.required ],
      errorInput: [ '', Validators.required ]
    });
  }
  openDS() {
    window.open('https://dev.sinqia.io/albert/design-system/components/input');
  }
 }

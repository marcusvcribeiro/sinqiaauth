import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-verificar-mensagem-dialog',
  templateUrl: './verificar-mensagem-dialog.component.html',
  styleUrls: ['./verificar-mensagem-dialog.component.scss']
})
export class VerificarMensagemDialogComponent implements OnInit {
  formGroup: FormGroup;
  @Output() close = new EventEmitter;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      motivo: [null, Validators.required]
    });
  }

  onSave(): void {
    if (this.formGroup.valid) {
      this.close.emit(this.formGroup.value.motivo);
    }
  }

  onClose(): void {
    this.close.emit();
  }
}

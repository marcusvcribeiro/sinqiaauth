import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * @description
 * Componente de New-Dashboard.
 * É uma página que contem um formulário para preencher com o nome do Dashboard que se deseja criar.
 */
@Component({
  selector: 'alb-new-dashboard',
  templateUrl: './new-dashboard.component.html'
})
export class NewDashboardComponent implements OnInit {

  /**
   * @description
   * Evento que emite o nome do Dashboard que foi digitado.
   */
  @Output() dashboardName: EventEmitter<string> = new EventEmitter();

  /**
   * @description
   * Objeto de formulário usado na página.
   */
  form: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  // override
  ngOnInit(): void {
    this.createForm();
  }

  /**
   * @description
   * Método que cria o formulário.
   */
  createForm() {
    this.form = this.fb.group({
      dashboardName: [null, Validators.required]
    });
  }

  /**
   * @description
   * Objeto para emitir nome do Dashboard digitado no formulário.
   */
  submitDashboardName() {
    const { dashboardName } = this.form.getRawValue();
    this.dashboardName.emit(dashboardName);
  }

}

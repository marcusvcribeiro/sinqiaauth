import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable, Subscription } from 'rxjs';
import { TipoPrioridadeBoleta } from 'src/app/shared/model/enum/tipo-prioridade-boleta';
import { DominioPrioridade } from 'src/app/shared/model/dominio-prioridade';
import { BoletagemConsultaService } from '../../service/boletagem.service';

@Component({
  selector: 'app-definir-prioridade',
  templateUrl: './definir-prioridade.component.html',
  styleUrls: ['./definir-prioridade.component.scss']
})
export class DefinirPrioridadeComponent implements OnInit {

  formGroup: FormGroup;
  subscription: Subscription;

  tipoPrioridadeBoleta = TipoPrioridadeBoleta;

  prioridades$: Observable<DominioPrioridade[]>;

  close = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private boletagemService: BoletagemConsultaService
  ) {

    this.formGroup = this.formBuilder.group({
      motivo: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.prioridades$ = this.boletagemService.listarPrioridade();
  }

  onCancelar() {
    this.close.emit();
  }

  definirPrioridade(idPrioridade: number) {
    this.close.emit(idPrioridade);
  }
}

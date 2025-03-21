import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PixNaoCreditadoCCO } from 'src/app/shared/model/pix-nao-creditado-cco';
import { PixNaoCreditadoLogOrq } from 'src/app/shared/model/pix-nao-creditado-log-orq';

@Component({
  selector: 'app-detalhe-orquestrador-log',
  templateUrl: './detalhe-orquestrador-log.component.html',
  styleUrls: ['./detalhe-orquestrador-log.component.scss']
})
export class DetalheOrquestradorLogComponent{

  @Input() pixNaoCreditado : PixNaoCreditadoLogOrq;

}

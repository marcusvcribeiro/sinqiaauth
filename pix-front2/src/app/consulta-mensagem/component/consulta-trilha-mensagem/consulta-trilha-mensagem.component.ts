import { Component, OnInit, Input } from '@angular/core';
import { ConsultaMensagemService } from '../../service/consulta-mensagem.service';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ConsultaMensagem } from 'src/app/shared/model/consulta-mensagem';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TrilhaMensagem } from 'src/app/shared/model/trilha-mensagem';

@Component({
  selector: 'app-consulta-trilha-mensagem',
  templateUrl: './consulta-trilha-mensagem.component.html',
  styleUrls: ['./consulta-trilha-mensagem.component.scss']
})
export class ConsultaTrilhaMensagemComponent implements OnInit {
  @Input() mensagem: ConsultaMensagem;
  filtroForm: FormGroup;

  public ds: SinqiaDataSource<TrilhaMensagem>;
  constructor(private consultaMensagemService: ConsultaMensagemService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.criarFormFiltro();
    this.listarTrilhaMensagem();
  }

  criarFormFiltro() {
    this.filtroForm = this.formBuilder.group({
      dataReferencia: [this.mensagem.dataReferenciaMensagemTransacao],
      sequencialMensagemTransacao: [this.mensagem.sequenciaTransacao]
    });
  }

  listarTrilhaMensagem() {
    this.ds = SinqiaDataSource.of<TrilhaMensagem>()
      .withFilter(this.filtroForm)
      .fromService(this.consultaMensagemService.listarTrilhaMensagem.bind(this.consultaMensagemService))
      .build();
  }
}

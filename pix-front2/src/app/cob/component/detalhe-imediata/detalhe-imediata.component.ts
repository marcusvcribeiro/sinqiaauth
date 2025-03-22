import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/seg/helper/custom-validators';
import { Grupo } from 'src/app/seg/model/grupo';
import { Parametro } from 'src/app/seg/model/parametro';
import { SegService } from 'src/app/seg/services/seg.service';
import { CobrancaImediata } from 'src/app/shared/model/cobranca-imediata';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { ConsultaCobrancaService } from '../../service/consulta-cobranca.service';

@Component({
  selector: 'app-detalhe-imediata',
  templateUrl: './detalhe-imediata.component.html',
  styleUrls: ['./detalhe-imediata.component.scss']
})
export class DetalheImediataComponent implements OnInit {

  constructor(private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private consultaCobrancaService: ConsultaCobrancaService,
    private segService: SegService) { }

    @Input() edit?: Grupo;
    @Input() cobrancaImediata?: CobrancaImediata;
    @Input() consultaCobranca?: ConsultaCobranca;
    @Output() event = new EventEmitter();
    cobrancaImediataa: CobrancaImediata;
    formData: FormGroup;
    firstTIme: boolean = true;
    txid: string = "";
    

  ngOnInit(): void {
   // this.isInsert ? '' : this.edit?.nome, Validators.required
    this.txid = this.cobrancaImediataa.txId;
    console.log(this.cobrancaImediataa)
    this.instanceFormGroupForImediata();
  }

  private instanceFormGroupForImediata() {
    this.formData = this.formBuild.group({
      txid: [this.cobrancaImediataa?.txId,],
      segExpiracao: [this.cobrancaImediataa?.segExpiracao],
      modalidadeAlteracao: [this.cobrancaImediataa?.modalidadeAlteracao ===0 ? null : this.cobrancaImediataa?.modalidadeAlteracao],
      valorSaque: [this.cobrancaImediataa?.vlrSaque],
      modalidadeSaque: [this.cobrancaImediataa?.modalidadeSaque ===0 ? null : this.cobrancaImediataa?.modalidadeSaque],
      facilitadorSaque: [this.cobrancaImediataa?.facilitadorSaque],
      modalidadeAgente: [this.cobrancaImediataa?.modalidadeAgente],
      modalidadeTroco: [this.cobrancaImediataa?.modalidadeTroco===0? null: this.cobrancaImediata?.modalidadeTroco],
      facilitadorTroco: [this.cobrancaImediataa?.facilitadorTroco],
      valorTroco: [this.cobrancaImediataa?.vlrTroco],
      modAgenteTroco: [this.cobrancaImediataa?.modAgenteTroco]
    });
  }

  onPesquisar(cobranca: ConsultaCobranca) {
     this.consultaCobrancaService.listarImediataDefault(cobranca)
     .subscribe( data => {
       this.cobrancaImediataa= data;
     });
  }

}

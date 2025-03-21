import { DrawerService } from '@albert/ui';
import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomValidators } from 'src/app/seg/helper/custom-validators';
import { Grupo } from 'src/app/seg/model/grupo';
import { SegService } from 'src/app/seg/services/seg.service';
import { CobrancaVencimento } from 'src/app/shared/model/cobranca-vencimento';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { ConsultaCobrancaService } from '../../service/consulta-cobranca.service';

@Component({
  selector: 'app-detalhe-vencimento',
  templateUrl: './detalhe-vencimento.component.html',
  styleUrls: ['./detalhe-vencimento.component.scss']
})
export class DetalheVencimentoComponent implements OnInit {

  constructor(private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private consultaCobrancaService: ConsultaCobrancaService,
    private segService: SegService) { }

    @Input() edit?: Grupo;
    @Input() cobrancaVencimento?: CobrancaVencimento;
    @Input() consultaCobranca?: ConsultaCobranca;
    @Output() event = new EventEmitter(); 
    formData: FormGroup;
    firstTIme: boolean = true;
    txid: string = "";
    token: string = "";
    datePipe = new DatePipe("en-US");  

  ngOnInit(): void {
    this.txid = this.cobrancaVencimento?.txId;
    console.log(this.cobrancaVencimento)
    this.instanceFormGroupForImediata()
  }

  private instanceFormGroupForImediata() {
    this.formData = this.formBuild.group({
      dataVencimento: [this.datePipe.transform(this.cobrancaVencimento?.dtVencimento, 'dd/MM/yyyy')],
      logradouroDev: [this.cobrancaVencimento?.logradouroDevedor],
      ufDev: [this.cobrancaVencimento?.ufDev],
      valAposVenc: [this.cobrancaVencimento?.validadeAposVencimento===0 ? null : this.cobrancaVencimento?.validadeAposVencimento],
      cidDev: [this.cobrancaVencimento?.nomeCidadeDev],
      cepDev: [this.cobrancaVencimento?.cepDev],
      vlrMulta: [this.cobrancaVencimento?.vlrMulta===0 ? null : this.cobrancaVencimento?.vlrMulta],
      modMulta: [this.cobrancaVencimento?.modalidadeMulta===0 ? null : this.cobrancaVencimento?.modalidadeMulta],
      vlrJuros: [this.cobrancaVencimento?.vlrJuros===0 ? null : this.cobrancaVencimento?.vlrJuros],
      modJuros: [this.cobrancaVencimento?.modalidadeJuros===0 ? null : this.cobrancaVencimento?.modalidadeJuros],
      modAbat: [this.cobrancaVencimento?.modalidadeAbatimento===0 ? null : this.cobrancaVencimento?.modalidadeAbatimento],
      vlrAbat:[this.cobrancaVencimento?.vlrAbatimento===0 ? null : this.cobrancaVencimento?.vlrAbatimento],
      logRec: [this.cobrancaVencimento?.logRec],
      ufRec: [this.cobrancaVencimento?.ufRec],
      cepRec:[this.cobrancaVencimento?.cepRec],
      cidRec: [this.cobrancaVencimento?.cidRec]
    });
  }

  onPesquisar(cobranca: ConsultaCobranca) {
    this.consultaCobrancaService.listarImediataDefault(cobranca)
    .subscribe( data => {
      this.cobrancaVencimento= data;
    });
 }

}

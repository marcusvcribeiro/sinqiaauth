import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PixRecebidoNaoCreditadoService } from '../../service/pix-recebido-nao-creditado.service';
import { PixNaoCreditadoCCO } from 'src/app/shared/model/pix-nao-creditado-cco';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { TransacaoMensagensRelacionadasFiltro } from 'src/app/shared/model/mensagens-relacionadas';
import { BottomSheetService } from '@albert/layout';

@Component({
  selector: 'app-detalhe-pix-nao-creditado',
  templateUrl: './detalhe-pix-nao-creditado.component.html',
  styleUrls: ['./detalhe-pix-nao-creditado.component.scss']
})
export class DetalhePixNaoCreditadoComponent implements OnInit {

  @Input() mensagem : PixNaoCreditadoCCO;

  constructor(
    private bottomSheetService: BottomSheetService
  ) { }

  ngOnInit() { }

  ngOnChanges() { }

  fecharBottomSheet() {
    this.bottomSheetService.close();
  }


}

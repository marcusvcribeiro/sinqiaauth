import { Component, Input, OnInit } from '@angular/core';
import { EscoposUsuarioRecebedor } from '../../model/EscoposUsuarioRecebedor';
import { UsuarioRecebedorService } from './../../service/usuario-recebedor.service';
import { DrawerService } from '@albert/ui';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';

@Component({
  selector: 'app-usu-rec-select-escopos',
  templateUrl: './usu-rec-select-escopos.component.html',
  styleUrls: ['./usu-rec-select-escopos.component.scss']
})
export class UsuRecSelectEscoposComponent implements OnInit {

  @Input() clientId: string;
  @Input() usuRec: number;
  escopos: EscoposUsuarioRecebedor[] = [];
  escoposManipula: EscoposUsuarioRecebedor[] = [];

  constructor(private usuRecService: UsuarioRecebedorService, private drawer: DrawerService,
    private pixMessageService: PixMessageService) { }

  ngOnInit(): void {
    this.loadEscopos();
  }

  private loadEscopos() {
    this.usuRecService.obterEscopos(this.usuRec, this.clientId).subscribe(value => {
      this.escopos = value;
      this.escoposManipula = JSON.parse(JSON.stringify(value));
    });
  }

  selecionarTodos(value: boolean) {
    this.escoposManipula.forEach(c => {
      c.selecionado = value;
    });
  }

  selectionarUnico(escopo: EscoposUsuarioRecebedor) {
    escopo.selecionado = !escopo.selecionado;
  }

  salvar() {
    let data: EscoposUsuarioRecebedor[] = [];
    this.escoposManipula.forEach(c => {
      this.escopos.forEach(cc => {
        if (c.id === cc.id && c.selecionado !== cc.selecionado) {
          data.push({ ...c });
        }
      });
    });
    if (data.length > 0) {
      this.usuRecService.atualizarEscopos(this.usuRec, this.clientId, data)
        .subscribe(result => {
          this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
          this.drawer.close();
        });
    } else {
      this.drawer.close();
    }


  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ContatoUsuarioRecebedor } from '../../model/ContatoUsuarioRecebedor';
import { UsuarioRecebedorService } from './../../service/usuario-recebedor.service';
import { DrawerService } from '@albert/ui';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';

@Component({
  selector: 'app-usu-rec-select-contatos',
  templateUrl: './usu-rec-select-contatos.component.html',
  styleUrls: ['./usu-rec-select-contatos.component.scss']
})
export class UsuRecSelectContatosComponent implements OnInit {

  @Input() idUsuRec: number;
  @Input() contatos: ContatoUsuarioRecebedor[] = [];
  contatosManipula: ContatoUsuarioRecebedor[] = [];

  constructor(private usuRecService: UsuarioRecebedorService, private drawer: DrawerService,
    private pixMessageService: PixMessageService) { }

  ngOnInit(): void {
    this.contatosManipula = JSON.parse(JSON.stringify(this.contatos));
  }

  selecionarTodos(value: boolean) {
    this.contatosManipula.forEach(c => {
      c.selecionado = value;
    });
  }

  selectionarUnico(contato: ContatoUsuarioRecebedor) {
    contato.selecionado = !contato.selecionado;
  }

  salvar() {
    let data: ContatoUsuarioRecebedor[] = [];

    this.contatosManipula.forEach(c => {
      this.contatos.forEach(cc => {
        if (c.id === cc.id && c.selecionado !== cc.selecionado) {
          data.push({ ...c });
        }
      });
    });

    if (data.length > 0) {
      this.usuRecService.atualizarContatos(this.idUsuRec, data)
        .subscribe(result => {
          this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
          this.drawer.close();
        });
    } else {
      this.drawer.close();
    }


  }

}

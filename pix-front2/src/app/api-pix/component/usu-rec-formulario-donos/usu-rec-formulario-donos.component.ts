import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

import { DonoChave } from 'src/app/shared/model/dono-chave-pix';
import { Operacao } from 'src/app/shared/model/enum/operacao';
import { OperacaoEnum } from 'src/app/seg/enum/operacaoEnum';
import { DrawerService } from '@albert/ui';
import { UsuarioRecebedorEnderecoComponent } from '../usuario-recebedor-endereco/usuario-recebedor-endereco.component';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-usu-rec-formulario-donos',
  templateUrl: './usu-rec-formulario-donos.component.html',
  styleUrls: ['./usu-rec-formulario-donos.component.scss']
})
export class UsuRecFormularioDonosComponent implements OnInit {

  @Input() usuRec?: number;
  @Input() isNew: boolean;
  @Input() donos: DonoChave[];
  @Input() listaDonos: DonoChave[];

  constructor(private drawerService: DrawerService, private translateService: TranslateService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  nomeDono(dono: DonoChave) {
    return this.listaDonos.find(e => e.idDono === dono.idDono).nome ?? '-';
  }

  remover(dono: DonoChave) {

    if (dono.operacao === OperacaoEnum.Inclusao) {
      this.donos.splice(this.donos.indexOf(dono));
      return;
    }

    dono.operacao = OperacaoEnum.Exclusao;
  }

  desfazer(dono: DonoChave) {
    if (dono.operacao === OperacaoEnum.Exclusao) {
      dono.operacao = OperacaoEnum.Default;
    }
  }

  async endereco(dono: DonoChave) {
    dono.idUsuRec = this.usuRec;
    const { drawerComponent } = await this.drawerService.create({
      component: UsuarioRecebedorEnderecoComponent,
      title: this.translateService.instant(`titulo.endereco_dono`),
      size: 'small',
      componentProps: {
        dono: dono,
        isNew: false
      }
    });
  }

}

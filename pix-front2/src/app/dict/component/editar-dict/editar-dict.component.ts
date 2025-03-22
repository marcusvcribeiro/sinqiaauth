import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { DictService } from '../../service/dict.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChaveDict } from '../../model/chave-dict';
import { DrawerService } from '@albert/ui';
import Seg from '../../model/seg';

@Component({
  selector: 'app-editar-dict',
  templateUrl: './editar-dict.component.html',
  styleUrls: ['./editar-dict.component.scss']
})
export class EditarDictComponent implements OnInit {

  formData: FormGroup;

  @Input() edit?: ChaveDict;

  seg: Seg = new Seg();

  constructor(
    private formBuild: FormBuilder,
    private drawerService: DrawerService,
    private dictService: DictService,
    private pixMessageService: PixMessageService) { }

  get controls() {
    return this.formData.controls;
  }

  get isInsert() {
    return this.edit == undefined && this.edit == null;
  }

  ngOnInit(): void {
    this.instanceFormGroupForGrupo();
  }

  private instanceFormGroupForGrupo() {
    this.formData = this.formBuild.group({
      situacao: [this.isInsert ? "" : this.edit?.idSituacao, Validators.required],
    });
  }

  onEditarChaveDict() {
    let dict = new ChaveDict();
    dict.idSituacao = this.controls.situacao.value;

    this.dictService.editarChaveDict(dict, this.edit.idChaveDict).subscribe(() =>{
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
    });
  }
}

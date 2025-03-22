import { DialogService, DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { Dicionario } from '../../model/dicionario';
import { OperacaoSeg } from '../../model/operacao.enum';
import { Usuario } from '../../model/usuario';
import { SegService } from '../../services/seg.service';

@Component({
  selector: 'app-seg-form-dicionario',
  templateUrl: './seg-form-dicionario.component.html',
  styleUrls: ['./seg-form-dicionario.component.scss']
})
export class SegFormDicionarioComponent implements OnInit {
  @Input() edit?: Dicionario;
  @Output() event = new EventEmitter();
  listaDicionario: Dicionario[];
  get isInsert(){
    return this.edit == undefined && this.edit == null;
  }

  form: FormGroup;
  constructor(
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private segService: SegService,
  ) { }

  get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.instanceFormGroupForUsuario();
    this.carregarListas();
  }

  public val: string;

  private instanceFormGroupForUsuario() {
    this.form = this.formBuild.group({
      senha: [this.isInsert? '' : this.edit?.senha, Validators.required]
    });
  }

  onSave() {
    var senhaFraca = new Dicionario();
    if (this.isInsert) {
      senhaFraca.operacao = OperacaoSeg.Inserir;
    } else {
      senhaFraca.id = this.edit?.id;
      senhaFraca.operacao = OperacaoSeg.Atualizar;
    }
    senhaFraca.senha = this.controls.senha.value;
    this.segService.salvarSenhaFracaDicionario(senhaFraca).subscribe((data) => {
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    });
  }
  private carregarListas() {
    this.segService
    .getSenhasFracas()
    .subscribe((data) => (this.listaDicionario = data));
  }
}

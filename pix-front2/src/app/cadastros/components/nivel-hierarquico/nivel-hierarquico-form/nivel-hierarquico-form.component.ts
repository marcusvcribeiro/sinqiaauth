import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { DrawerService, ToastService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NivelHierarquicoService } from 'src/app/cadastros/service/nivel-hierarquico.service';
import { NivelHierarquico } from '../../../model/nivelHierarquico';
import { OperacaoSeg } from '../../../model/operacao.enum';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-nivel-hierarquico-form',
  templateUrl: './nivel-hierarquico-form.component.html',
  styleUrls: ['./nivel-hierarquico-form.component.scss']
})
export class NivelHierarquicoFormComponent implements OnInit {
  formData: FormGroup;

  @Input() edit?: NivelHierarquico;
  @Output() event = new EventEmitter();

  seg: Seg = new Seg();

  constructor(
    private formBuild: FormBuilder,
    private drawerService: DrawerService,
    private nivelHierarquicoService: NivelHierarquicoService,
    private toastService: ToastService,
    private translateService: TranslateService,
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
      nivel: [this.isInsert ? "" : this.edit?.vrNivHie, Validators.required]
    });
  }

  cadastrarNivelHierarquico() {
    var nivelH = new NivelHierarquico();
    nivelH.vrNivHie = Number(this.controls.nivel.value);

    if(nivelH.vrNivHie % 10 !== 0){
      this.toastService.create({
        type: 'error',
        text: this.translateService.instant('validacoes.valorMultiploDe10'),
      });
      return;
    }

    this.nivelHierarquicoService.salvarNivelHierarquico(nivelH).subscribe(() =>{
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.drawerService.close();
      this.event.emit();
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}

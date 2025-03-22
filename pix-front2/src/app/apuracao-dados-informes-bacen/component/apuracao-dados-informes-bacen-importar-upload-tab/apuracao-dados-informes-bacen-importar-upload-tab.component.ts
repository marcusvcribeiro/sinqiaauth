import { ApuracaoDadosInformesBacenService } from './../../service/apuracao-dados-informes-bacen.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DrawerService, ToastService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MesesdoAnoEnum } from 'src/app/shared/model/enum/meses-do-ano.enum';

@Component({
  selector: "app-apuracao-dados-informes-bacen-importar-upload-tab",
  templateUrl:
    "./apuracao-dados-informes-bacen-importar-upload-tab.component.html",
  styleUrls: [
    "./apuracao-dados-informes-bacen-importar-upload-tab.component.scss",
  ],
})
export class ApuracaoDadosInformesBacenImportarUploadTabComponent
  implements OnInit
{
  mesesList:  MesesdoAnoEnum[] = new Array();
  arq: File;
  form: FormGroup;

  constructor(
    private toastService: ToastService,
    private translateService: TranslateService,
    private drawerService: DrawerService,
    private apuracaoDadosInformesBacenService: ApuracaoDadosInformesBacenService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.carregarLista();
    this.criarForm();
  }

  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file == undefined) return;
    const format = file.name.split(".")[file.name.split(".").length - 1].toLowerCase();
    const accepts = ["xlsx"];
    if (accepts.filter((x) => x == format).length == 1) {
      this.arq = (event.target as HTMLInputElement).files[0];
    } else {
      this.arq = null;
      this.toastService.create({
        type: "alert",
        text: this.translateService.instant("mensagem.arquivoFormatoInvalido"),
      });
    }
  }

  private criarForm() {
    this.form = this.formBuilder.group({
      ano: ['', Validators.required],
      mes: [null, Validators.required]
    });
  }

  private carregarLista(){
    this.mesesList.push(MesesdoAnoEnum.Janeiro);
    this.mesesList.push(MesesdoAnoEnum.Fevereiro);
    this.mesesList.push(MesesdoAnoEnum.Marco);
    this.mesesList.push(MesesdoAnoEnum.Abril);
    this.mesesList.push(MesesdoAnoEnum.Maio);
    this.mesesList.push(MesesdoAnoEnum.Junho);
    this.mesesList.push(MesesdoAnoEnum.Julho);
    this.mesesList.push(MesesdoAnoEnum.Agosto);
    this.mesesList.push(MesesdoAnoEnum.Setembro);
    this.mesesList.push(MesesdoAnoEnum.Outubro);
    this.mesesList.push(MesesdoAnoEnum.Novembro);
    this.mesesList.push(MesesdoAnoEnum.Dezembro);
  }

  onClick() {
    this.apuracaoDadosInformesBacenService.importarFile(this.form.controls.mes.value.toString(), this.form.controls.ano.value.toString(), this.arq).subscribe((data) => {
      this.toastService.create({
        type: "success",
        text: data.message,
      });
      this.drawerService.close();
    });
  }
}

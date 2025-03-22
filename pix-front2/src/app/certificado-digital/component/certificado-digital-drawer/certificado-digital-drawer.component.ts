import { DrawerService, ToastService } from '@albert/ui';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { CertificadoDigitalService } from '../../service/certificado-digital.service';

@Component({
  selector: 'app-certificado-digital-drawer',
  templateUrl: './certificado-digital-drawer.component.html',
  styleUrls: ['./certificado-digital-drawer.component.scss']
})
export class CertificadoDigitalDrawerComponent implements OnInit {

  @Input() finalidade?: number;
  @Input() usuarioRecebedor?: number;

  filtroForm: FormGroup;
  certificado: File;

  constructor(
    private formBuilder: FormBuilder,
    private certificadoDigitalService: CertificadoDigitalService,
    private cd: ChangeDetectorRef,
    private toastService: ToastService,
    private translateService: TranslateService,
    private drawerService: DrawerService
  ) { }

  ngOnInit() {
    this.criarFiltroForm();
  }

  get Controls() {
    return this.filtroForm.controls;
  }

  private criarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      idFinalidadeCertificadoDigital: [this.finalidade, Validators.required],
      senhaCertificado: []
    });
  }

  onChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (file == undefined) return;
    const format = file.name.split('.')[file.name.split('.').length - 1].toLowerCase()
    const accepts = ['pem', 'p12', 'cer', 'crt', 'key'];
    if (accepts.filter(x => x == format).length == 1) {
      this.certificado = (event.target as HTMLInputElement).files[0];
      this.cd.markForCheck();
    } else {
      this.certificado = null;
      this.toastService.create({
        type: 'alert',
        text: this.translateService.instant('mensagem.arquivoFormatoInvalido'),
      });
    }

  }

  onImportar() {
    this.validarSenhaCertificado();
  }

  private validarSenhaCertificado() {
    const form = this.filtroForm.value;

    this.certificadoDigitalService.importarCertificadoDigital(this.certificado,
      { senhaCertificado: form.senhaCertificado,
        idFinalidadeCertificadoDigital: form.idFinalidadeCertificadoDigital,
        usuarioRecebedor: this.usuarioRecebedor })
      .subscribe(success => {
        this.toastService.create({
          type: 'success',
          text: this.translateService.instant('mensagem.certificadoIncluido'),
        });
        this.drawerService.close();
      });
  }
}



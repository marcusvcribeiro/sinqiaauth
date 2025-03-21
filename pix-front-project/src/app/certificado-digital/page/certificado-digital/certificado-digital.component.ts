import { DrawerService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { CertificadoDigital } from 'src/app/shared/model/certificado-digital';
import { SinqiaDataSource } from '../../../shared/helper/sinqia-data-source';
import { FinalidadeCertificadoDigitalEnum } from '../../../shared/model/enum/finalidade-certificado-digital';
import { SituacaoCertificadoDigital } from '../../../shared/model/situacao-certificado-digital';
import { CertificadoDigitalDrawerComponent } from '../../component/certificado-digital-drawer/certificado-digital-drawer.component';
import { Seg } from '../../model/seg';
import { CertificadoDigitalService } from '../../service/certificado-digital.service';

@Component({
  selector: 'app-certificado-digital',
  templateUrl: './certificado-digital.component.html',
  styleUrls: ['./certificado-digital.component.scss']
})
export class CertificadoDigitalComponent implements OnInit {

  finalidadeCertificadoDigital = FinalidadeCertificadoDigitalEnum;

  filtroForm: FormGroup;

  public ds: SinqiaDataSource<CertificadoDigital>;

  seg: Seg = new Seg();

  constructor(
    private formBuilder: FormBuilder,
    private certificadoDigitalService: CertificadoDigitalService,
    private drawerService: DrawerService,
  ) { }

  ngOnInit() {
    this.criarFiltroForm();
    this.listarCertificadosDigitais();
  }

  private criarFiltroForm() {
    this.filtroForm = this.formBuilder.group({
      idFinalidadeCertificadoDigital: [],
      idSituacaoCertificadoDigital: []
    });
  }

  private listarCertificadosDigitais() {
    this.ds = SinqiaDataSource.of<CertificadoDigital>()
      .withFilter(this.filtroForm)
      .fromService(this.certificadoDigitalService.listarCertificadosDigitais.bind(this.certificadoDigitalService))
      .build();
  }

  onPesquisar() {
    this.ds.filter();
  }

  async onAdicionar() {
    const { drawerComponent } = await this.drawerService.create({
      component: CertificadoDigitalDrawerComponent,
      size: 'small',
    });

    drawerComponent.instance.close.subscribe(() => {
      this.onPesquisar();
    });
  }
}

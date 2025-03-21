import { DrawerService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { MarcacaoFraude } from 'src/app/shared/model/marcacao-fraude';
import { MarcacaFraudeService } from '../../service/marcacao-fraude.service';
import { ConsultaFraude } from 'src/app/shared/model/consulta-fraude';
import { ConsultasFraudesDetalhesComponent } from '../../consultas-fraudes-detalhes/consultas-fraudes-detalhes.component';
import { TranslateService } from '@ngx-translate/core';
import { TipoConsultaFraude } from 'src/app/shared/model/enum/tipo-consulta-fraude';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import Seg from '../../model/seg';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-marcacao-fraude-principal',
  templateUrl: './marcacao-fraude-principal.component.html',
  styleUrls: ['./marcacao-fraude-principal.component.scss']
})
export class MarcacaoFraudePrincipalComponent implements OnInit {

  constructor(private drawerService: DrawerService,
    private service: MarcacaFraudeService,
    private translateService: TranslateService,
    private formBuilder: FormBuilder) { }

  seg: Seg = new Seg();
  public ds: SinqiaDataSource<MarcacaoFraude>;
  private lista: MarcacaoFraude[] = [];
  filtroForm: FormGroup;

  ngOnInit(): void {
    this.criarForm();
    this.criarDataSource();
  }

  private unsubscribe$ = new Subject();
  exportar(){

    var excelNome = "MarcacoesFraude";
    var dataSource = { listGeneric: [{
      itemLista1: 'CpfCnpj',
      itemLista2: 'DataMarcacao',
      itemLista3: 'Status',
      itemLista4: 'ChaveEnderecamento',
      itemLista5: 'Nome',
      itemLista6: 'Agência',
      itemLista7: 'Conta',
    }] };

    this.lista.forEach((data) => {
      data.consultas.forEach((item) => {
        dataSource.listGeneric.push({
          itemLista1: item.cpfCnpj,
          itemLista2: item.dataUltimaMarcacaoFraude.toString(),
          itemLista3: this.toStatus([item.tipoConsultaFraude]),
          itemLista4: item.chaveEnderecamento,
          itemLista5: item.nomePessoa == null ? '' : item.nomePessoa,
          itemLista6: item.codigoAgencia == null ? '' : item.codigoAgencia.toString(),
          itemLista7: item.numeroConta == null ? '' : item.numeroConta.toString(),
        });
      });
    });

    this.service
          .exportarMarcacoesFraude(dataSource, excelNome)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe((res) => DownloadFile.downloadFile(res));

  }

  criarDataSource() {
      this.ds = SinqiaDataSource.of<MarcacaoFraude>()
      .fromNonPageableService((d) => {
          return this.service.listarMarcacoesFraude(this.filtroForm.getRawValue())
        }).build();

        this.ds.data$.subscribe((data) => {
          this.lista = data;
        });
    }

    openDrawer(IdDono: string, consultas: ConsultaFraude[]){
      this.drawerService.create({
            component: ConsultasFraudesDetalhesComponent,
            size: 'medium',
            title: this.translateService.instant('marcacaoFraude.detalhes'),
            componentProps: {
              detalhes: consultas,
            }
          });


    }

    toStatus(tipos: number[]){
      TipoConsultaFraude.CHAVE_ENDEREÇAMENTO;

      if(tipos.length == 1){
        return this.translateService.instant('marcacaoFraude.status.' + tipos[0]);
      }else{
        return this.translateService.instant('marcacaoFraude.status.ambos');
      }
    }

    private criarForm() : void {
      this.filtroForm = this.formBuilder.group({
        cpfCnpj: [null, Validators.pattern(/^([\d]{11}|[\d]{14})$/)],
        dataInicio: [null],
        dataFim: [null]
      });
    }

    onPesquisar() : void {
      if(this.filtroForm.get('cpfCnpj').value == ''){
        this.filtroForm.get('cpfCnpj').setValue(null);
      }
      this.ds.filter();
    }

}

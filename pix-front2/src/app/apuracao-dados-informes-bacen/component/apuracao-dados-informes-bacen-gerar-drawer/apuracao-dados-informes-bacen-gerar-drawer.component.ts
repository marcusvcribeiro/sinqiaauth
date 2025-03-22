import { environment } from "src/environments/environment";
import { DrawerService } from "@albert/ui";
import { PixMessageService } from "../../../shared/service/pix-message-service";
import { MesesdoAnoEnum } from "../../../shared/model/enum/meses-do-ano.enum";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApuracaoDadosInformesBacenService } from "../../service/apuracao-dados-informes-bacen.service";

@Component({
  selector: "app-apuracao-dados-informes-bacen-gerar-drawer",
  templateUrl: "./apuracao-dados-informes-bacen-gerar-drawer.component.html",
  styleUrls: ["./apuracao-dados-informes-bacen-gerar-drawer.component.scss"],
})
export class ApuracaoDadosInformesBacenGerarDrawerComponent implements OnInit {
  mesesList: MesesdoAnoEnum[] = new Array();
  form: FormGroup;
  download_liberado: boolean = false;
  link: string = "";

  constructor(
    private apuracaoDadosInformesBacenService: ApuracaoDadosInformesBacenService,
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService
  ) {}

  get controls() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.carregarLista();
    this.instanceForm();
  }

  onGerar() {
    this.apuracaoDadosInformesBacenService
      .gerarDados(
        this.controls.mes.value,
        this.controls.ano.value
      )
      .subscribe((data) => {
        this.download_liberado = true;
        this.link = data.link.replace("api/v1/", "");
      });
  }

  download() {
    const filename = this.link.substring(this.link.replace('.xml','').lastIndexOf('/') + 1);
    this.apuracaoDadosInformesBacenService
      .download(this.link)
      .subscribe((res) => {
        let dataType = 'xml';
        let binaryData = [];
        binaryData.push(res);
        let downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(
          new Blob(binaryData, { type: dataType })
        );
        downloadLink.setAttribute("download", filename);
        document.body.appendChild(downloadLink);
        downloadLink.click();
      });
  }

  private instanceForm() {
    this.form = this.formBuild.group({
      mes: [null, Validators.required],
      ano: ["", Validators.required]
    });
  }

  private carregarLista() {
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
}

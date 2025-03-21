import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { Subject } from "rxjs";
import { SinqiaDataSource } from "src/app/shared/helper/sinqia-data-source";
import { HistoricoAlteracaoUsuario } from "../../model/historicoAlteracaoUsuario";
import { SegService } from "../../services/seg.service";
import { ParametrosGlobaisService } from "src/app/shared/service/parametros-globais.service";
import { PreferenciaUsuarioService } from "src/app/shared/service/preferencia-usuario.service";
import { Seg } from "./model/seg";
import { DrawerService } from "@albert/ui";
import { SegFormAlteracaoUsuarioComponent } from "../../component/seg-form-view-alteracoes-usuario/seg-form-view-alteracoes-usuario.component";

@Component({
    selector: 'app-historico-alteracao-usuarios',
    templateUrl: './historico-alteracao-usuarios.component.html',
    styleUrls: ['./historico-alteracao-usuarios.component.scss']
  })
  export class HistoricoAlteracaoUsuarioComponent implements OnInit {

    public ds: SinqiaDataSource<HistoricoAlteracaoUsuario>
    historicoAlteracaoUsuario: HistoricoAlteracaoUsuario[];
    dataReferencia: Date;
    filtroForm: FormGroup;
    dataIniTrilha: Date;
    dataFimTrilha: Date;
    numeroLinhas: number;
    listaQuantidadeLinhas: number[];
    private unsubscribe$ = new Subject();
    seg: Seg = new Seg();

    constructor(
        private segService: SegService,
        private formBuilder: FormBuilder,
        private drawerService: DrawerService) { }

    ngOnInit(): void {
        this.dataReferencia = new Date();
        this.criarForm();
        this.criarDataSource();
        this.onPesquisar();
    }

    private criarForm() {
        this.filtroForm = this.formBuilder.group({
          nomeAplicacao: "SQPIX",
          nomeUsuario: "",
          dataIniTrilha: [this.dataReferencia],
          dataFimTrilha: [this.dataReferencia],
        });
      }

    criarDataSource() {
      this.ds = SinqiaDataSource.of<HistoricoAlteracaoUsuario>()
        .withFilter(this.filtroForm)
        .fromService((d: any) =>
          this.segService.listarHistoricoAlteracaoUsuario(this.filtroForm.getRawValue(), d))
        .multiSelectable()
        .build();
    }

    public onPesquisar() {
        this.ds.filter();
    }

    onEdit(item:HistoricoAlteracaoUsuario){
        this.drawerService.create({
          component: SegFormAlteracaoUsuarioComponent,
          size: 'small',
          componentProps: { edit: item}
        });
      }
  }
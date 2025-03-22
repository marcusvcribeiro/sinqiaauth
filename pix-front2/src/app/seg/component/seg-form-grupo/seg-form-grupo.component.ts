import { OperacaoSeg } from "./../../model/operacao.enum";
import { DrawerService } from "@albert/ui";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PixMessageService } from "src/app/shared/service/pix-message-service";
import { Grupo } from "../../model/grupo";
import { SegService } from "../../services/seg.service";
import { Parametro } from "../../model/parametro";
import { CustomValidators } from "../../helper/custom-validators";

@Component({
  selector: "app-seg-form-grupo",
  templateUrl: "./seg-form-grupo.component.html",
  styleUrls: ["./seg-form-grupo.component.scss"],
})
export class SegFormGrupoComponent implements OnInit {
  @Input() edit?: Grupo;
  @Input() parametro?: Parametro;
  @Output() event = new EventEmitter();

  formData: FormGroup;
  firstTIme: boolean = true;

  constructor(
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private segService: SegService
  ) { }

  get controls() {
    return this.formData.controls;
  }

  get isInsert() {
    return this.edit === undefined && this.edit == null;
  }

  ngOnInit(): void {
    this.instanceFormGroupForGrupo();
    this.carregarListas();
  }

  
  listaUsarDicionario: any[] = [
    {
      'label': 'Sim',
      'value': 'S'
    },
    {
      'label': 'Não',
      'value': 'N'
    }
  ]

  private instanceFormGroupForGrupo() {
    if (this.parametro?.qtdDiaExpSen === -1){
      this.parametro.qtdDiaExpSen = 90;
    }

    this.formData = this.formBuild.group({
      codigo: [this.isInsert ? '' : this.edit?.id, Validators.required],
      descricao: [this.isInsert ? '' : this.edit?.nome, Validators.required],
      diasSenhaExpirar: [this.isInsert ? this.parametro?.qtdDiaExpSen : this.edit?.qtdDiaExpSen, CustomValidators.number({ min: 1 })],
      numTentativasInvalidas: [this.isInsert ? this.parametro?.qtdTtvIvlPem : this.edit?.qtdTtvIvlPem, Validators.required],
      qtdDiasSemAcesso: [this.isInsert ? this.parametro?.qtdDiaSemAceSis : this.edit?.qtdDiaSemAceSis, Validators.required],
      tipCaracSenha: [this.isInsert ? this.parametro?.tipCarSen : this.edit?.tipCarSen, Validators.required],
      numMinimoCaracteres: [this.isInsert ? this.parametro?.tamMinSen : this.edit?.tamMinSen, Validators.required],
      numMaximoCaracteres: [this.isInsert ? this.parametro?.tamMaxSen : this.edit?.tamMaxSen, Validators.required],
      numCarRepetidos: [this.isInsert ? this.parametro?.numCacIguCcu?.toString() : this.edit?.numCacIguCcu?.toString(), Validators.required],
      qtdMaximaAlteracoesSenhaDia: [this.isInsert ? this.parametro?.qtdMaxAltSenDia?.toString() : this.edit?.qtdMaxAltSenDia?.toString(), Validators.required],
      qtdMinSenhasConsecutivasDistintas: [this.isInsert ? this.parametro?.qtdMinSenCcu?.toString() : this.edit?.qtdMinSenCcu?.toString(), Validators.required],
      qtdMinCaracteresLetras: [this.isInsert ? this.parametro?.qtdMinCacLet?.toString() : this.edit?.qtdMinCacLet?.toString(), Validators.required],
      qtdMinLetrasMaiusculas: [this.isInsert ? this.parametro?.qtdMinLetMau?.toString() : this.edit?.qtdMinLetMau?.toString(), Validators.required],
      qtdMinLetrasMinusculas: [this.isInsert ? this.parametro?.qtdMinLetMiu?.toString() : this.edit?.qtdMinLetMiu?.toString(), Validators.required],
      qtdMinCarcEspeciais: [this.isInsert ? this.parametro?.qtdMinCacEsp?.toString() : this.edit?.qtdMinCacEsp?.toString(), Validators.required],
      qtdMinCarcMimericos: [this.isInsert ? this.parametro?.qtdMinCacNum?.toString() : this.edit?.qtdMinCacNum?.toString(), Validators.required],
      utzDioSenFra: [this.isInsert ? true : this.edit?.utzDioSenFra, Validators.required],
    });

    this.updateControles(this.controls.tipCaracSenha.value);
    this.firstTIme = false;
  }

  onSave() {
    var grupo = new Grupo();
    if (this.isInsert) {
      grupo.operacao = OperacaoSeg.Inserir;
    } else {
      grupo.operacao = OperacaoSeg.Atualizar;
    }

    grupo.id = this.controls.codigo.value;
    grupo.nome = this.controls.descricao.value;
    grupo.qtdDiaExpSen = this.controls.diasSenhaExpirar.value;
    grupo.qtdTtvIvlPem = this.controls.numTentativasInvalidas.value;
    grupo.qtdDiaSemAceSis = this.controls.qtdDiasSemAcesso.value;
    grupo.tipCarSen = this.controls.tipCaracSenha.value;
    grupo.tamMinSen = this.controls.numMinimoCaracteres.value;
    grupo.tamMaxSen = this.controls.numMaximoCaracteres.value;
    grupo.numCacIguCcu = this.controls.numCarRepetidos.value;
    grupo.qtdMaxAltSenDia = this.controls.qtdMaximaAlteracoesSenhaDia.value;
    grupo.qtdMinSenCcu = this.controls.qtdMinSenhasConsecutivasDistintas.value;
    grupo.qtdMinCacLet = this.controls.qtdMinCaracteresLetras.value;
    grupo.qtdMinLetMau = this.controls.qtdMinLetrasMaiusculas.value;
    grupo.qtdMinLetMiu = this.controls.qtdMinLetrasMinusculas.value;
    grupo.qtdMinCacEsp = this.controls.qtdMinCarcEspeciais.value;
    grupo.qtdMinCacNum = this.controls.qtdMinCarcMimericos.value;
    grupo.utzDioSenFra = this.controls.utzDioSenFra.value;

    this.segService.salvarGrupo(grupo).subscribe((data) => {
      this.pixMessageService.toastSuccess("mensagem.operacaoSucesso");
      this.drawerService.close();
      this.event.emit();
    });
  }

  private carregarListas() { }

  tipCaracSenhaChangeValue($event) {
    this.updateControles($event.value);
  }

  private camposNumero(obrigatorios: boolean) {

    this.controls.qtdMinCarcMimericos.clearValidators();
    if (obrigatorios) {
      this.controls.qtdMinCarcMimericos.setValidators(CustomValidators.number({ min: 1 }));

      if (!this.firstTIme || this.isInsert) {
        this.controls.qtdMinCarcMimericos.setValue("1");
      }
    } else {
      this.controls.qtdMinCarcMimericos.setValue(null);
    }

    this.controls.qtdMinCarcMimericos.updateValueAndValidity();
  }

  private camposLetra(obrigatorios: boolean) {

    this.controls.qtdMinCaracteresLetras.clearValidators();
    this.controls.qtdMinLetrasMaiusculas.clearValidators();
    this.controls.qtdMinLetrasMinusculas.clearValidators();
    this.controls.qtdMinCarcEspeciais.clearValidators();

    if (obrigatorios) {

      this.controls.qtdMinCaracteresLetras.setValidators(CustomValidators.number({ min: 1 }));

      if (!this.firstTIme || this.isInsert) {
        this.controls.qtdMinCaracteresLetras.setValue("1");
      }

      this.controls.qtdMinLetrasMaiusculas.setValidators(CustomValidators.number({ min: 0 }));
      this.controls.qtdMinLetrasMinusculas.setValidators(CustomValidators.number({ min: 0 }));
      this.controls.qtdMinCarcEspeciais.setValidators(CustomValidators.number({ min: 0 }));

    } else {

      this.controls.qtdMinCaracteresLetras.setValue(null);
      this.controls.qtdMinLetrasMaiusculas.setValue(null);
      this.controls.qtdMinLetrasMinusculas.setValue(null);
      this.controls.qtdMinCarcEspeciais.setValue(null);
    }

    this.controls.qtdMinCaracteresLetras.updateValueAndValidity();
    this.controls.qtdMinLetrasMaiusculas.updateValueAndValidity();
    this.controls.qtdMinLetrasMinusculas.updateValueAndValidity();
    this.controls.qtdMinCarcEspeciais.updateValueAndValidity();
  }
  private updateControles(tipo) {
    switch (tipo) {
      case 'N': {
        this.camposNumero(true);
        this.camposLetra(false);
        break;
      }
      case 'C': {
        this.camposNumero(false);
        this.camposLetra(true);
        break;
      }
      case 'A': {
        this.camposNumero(true);
        this.camposLetra(true);
        break;
      }
      default: {
        this.camposNumero(true);
        this.camposLetra(true);
        break;
      }
    }
  }
}

import { DrawerService, ToastService } from "@albert/ui";
import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { PixMessageService } from "src/app/shared/service/pix-message-service";
import { Grupo } from "../../model/grupo";
import { Usuario } from "../../model/usuario";
import { SegService } from "../../services/seg.service";

@Component({
  selector: "app-seg-form-usuario-senha",
  templateUrl: "./seg-form-usuario-senha.component.html",
  styleUrls: ["./seg-form-usuario-senha.component.scss"],
})
export class SegFormUsuarioSenhaComponent implements OnInit {
  @Input() edit?: Usuario;
  form: FormGroup;
  regras: Grupo;
  tipoCaracter: string = '';

  constructor(
    private formBuild: FormBuilder,
    private pixMessageService: PixMessageService,
    private drawerService: DrawerService,
    private segService: SegService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.segService.getGruposUsuario(this.edit.id).subscribe(regras => {
      this.regras = regras[0];
      if(this.regras.tipCarSen === 'A') this.tipoCaracter = 'Alfanumérico';
      if(this.regras.tipCarSen === 'N') this.tipoCaracter = 'Numérico';
      if(this.regras.tipCarSen === 'C') this.tipoCaracter = 'Caracter';
    });
    this.form = this.formBuild.group(
      {
        senha: ["", [Validators.required, Validators.minLength(8)]],
        confirmar: ["", Validators.required],
      }
    );
  }

  validacaoSenha() {
    let senha = this.form.controls.senha.value;
    let confirmacao = this.form.controls.confirmar.value;

    let validacaoGeral = true;
    if (senha !== confirmacao) {
      this.toastService.create({
        type: 'error',
        text: this.translateService.instant('validacoes.senhaNaoCorresponde')
      });
      validacaoGeral = false;
      return false;
    }

    if (this.regras) {
      // Valida a quantidade mínima de caracteres inseridos na senha
      if (this.regras.tamMinSen) {
        if (senha.length >= this.regras.tamMinSen && confirmacao.length >= this.regras.tamMinSen) {
          validacaoGeral = true;
        } else {
          this.toastService.create({
            type: 'error',
            text: this.translateService.instant('validacoes.minimoCaracteresInvalido')
          });
          validacaoGeral = false;
          return false;
        }
      }
      // Valida a quantidade máxima de caracteres inseridos na senha
      if (this.regras.tamMaxSen) {
        if (senha.length <= this.regras.tamMaxSen && confirmacao.length <= this.regras.tamMaxSen) {
          validacaoGeral = true;
        } else {
          this.toastService.create({
            type: 'error',
            text: this.translateService.instant('validacoes.maximoCaracteresInvalido')
          });
          validacaoGeral = false;
          return false;
        }
      }
      // Valida o tipo de caractere inserido na senha
      if (this.regras.tipCarSen) {
        if (this.regras.tipCarSen === 'A') {
          var regEx = /^[0-9a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
          if (senha.match(regEx) && confirmacao.match(regEx)) {
            validacaoGeral = true;
          }
          else {
            this.toastService.create({
              type: 'error',
              text: this.translateService.instant('validacoes.tipoCaractereAlfanumeico')
            });
            validacaoGeral = false;
            return false;
          }
        } else if ((this.regras.tipCarSen === 'N')) {
          var regEx = /^[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
          if (senha.match(regEx) && confirmacao.match(regEx)) {
            validacaoGeral = true;
          }
          else {
            this.toastService.create({
              type: 'error',
              text: this.translateService.instant('validacoes.tipoCaractereNumerico')
            });
            validacaoGeral = false;
            return false;
          }

        } else if ((this.regras.tipCarSen === 'C')) {
          var regEx = /^[a-zA-Z!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+$/;
          if (senha.match(regEx) && confirmacao.match(regEx)) {
            validacaoGeral = true;
          }
          else {
            this.toastService.create({
              type: 'error',
              text: this.translateService.instant('validacoes.permitidoLetras')
            });
            validacaoGeral = false;
            return false;
          }
        }
      }
      //Verifica quantidade de números na senha
      if (this.regras.qtdMinCacNum) {
        if (this.regras.qtdMinCacNum > senha.replace(/[^0-9]/g, '').length) {
          validacaoGeral = false;
          this.toastService.create({
            type: 'error',
            text: this.translateService.instant('validacoes.quantidadeMinimaNumerosInvalida')
          });
          return false;
        } else validacaoGeral = true;
      }
      //Verifica quantidade mínima de letras maiúsculas
      if (this.regras.qtdMinLetMau) {
        if (this.regras.qtdMinLetMau > senha.replace(/[^A-Z]/g, '').length) {
          validacaoGeral = false;
          this.toastService.create({
            type: 'error',
            text: this.translateService.instant('validacoes.quantidadeMinimaLetrasMaiusculasInvalida')
          });
          return false;
        } else validacaoGeral = true;
      }
      //Verifica quantidade mínima de letras minúsculas
      if (this.regras.qtdMinLetMiu) {
        if (this.regras.qtdMinLetMiu > senha.replace(/[^a-z]/g, '').length) {
          validacaoGeral = false;
          this.toastService.create({
            type: 'error',
            text: this.translateService.instant('validacoes.quantidadeMinimaLetrasMinusculasInvalida')
          });
          return false;
        } else validacaoGeral = true;;
      }
      //Verifica quantidade mínima de caracteres especiais
      if (this.regras.qtdMinCacEsp) {
        if (this.regras.qtdMinCacEsp > senha.replace(/[^!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g, '').length) {
          validacaoGeral = false;
          this.toastService.create({
            type: 'error',
            text: this.translateService.instant('validacoes.quantidadeMinimaCaracteresEspeciaisInvalido')
          });
          return false;
        } else validacaoGeral = true;
      }
      //Verifica quantidade mínima de caracteres (letras)
      if (this.regras.qtdMinCacLet) {
        if (this.regras.qtdMinCacLet > senha.replace(/[^a-zA-z]/g, '').length) {
          validacaoGeral = false;
          this.toastService.create({
            type: 'error',
            text: this.translateService.instant('validacoes.quantidadeMinimaLetrasInvalida')
          });
          return false;
        } else validacaoGeral = true;
      }

      //Verifica os caracteres repeditos consecutivos da senha de acordo com a quantidade permitida
      if (this.regras.numCacIguCcu) {
        const senhaArray = senha.split('');
        let contador = 1;
        let variavelConsecutivos = this.regras.numCacIguCcu;
        let validacaoCaracretesConsecutivos = false;
        for (let i = 1; i < senhaArray.length; i++) {
          let letraAnterior = senhaArray[i - 1];
          let letraAtual = senhaArray[i];
          if (letraAtual === letraAnterior) contador++; else contador = 1;

          if (contador > variavelConsecutivos) {
            validacaoCaracretesConsecutivos = false;
            this.toastService.create({
              type: 'error',
              text: this.translateService.instant('validacoes.caracteresIguaisConsecutivos')
            });
            return false;
          } else validacaoCaracretesConsecutivos = true
        }
        validacaoGeral = validacaoCaracretesConsecutivos;
      }
    }
    return validacaoGeral;
  }

  onSave() {
    if (this.validacaoSenha()) {
      const pass: any = {
        password: this.form.controls.senha.value,
        confirm: this.form.controls.confirmar.value,
      };

      this.segService.novaSenhaUsuario(this.edit?.id, pass).subscribe((data) => {
        this.pixMessageService.toastSuccess("mensagem.operacaoSucesso");
        this.drawerService.close();
      });
    }
  }

  getValidationPassword(idUsuario) {
    this.segService.getGruposId(idUsuario).subscribe(parametros => console.log(parametros))
  }

  private MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        // return if another validator has already found an error on the matchingControl
        return;
      }

      // set error on matchingControl if validation fails
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}

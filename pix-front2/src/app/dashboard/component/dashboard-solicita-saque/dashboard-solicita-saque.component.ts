import { DrawerService, ToastService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { DashboardSolicitaSaqueDepositoService } from '../../service/dashboard-solicita-saque-deposito.service';

@Component({
  selector: 'app-dashboard-solicita-saque',
  templateUrl: './dashboard-solicita-saque.component.html',
  styleUrls: ['./dashboard-solicita-saque.component.scss']
})
export class DashboardSolicitaSaqueComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private toastService: ToastService,
    private translateService: TranslateService,
    private drawerService: DrawerService,
    private SolicitarTransacaoSpbservice: DashboardSolicitaSaqueDepositoService) { }

  ngOnInit(): void {
    this.instanciaFormulario();
  }

  private instanciaFormulario() {
    this.form = this.formBuilder.group({
      Valor: [null, Validators.required]
    });
  }

  onClick(): void {
    this.SolicitarTransacaoSpbservice.solicitarSaque(this.form.controls.Valor.value)
      .subscribe(success => {
        this.toastService.create({
          type: 'success',
          text: this.translateService.instant('mensagem.operacaoSucesso'),
        });

        this.drawerService.close();

      });

  }
}

import { TranslateService } from '@ngx-translate/core';

import { DrawerService } from '@albert/ui';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PreferenciaUsuarioService } from 'src/app/shared/service/preferencia-usuario.service';
import { ParametrosGeraisComponent } from '../../component/parametros-gerais/parametros-gerais.component';
import Seg from './../../model/seg'

@Component({
  selector: 'app-configuracao',
  templateUrl: './configuracao.component.html',
  styleUrls: ['./configuracao.component.scss']
})
export class ConfiguracaoComponent implements OnInit, OnDestroy {
  exibicaoForm: FormGroup;
  seg: Seg = new Seg();

  private unsubscribe$ = new Subject();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private preferenciaUsuarioService: PreferenciaUsuarioService,
    private drawerService: DrawerService,
    private translateService: TranslateService
  ) { }

  ngOnInit() {
    this.criarForm();
    this.preencherValorDefaultLinhas();
    this.criarFormChanges();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  criarForm() {
    this.exibicaoForm = this.formBuilder.group({
      numeroLinhas: [null, Validators.compose([Validators.max(50)])],
      tempoAtualizacaoAlerta: []
    });
  }

  onTrocarSenha() {
    this.router.navigate(['configuracao/troca-senha']);
  }

  onParametrosGerais(){
    this.drawerService.create({
      component: ParametrosGeraisComponent,
      size: 'large',
      title: this.translateService.instant('titulo.parametros')
    })
  }

  criarFormChanges() {
    this.exibicaoForm.get('numeroLinhas').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        v => {
          if (this.exibicaoFormControls.numeroLinhas.valid) {
            this.preferenciaUsuarioService.numeroLinhasPagina = v;
          }
        }
      );

    this.exibicaoForm.get('tempoAtualizacaoAlerta').valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        v => {
          this.preferenciaUsuarioService.tempoAtualizacaoAlerta = v;
        }
      );
  }

  preencherValorDefaultLinhas() {
    const numeroLinhas = this.preferenciaUsuarioService.numeroLinhasPagina;
    const tempoAtualizacaoAlerta = this.preferenciaUsuarioService.tempoAtualizacaoAlerta;
    this.exibicaoForm.patchValue({ numeroLinhas: numeroLinhas, tempoAtualizacaoAlerta });
  }

  get exibicaoFormControls() {
    return this.exibicaoForm.controls;
  }
}

import { AuthenticationConfigService } from '@albert/authentication';
import { UIMProviderConfig } from '@albert/ui-manager-provider';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AcompanhamentoReservaWidgetComponent } from './acompanhamento-reserva/component/acompanhamento-reserva-widget/acompanhamento-reserva-widget.component';
import { DynamicLoaderConfigService } from '@albert/dashboard';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Config {

  constructor(private dynamicLoaderConfig: DynamicLoaderConfigService,
    private authenticationConfigService: AuthenticationConfigService,
    private uimConfig: UIMProviderConfig, private http: HttpClient) {
    this.configAuthentication();
    this.configDynamicLoaderService();
    this.uimConfig.url = environment.api.ui;
    
  }

  private async configDynamicLoaderService() {
    this.dynamicLoaderConfig.loadComponentsConfiguration([{
      key: 'AcompanhamentoReservaWidgetComponent',
      component: AcompanhamentoReservaWidgetComponent
    }]);
  }

  private configAuthentication() {
    this.authenticationConfigService.setConfig(environment.authConfig);
  }
  
}

import { AuthenticationConfigService, AuthenticationService } from '@albert/authentication';
import { Compiler, Component, HostListener, AfterViewInit } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { Config } from './config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements AfterViewInit {

  constructor(
    private _compiler: Compiler,
    private translateService: TranslateService,
    private config: Config,
    private authService: AuthenticationService,
    private ngSelectConfig: NgSelectConfig) {
    this.ngSelectConfig.appendTo = 'body';
    this._compiler.clearCache();
  }

  ngAfterViewInit(): void {
    this.translateService.setDefaultLang(environment.defaultLanguage);
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler($event) {
    if (this.authService.isAuthenticated) {
      localStorage.setItem('lastAuthState', 'authenticated');
    } else {
      localStorage.setItem('lastAuthState', 'unauthenticated');
    }
  }
}

import { Component, AfterContentInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-troca-senha',
  templateUrl: './troca-senha.component.html',
  styleUrls: ['./troca-senha.component.scss']
})
export class TrocaSenhaComponent  implements AfterContentInit {

  userAccountUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngAfterContentInit() {
    this.userAccountUrl = this.sanitizer.bypassSecurityTrustResourceUrl(environment.authConfig.stsServer + '/account/password');
  }

}

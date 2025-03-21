import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'alb-post-login',
  templateUrl: './post-login.component.html',
})
export class PostLoginComponent {

  // injetando serviço de authentication pra poder carregar as configurações
  constructor(private authenticationService: AuthenticationService) {
  }
}

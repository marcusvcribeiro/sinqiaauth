import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication.service';

@Component({
  selector: 'alb-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent {

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.logout();
  }
}

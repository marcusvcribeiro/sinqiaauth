import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'doc-home-releases',
  templateUrl: './home-releases.component.html',
  styleUrls: ['./home-releases.component.scss']
})
export class HomeReleasesDocComponent {
  constructor(private router: Router) {}

  layout = [
    {
      name: 'Body',
      path: '/layout/body'
    },
    {
      name: 'Bottom-sheet',
      path: '/layout/bottom-sheet',
    },
    {
      name: 'Container',
      path: '/layout/container'
    },
    {
      name: 'Header',
      path: '/layout/header'
    },
    {
      name: 'Navbar-Full',
      path: '/layout/navbar-full'
    },
    {
      name: 'Navbar-Simple',
      path: '/layout/navbar-simple'
    },
    {
      name: 'Navigation',
      path: '/layout/navigation'
    },
    {
      name: 'Sidenav',
      path: '/layout/sidenav'
    },
  ];

  ui = [
    {
      name: 'Accordion',
      path: '/ui/accordion',
    },
    {
      name: 'Box',
      path: '/ui/box',
    },
    {
      name: 'BoxIcon',
      path: '/ui/box-icon',
    },
    {
      name: 'Button',
      path: '/ui/button',
    },
    {
      name: 'Button Icon',
      path: '/ui/button-icon',
    },
    {
      name: 'Button Toggle',
      path: '/ui/button-toggle',
    },
    {
      name: 'Calendar',
      path: '/ui/calendar',
    },
    {
      name: 'Card',
      path: '/ui/card',
    },
    {
      name: 'Checkbox',
      path: '/ui/checkbox',
    },
    {
      name: 'Clock',
      path: '/ui/clock',
    },
    {
      name: 'Datetime',
      path: '/ui/datetime',
    },
    {
      name: 'Datetime-picker',
      path: '/ui/datetime-picker',
    },
    {
      name: 'Datepicker',
      path: '/ui/datepicker',
    },
    {
      name: 'Dialog',
      path: '/ui/dialog',
    },
    {
      name: 'Display',
      path: '/ui/display',
    },
    {
      name: 'Drawer',
      path: '/ui/drawer',
    },
    {
      name: 'Input',
      path: '/ui/input',
    },
    {
      name: 'Loader',
      path: '/ui/loader',
    },
    {
      name: 'Menu',
      path: '/ui/menu',
    },
    {
      name: 'Modal',
      path: '/ui/modal',
    },
    {
      name: 'Number',
      path: '/ui/number',
    },
    {
      name: 'RadioButton',
      path: '/ui/radio',
    },
    {
      name: 'Slide Toggle',
      path: '/ui/slide-toggle',
    },
    {
      name: 'Tab',
      path: '/ui/tab',
    },
    {
      name: 'Text-area',
      path: '/ui/text-area',
    },
    {
      name: 'Time-picker',
      path: '/ui/time-picker',
    },
    {
      name: 'Toast',
      path: '/ui/toast',
    },
  ];

  gotoPage(menu) {
    this.router.navigate([menu.path]);
  }

 }

import {
  Component
} from '@angular/core';
import {
  NavigationItem
} from '@albert/layout';

@Component({
  selector: 'doc-app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'docs';
  lista: NavigationItem[] = [{
      icon: 'home',
      name: 'Home',
      path: '/'
    },
    {
      icon: 'menu',
      name: 'Indice',
      type: 'full',
      children: [{
        name: 'Utils',
        children: [
          {
            name: 'Get Started',
            path: '/utils/get-started'
          },
          {
            name: 'Como Contribuir',
            path: '/utils/contributing'
          },
          {
            name: 'Jornada Core Committer',
            path: '/utils/core-committer'
          },
          {
            name: 'Criando e Alterando Componentes',
            path: '/utils/creating-components'
          },
          {
            name: 'Aprovação de PR',
            path: '/utils/pr-process'
          },
          {
            name: 'Versionamento e Publicação',
            path: '/utils/publishing'
          },
          {
            name: 'Autenticação',
            path: '/utils/authentication'
          },
          {
            name: 'Dashboard',
            path: '/utils/dashboard'
          },
          // {
          //   name: 'Schematics',
          //   path: '/utils/schematics'
          // },
          {
            name: 'Atalhos de Teclado',
            path: '/utils/shortcuts'
          },
          {
            name: 'Releases',
            path: '/utils/releases'
          },
        ]
      },
        {
        name: 'Layout',
        children: [{
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
      ]
      },
        {
          name: 'UI',
          children: [
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
              name: 'Chips',
              path: '/ui/chips',
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
              name: 'Panel',
              path: '/ui/panel',
            },
            {
              name: 'Select',
              path: '/ui/select',
            },
            {
              name: 'Search panel',
              path: '/ui/search-panel',
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
              name: 'Tabela',
              path: '/ui/table',
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
            {
              name: 'Tooltip',
              path: '/ui/tooltip',
            }
          ],
        },
        {
          name: 'Styles',
          children: [
            {
              name: 'Box Space',
              path: '/styles/box-space',
            },
            {
              name: 'Button Group',
              path: '/styles/button-group',
            },
            {
              name: 'Divisor',
              path: '/styles/divisor',
            },
            {
              name: 'Icon',
              path: '/styles/icon',
            },
            {
              name: 'Variables',
              path: '/styles/variables',
            },
          ]
        }
      ]
    },
  ];
  theme = 'light';

  changeTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('theme',this.theme);
  }

}

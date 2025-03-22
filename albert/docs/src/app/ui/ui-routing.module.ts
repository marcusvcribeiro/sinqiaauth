
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccordionComponent } from './pages/accordion/accordion.component';
import { BoxDocComponent } from './pages/box/box.component';
import { ButtonDocComponent } from './pages/button/button.component';
import { ButtonIconDocComponent } from './pages/button-icon/button-icon.component';
import { ButtonToggleDocComponent } from './pages/button-toggle/button-toggle.component';
import { CalendarDocComponent } from './pages/calendar/calendar.component';
import { CardDocComponent } from './pages/card/card.component';
import { CheckboxDocComponent } from './pages/checkbox/checkbox.component';
import { ClockDocComponent } from './pages/clock/clock.component';
import { DatepickerDocComponent } from './pages/datepicker/datepicker.component';
import { DatetimeDocComponent } from './pages/datetime/datetime.component';
import { DatetimePickerDocComponent } from './pages/datetime-picker/datetime-picker.component';
import { DialogDocComponent } from './pages/dialog/dialog.component';
import { DisplayDocComponent } from './pages/display/display.component';
import { DrawerDocComponent } from './pages/drawer/drawer.component';
import { InputDocComponent } from './pages/input/input.component';
import { LoaderDocComponent } from './pages/loader/loader.component';
import { MenuDocComponent } from './pages/menu/menu.component';
import { ModalDocComponent } from './pages/modal/modal.component';
import { NumberDocComponent } from './pages/number/number.component';
import { RadioDocComponent } from './pages/radio/radio.component';
import { SlideToggleDocComponent } from './pages/slide-toggle/slide-toggle.component';
import { SelectDocComponent } from './pages/select/select.component';
import { TableDocComponent } from './pages/table/table.component';
import { TabDocComponent } from './pages/tab/tab.component';
import { TextAreaComponent } from './pages/text-area/text-area.component';
import { ToastDocComponent } from './pages/toast/toast.component';
import { TimepickerDocComponent } from './pages/timepicker/timepicker.component';
import { TooltipDocComponent } from './pages/tooltip/tooltip.component';
import { BoxIconDocComponent } from './pages/box-icon/box-icon.component';
import { ChipsDocComponent } from './pages/chips/chips.component';
import { SearchPanelDocComponent } from './pages/search-panel/search-panel.component';
import { PanelDocComponent } from './pages/panel/panel.component';

const routes: Routes = [
  {
    path: 'accordion',
    component: AccordionComponent,
  },
  {
    path: 'box',
    component: BoxDocComponent,
  },
  {
    path: 'box-icon',
    component: BoxIconDocComponent,
  },
  {
    path: 'button',
    component: ButtonDocComponent,
  },
  {
    path: 'button-icon',
    component: ButtonIconDocComponent,
  },
  {
    path: 'button-toggle',
    component: ButtonToggleDocComponent,
  },
  {
    path: 'calendar',
    component: CalendarDocComponent,
  },
  {
    path: 'card',
    component: CardDocComponent,
  },
  {
    path: 'checkbox',
    component: CheckboxDocComponent,
  },
  {
    path: 'chips',
    component: ChipsDocComponent,
  },
  {
    path: 'clock',
    component: ClockDocComponent,
  },
  {
    path: 'datepicker',
    component: DatepickerDocComponent,
  },
  {
    path: 'datetime',
    component: DatetimeDocComponent,
  },
  {
    path: 'datetime-picker',
    component: DatetimePickerDocComponent,
  },
  {
    path: 'dialog',
    component: DialogDocComponent,
  },
  {
    path: 'display',
    component: DisplayDocComponent,
  },
  {
    path: 'drawer',
    component: DrawerDocComponent,
  },
  {
    path: 'input',
    component: InputDocComponent,
  },
  {
    path: 'loader',
    component: LoaderDocComponent,
  },
  {
    path: 'menu',
    component: MenuDocComponent,
  },
  {
    path: 'modal',
    component: ModalDocComponent,
  },
  {
    path: 'number',
    component: NumberDocComponent,
  },
  {
    path: 'panel',
    component: PanelDocComponent,
  },
  {
    path: 'radio',
    component: RadioDocComponent,
  },
  {
    path: 'search-panel',
    component: SearchPanelDocComponent,
  },
  {
    path: 'select',
    component: SelectDocComponent,
  },
  {
    path: 'slide-toggle',
    component: SlideToggleDocComponent,
  },
  {
    path: 'table',
    component: TableDocComponent
  },
  {
    path: 'tab',
    component: TabDocComponent,
  },
  {
    path: 'time-picker',
    component: TimepickerDocComponent
  },
  {
    path: 'text-area',
    component: TextAreaComponent,
  },
  {
    path: 'toast',
    component: ToastDocComponent,
  },
  {
    path: 'tooltip',
    component: TooltipDocComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiRoutingModule { }

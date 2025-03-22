import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { LayoutModule } from '@albert/layout';
import { UiModule, DrawerService, DialogService, ModalService, ToastService, TooltipComponent, BoxIconComponent } from '@albert/ui';
import { MarkdownModule } from 'ngx-markdown';
import { NgSelectModule } from '@ng-select/ng-select';
import { TableModule } from 'primeng';

import { DocTemplateModule } from 'src/app/doc-template/doc-template.module';
import { UiRoutingModule } from './ui-routing.module';
import { AccordionComponent } from './pages/accordion/accordion.component';
import { BoxDocComponent } from './pages/box/box.component';
import { ButtonDocComponent } from './pages/button/button.component';
import { ButtonIconDocComponent } from './pages/button-icon/button-icon.component';
import { ButtonToggleDocComponent } from './pages/button-toggle/button-toggle.component';
import { CalendarDocComponent } from './pages/calendar/calendar.component';
import { CardDocComponent } from './pages/card/card.component';
import { ClockDocComponent } from './pages/clock/clock.component';
import { CheckboxDocComponent } from './pages/checkbox/checkbox.component';
import { DatepickerDocComponent } from './pages/datepicker/datepicker.component';
import { DatetimeDocComponent } from './pages/datetime/datetime.component';
import { DatetimePickerDocComponent } from './pages/datetime-picker/datetime-picker.component';
import { DialogDocComponent } from './pages/dialog/dialog.component';
import { DisplayDocComponent } from './pages/display/display.component';
import { DrawerDocComponent } from './pages/drawer/drawer.component';
import { InputDocComponent } from './pages/input/input.component';
import { LoaderDocComponent } from './pages/loader/loader.component';
import { MenuDocComponent } from './pages/menu/menu.component';
import { ModalDocComponent, ModalFooterExampleComponent } from './pages/modal/modal.component';
import { NumberDocComponent } from './pages/number/number.component';
import { SlideToggleDocComponent } from './pages/slide-toggle/slide-toggle.component';
import { SelectDocComponent } from './pages/select/select.component';
import { RadioDocComponent } from './pages/radio/radio.component';
import { TabDocComponent } from './pages/tab/tab.component';
import { TableDocComponent } from './pages/table/table.component';
import { TextAreaComponent } from './pages/text-area/text-area.component';
import { TimepickerDocComponent } from './pages/timepicker/timepicker.component';
import { ToastDocComponent } from './pages/toast/toast.component';
import { TooltipDocComponent } from './pages/tooltip/tooltip.component';
import { ChipsDocComponent } from './pages/chips/chips.component';
import { PanelDocComponent } from './pages/panel/panel.component';
import { SearchPanelDocComponent } from './pages/search-panel/search-panel.component';
import { BoxIconDocComponent } from './pages/box-icon/box-icon.component';

@NgModule({
  imports: [
    CommonModule,
    DocTemplateModule,
    HttpClientModule,
    LayoutModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    NgSelectModule,
    TableModule,
    ReactiveFormsModule,
    UiModule,
    UiRoutingModule,
  ],
  declarations: [
    AccordionComponent,
    BoxDocComponent,
    BoxIconDocComponent,
    ButtonDocComponent,
    ButtonIconDocComponent,
    ButtonToggleDocComponent,
    CalendarDocComponent,
    CardDocComponent,
    ClockDocComponent,
    CheckboxDocComponent,
    ChipsDocComponent,
    DatepickerDocComponent,
    DatetimeDocComponent,
    DatetimePickerDocComponent,
    DialogDocComponent,
    DisplayDocComponent,
    DrawerDocComponent,
    InputDocComponent,
    LoaderDocComponent,
    MenuDocComponent,
    ModalDocComponent,
    ModalFooterExampleComponent,
    NumberDocComponent,
    PanelDocComponent,
    RadioDocComponent,
    SearchPanelDocComponent,
    SelectDocComponent,
    SlideToggleDocComponent,
    TabDocComponent,
    TextAreaComponent,
    ToastDocComponent,
    TableDocComponent,
    TimepickerDocComponent,
    TooltipDocComponent,
  ],
  providers: [
    DialogService,
    DrawerService,
    ModalService,
    ToastService
  ]
})
export class UiDocModule {}

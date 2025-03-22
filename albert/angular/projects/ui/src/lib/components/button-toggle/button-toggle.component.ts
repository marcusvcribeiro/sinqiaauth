import {
  Component,
  Input, Directive,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

@Component({
  selector: 'alb-button-toggle',
  templateUrl: './button-toggle.component.html',
  host: {
    'class': 'alb-button-toggle',
    '[class.alb-button-toggle-checked]': 'checked',
    '[class.alb-button-toggle-disabled]': 'disabled',
    '[attr.tabindex]': '-1',
    '[attr.id]': 'id',
  },
})
export class ButtonToggleComponent {
  /**
   *
   * @description
   *
   * Input boolean que seta como valor `checked`
   *
   */
  _checked: boolean;
  @Input()
  set checked(value: boolean) {
    this._checked = coerceBooleanProperty(value);
  }
  get checked(): boolean {
    return this._checked;
  }

  /**
   *
   * @description
   *
   * Input boolean que desativa um botão
   *
   */
  _disabled: boolean;
  @Input()
  set disabled(value: boolean) {
    this._disabled = coerceBooleanProperty(value);
  }

  get disabled(): boolean {
    return this._disabled;
  }

  /**
   *
   * @description
   *
   * Selecionado o tabIndex do elemento
   *
   */
  @Input() tabIndex: number;

  /**
   *
   * @description
   *
   * Selecionado o id do elemento
   *
   */
  @Input() id: boolean;

  /**
   *
   * @description
   *
   * Emite um output quando realizado um mudança no botão clicado
   *
   */
  @Output() readonly change: EventEmitter<ButtonToggleComponent> = new EventEmitter<ButtonToggleComponent>();

  onButtonClick() {
    this.change.emit(this);
  }
}

@Directive({
  selector: 'alb-button-toggle-group',
  host: {
    'class': 'alb-button-toggle-group',
    '[class.horizontal]': 'direction === "horizontal"',
    '[class.vertical]': 'direction === "vertical"'
  },
})
export class ButtonToggleGroupDirective implements AfterContentInit, OnDestroy {
  @ContentChildren(ButtonToggleComponent) buttons: QueryList<ButtonToggleComponent>;
  buttonSelected: ButtonToggleComponent;

  /**
   *
   * @description
   *
   * Tipo da direção, você pode utilizar os seguintes valor válidos:
   *  - `horizontal`: estilo padrão do alb-button-toggle-group, a qual a sequencia de botões segue na direção horizontal
   *  - `vertical`: a sequencia de botões ficam na vertical
   *
   */
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   *
   * @description
   *
   * Emite um output quando realizado um mudança no botão clicado
   *
   */
  @Output() readonly change: EventEmitter<ButtonToggleComponent> = new EventEmitter<ButtonToggleComponent>();

  private _unsubscribe$: Subject<boolean> = new Subject();

  ngOnDestroy() {
    this._unsubscribe$.next(true);
    this._unsubscribe$.complete();
  }

  /**
   * Verifica se algum ButtonToggle foi emitido um evento `click`, caso emitido o botão selecionado será adicionado o input `checked`
   * como true e resetará todos os outros inputs
   */
  ngAfterContentInit() {
    this.buttons.forEach(button => {
      button.change
        .pipe(takeUntil(this._unsubscribe$))
        .subscribe(buttonClicked => {
          if (this.buttonSelected !== buttonClicked) {
            this._cleanButtonToggleChecked();
            this.buttonSelected = buttonClicked;
            this.buttonSelected.checked = true;
            this.change.emit(this.buttonSelected);
          }
        });
    });
  }

  _cleanButtonToggleChecked() {
    this.buttons.forEach(button => button.checked = false);
  }
}


import { BoxIconComponent } from '../box-icon/box-icon.component';
import { Component, Directive, ElementRef, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chips } from '../chips/chips';
import { ChipsComponent } from '../chips/chips.component';
import { PanelRef } from '../panel/panel';
import { PanelService } from '../panel/panel.service';
import { SearchPanelOptions } from './search-panel';
import { SearchPanelChipDirective } from './search-panel-chip.directive';

@Component({
  selector: 'alb-search-panel',
  templateUrl: './search-panel.component.html'
})
export class SearchPanelComponent implements OnDestroy {

  /**
   * @description
   *
   *  Elemento que serve de âncora (referência) para o panel a ser criado
   */
  @ViewChild('anchor', { read: ElementRef, static: true }) anchorPanel: ElementRef<any>;

  /**
   * @description
   *
   *  Elemento que serve de âncora (referência) para o panel a ser criado
   */
   @ViewChild(BoxIconComponent, { static: true }) boxIconComponent: BoxIconComponent;

  /**
   * @description
   *
   *  Referência para o component de chips
   */
  @ViewChild(ChipsComponent, { static: true }) chipsComponent: ChipsComponent;

  /**
   * @description
   *
   * Opções do component
   * Atualmente a única opção é o component do formulário que vai ser
   * inserido dentro do panel aberto
   */
  @Input() options: SearchPanelOptions;

  /**
   * @description
   *
   * Evento disparado com a referência do componente instanciado quando o search panel é criado.
   */
  @Output() created: EventEmitter<PanelRef> = new EventEmitter<PanelRef>();

  /**
   * @description
   *
   * Evento disparado quando um chip criado é excluído pelo botão de "x".
   */
  @Output() chipDestroyed: EventEmitter<Chips> = new EventEmitter<Chips>();

  /**
   * @description
   *
   *  Referência para o panel criado
   */
  panelRef: PanelRef;

  /**
   * @description
   *
   *  Subscription do ViewChildren dos campos do component que vão criar chips
   */
  subscriptionChipComponent: Subscription;

  /**
   * @description
   *
   *  Subscription do change de cada campo do component que vão criar chips
   */
  subscriptionChipsChangeArray: Subscription[] = [];

  /**
   * @description
   *
   *  Array com os campos que tem que criar chip
   */
  protected chips: SearchPanelChipDirective[] = [];

  constructor(private panelService: PanelService) { }

  /**
   * @description
   *
   *  Limpa as subscriptions criadas na execução do component
   */
  ngOnDestroy() {
    if (this.panelRef) {
      this.panelRef.panelComponent.instance.close.next();
    }
    if (this.subscriptionChipComponent) {
      this.subscriptionChipComponent.unsubscribe();
    }
    this.clearChipsSubscriptions();
  }

  /**
   * @description
   *
   *  Limpa as subscriptions para o change dos inputs
   */
  clearChipsSubscriptions() {
    for (const subscription of this.subscriptionChipsChangeArray) {
      subscription.unsubscribe();
    }
  }

  /**
   * @description
   *
   *  Exibe ou não o panel com o formulário da pesquisa.
   *  Se é a primeira execução salva a referência do panel criado
   *  e roda a rotina de inicialização do component
   */
  async togglePanel(open: boolean) {
    if (!this.options || !this.options.component) {
      throw new Error('É necessário informar um component para o search!');
    }
    const panelRef = await this.panelService.togglePanel({
      anchorPoint: this.anchorPanel,
      component: this.options.component,
      componentProps: {
        chipsComponent: this.chipsComponent
      }
    });

    if (!this.panelRef) {
      this.initPanel(panelRef);
      this.panelRef = panelRef;
      this.created.next(this.panelRef);
    }
  }

  /**
   * @description
   *
   *  É feito o subscribe nos inputs do component de formulário e
   *  feito também o subscribe no change de cada input
   *  para sincronizar a criação/alteração/remoção de cada chip
   */
  async initPanel(panelRef: PanelRef) {
    const chips = panelRef.component && panelRef.component.instance &&
                              panelRef.component.instance.chips as QueryList<SearchPanelChipDirective>;
    this.subscriptionChipComponent = chips.changes.subscribe({
        next: (res: QueryList<SearchPanelChipDirective>) => {
            this.clearChipsSubscriptions();
            this.chips = res.toArray();
            if (this.options.autoUpdate === true) {
              for (const chipDirective of this.chips) {
                chipDirective.destroy.subscribe((chip: Chips) => {
                  this.chipDestroyed.next(chip);
                });
                chipDirective.changeValue.subscribe((chip: Chips) => {
                  if (chip.value === null) {
                    this.chipsComponent.removeChipByKey(chip.key);
                  } else {
                    this.chipsComponent.addChips(chip, true);
                  }
                });
              }
            }
        }
    });
    chips.notifyOnChanges();

    // Configura o clicar do botão para criar os chips no evento de clicar do element com o search-panel-create-chip
    const searchPanelCreateChipButton: HTMLElement = panelRef.panelComponent.instance.elementRef
                                        .nativeElement.querySelector('[alb-search-panel-create-chip]');
    if (searchPanelCreateChipButton) {
      searchPanelCreateChipButton.addEventListener('click', () => {
        this.updateChips();
        if (this.options.disablePanelCloseOnSearch !== true) {
          this.boxIconComponent.onChange();
        }
      });
    }

    // Configura o clicar do botão para limpar os chips no evento de clicar do element com o search-panel-clear-chips
    const searchPanelClearChipsButton: HTMLElement = panelRef.panelComponent.instance.elementRef
                                        .nativeElement.querySelector('[alb-search-panel-clear-chips]');
    if (searchPanelClearChipsButton) {
      searchPanelClearChipsButton.addEventListener('click', () => {
        this.clearChips();
        if (this.options.disablePanelCloseOnSearch !== true) {
          this.boxIconComponent.onChange();
        }
      });
    }
  }

  protected updateChips() {
    for (const chipDirective of this.chips) {
      const chip: Chips = chipDirective.updateChip(true);
      if (chip) {
        if (chip.value === null) {
          this.chipsComponent.removeChipByKey(chip.key);
        } else {
          this.chipsComponent.addChips(chip, true);
        }
      }
    }
  }

  protected clearChips() {
    for (const chipDirective of this.chips) {
      chipDirective.resetValue();
      this.chipsComponent.removeChipByKey(chipDirective.getChipKey());
    }
  }

}

/**
 * @description
 * Diretiva utilizada para especificar o elemento que ao ser clicado vai executar a função de criar os chips
 */
@Directive({
  selector: '[alb-search-panel-create-chip]',
})
export class SearchPanelCreateChipDirective { }

/**
 * @description
 * Diretiva utilizada para especificar o elemento que ao ser clicado vai executar a função de limpar os chips
 */
@Directive({
  selector: '[alb-search-panel-clear-chips]',
})
export class SearchPanelClearChipsDirective { }

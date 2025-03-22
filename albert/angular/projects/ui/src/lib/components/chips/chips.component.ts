import { Component, Input, OnInit } from '@angular/core';
import { Chips } from './chips';

@Component({
  selector: 'alb-chips',
  templateUrl: './chips.component.html',
  host: {
    'class': 'alb-chips',
  }
})
export class ChipsComponent implements OnInit {

  /**
   * @description
   *
   * Array contendo os valores de cada chip.
   *
   */
  _chips: any[] = [];

  @Input()
  set chips(chipsArray: Chips[]) {
    this.clearChips();
    for (const chips of chipsArray) {
      this.addChips(chips);
    }
  }

  get chips(): Chips[] {
    return this._chips;
  }

  /**
   * @description
   *
   * Variável que indica se o container com os chips vão ser sem quebra de linha.
   *
   */
  @Input() noWrap = false;

  /**
   * @description
   * Variável utilizada para definir a exibição do botão de deletar o chip.
   */
  @Input() remove = true;

  /**
   * @description
   * Variável utilizada para definir a exibição do placeholder no chip.
   */
  @Input() placeholder = true;

  /**
   * @description
   * Variável utilizada para definir se o chip será selecionável.
   */
  @Input() isSelectable = false;

  /**
   * @description
   * Variável utilizada para definir se o chip será exibido em formato de lista.
   */
  @Input() isList = false;

  idIncremental = 0;

  /**
   * @description
   * Array com os chips selecionados.
   */
  chipsSelecionados: Chips[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  removeChip(chip: Chips) {
    const index = this.chips.indexOf(chip);
    if (index > -1) {
      const chipRemovido = this.chips.splice(index, 1)[0];
      if (chipRemovido.onDestroy) {
        chipRemovido.onDestroy(chipRemovido);
      }
    }
  }

  selecionarChip(chip: Chips) {
    if (this.isSelectable) {
      const index = this.chipsSelecionados.indexOf(chip);
      if (index > -1) {
        this.chipsSelecionados.splice(index, 1);
      } else {
        this.chipsSelecionados.push(chip);
      }
    }
  }

  isChipSelecionado(chip: Chips) {
    const index = this.chipsSelecionados.indexOf(chip);
    return index > -1;
  }

  addChips(chip: Chips, replaceIfKeyExists: boolean = true) {
    if (!chip.key) {
      chip.key = `chip-${this.idIncremental++}`;
      this._chips.push(chip);
      return;
    } else if (replaceIfKeyExists) {
      const chipAtual = this._chips.find((item) => item.key === chip.key);
      if (chipAtual) {
        chipAtual.placeholder = chip.placeholder;
        if (chipAtual.value !== chip.value) {
          chipAtual.value = chip.value;
        }
        return;
      }
    }
    this._chips.push(chip);
    return chip;
  }

  removeChipByKey(key: string) {
    const chipAtual = this._chips.find((item) => item.key === key);
    if (chipAtual) {
      this.removeChip(chipAtual);
    }
  }

  clearChips() {
    this._chips = [];
  }

}

import { AfterViewInit, Directive, Input, Optional, Output, EventEmitter } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Chips } from '../chips/chips';
import { format } from 'date-fns';

export class ChipValueTransformerDataType {
    static dateTime(date: string) {
        const dateObj = new Date(date);
        return format(dateObj, 'dd/MM/yyyy HH:mm:ss');
    }
    static date(date: string) {
        const dateObj = new Date(`${date} 00:00:00`);
        return format(dateObj, 'dd/MM/yyyy');
    }
}

@Directive({
    selector: '[alb-search-panel-chip]',
})
export class SearchPanelChipDirective implements AfterViewInit {

    static nextId = 1;
    id = `search-panel-chip-directive-${SearchPanelChipDirective.nextId++}`;
    lastValue = null;

    /**
     * @description
     *
     *  placeholder do chip (podendo ser o mesmo utilizado nos inputs)
     */
    @Input() placeholder: string;

    /**
     * @description
     *
     *  placeholder do chip a ser utilizado caso seja diferente do placeholder do input
     */
    @Input() chipPlaceholder: string;

    /**
     * @description
     *
     *  desabilita a exibição do placeholder
     */
    @Input() disableChipPlaceholder = false;

    /**
     * @description
     *
     *  Função para converter o valor do input para outro valor de exibição
     *  Se for string vai ser utilizado como chave para pegar o valor do objeto
     */
    @Input() chipValueTransformer: (value: any) => string | string;

    /**
     * @description
     *
     *  Especifica que ao gerar o chip vai formatar o valor como um campo de data e hora
     */
    @Input() formatAsDateTime: boolean;

    /**
     * @description
     *
     *  Especifica que ao gerar o chip vai formatar o valor como um campo de data
     */
    @Input() formatAsDate: boolean;

    /**
     * @description
     *
     *  Evento disparado quando é modificado o chip
     */
    @Output() changeValue = new EventEmitter<Chips>();

    /**
     * @description
     *
     *  Evento disparado quando é removido o chip
     */
     @Output() destroy = new EventEmitter<Chips>();

    constructor(
        @Optional() private control: NgControl
    ) { }

    ngAfterViewInit() {
        if (this.formatAsDate) {
            this.chipValueTransformer = ChipValueTransformerDataType.date;
        } else if (this.formatAsDateTime) {
            this.chipValueTransformer = ChipValueTransformerDataType.dateTime;
        }
        this.control.valueChanges.subscribe({
            next: (value) => {
                const chip: Chips = this.updateChip();
                if (chip) {
                    setTimeout(() => {
                        this.changeValue.next(chip);
                    }, 0);
                }
            }
        });
    }

    getProp( object: any, keys: string[] | string, defaultVal: any = null ) {
        keys = Array.isArray( keys ) ? keys : keys.split('.');
        object = object[keys[0]];
        if ( object && keys.length > 1 ) {
            return this.getProp( object, keys.slice(1) );
        }
        return object === undefined ? defaultVal : object;
    }

    getValue(): any {
        return this.control && this.control.value;
    }

    resetValue() {
        if (this.control) {
            this.control.reset(null);
        }
    }

    updateChip(force: boolean = false): Chips {
        const value = this.getValue();
        if (this.lastValue === value && !force) {
            return null;
        }
        this.lastValue = value;
        if (!value) {
            return {
                key: this.getChipKey(),
                value: null
            };
        }
        let chipValue: any;
        if (this.chipValueTransformer) {
            if (typeof this.chipValueTransformer === 'string') {
                chipValue = value ? this.getProp(value, this.chipValueTransformer, undefined) : undefined;
            } else if (typeof this.chipValueTransformer === 'function') {
                chipValue = this.chipValueTransformer(value);
            }
        } else {
            chipValue = value;
        }
        return {
            key: this.getChipKey(),
            placeholder: !this.disableChipPlaceholder ? (this.chipPlaceholder || this.placeholder || null) : null,
            value: chipValue,
            onDestroy: (chip: Chips) => {
                this.control.reset();
                setTimeout(() => {
                    this.destroy.next(chip);
                });
            }
        };
    }

    getChipKey(): string {
        return String(this.control.name || this.id);
    }

}

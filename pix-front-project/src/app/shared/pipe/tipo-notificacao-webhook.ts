import { DecimalPipe } from '@angular/common';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'tipoNotificacaoWebhook' })
export class tipoNotificacaoWebhookPipe implements PipeTransform {

    /**
     *
     */
    constructor() {
        
    }
  
    transform(value: any): string | null {

      switch (value) {
        case '1':
          return 'CashIn';
        case '2':
          return 'CashOut';
        default:
          return '-';
      }
    }
}

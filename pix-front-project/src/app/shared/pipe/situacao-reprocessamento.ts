import { DecimalPipe } from '@angular/common';
import { PipeTransform, Pipe } from '@angular/core';

@Pipe({ name: 'situacaoReprocessamento' })
export class SituacaoReprocessamentoPipe implements PipeTransform {

    /**
     *
     */
    constructor() {
        
    }
  
    transform(value: any): string | null {

      switch (value) {
        case 'N':
          return 'Aguardando reprocessamento';
        case 'E':
          return 'Em reprocessamento';
        case 'R':
          return 'Enviado para reprocessamento';
        case 'P':
          return 'Processado';
        default:
          return '-';
      }
    }
}

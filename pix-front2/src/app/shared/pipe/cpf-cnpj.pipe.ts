import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpfCnpj' })
export class CpfCnpjPipe implements PipeTransform {

  transform(cpfCnpj: string | number) {
    if (!cpfCnpj) {
      return cpfCnpj;
    }

    if (typeof cpfCnpj === 'number') {
      cpfCnpj = cpfCnpj.toString();
    }

    if (cpfCnpj.trim().length <= 11) {
      return (cpfCnpj.substring(0, 3) +
        '.' +
        cpfCnpj.substring(3, 6) +
        '.' +
        cpfCnpj.substring(6, 9) +
        '-' +
        cpfCnpj.substring(9, 11));
    } else {
      return (cpfCnpj.substring(0, 2) +
        '.' +
        cpfCnpj.substring(2, 5) +
        '.' +
        cpfCnpj.substring(5, 8) +
        '/' +
        cpfCnpj.substring(8, 12) +
        '-' +
        cpfCnpj.substring(12, 14));
    }
  }
}

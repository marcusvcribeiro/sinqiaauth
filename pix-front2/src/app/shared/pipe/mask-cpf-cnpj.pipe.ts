import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskCpfCnpj'
})
export class MaskCpfCnpjPipe implements PipeTransform {

  transform(value: String, ...args: unknown[]): unknown {
    return this.cpfCnpj(value);
  }

  cpfCnpj(v) {

    //Remove tudo o que não é dígito
    v = v.replace(/\D/g, '');

    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    } else {
      v = v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3\/\$4\-\$5');
    }

    return v;

  }

}



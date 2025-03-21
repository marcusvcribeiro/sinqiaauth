import { Pipe, PipeTransform } from '@angular/core';
import { DonoChave } from '../model/dono-chave-pix';

@Pipe({
  name: 'donoChaveDict'
})
export class DonoChaveDictPipe implements PipeTransform {

  transform(value: DonoChave, ...args: unknown[]): unknown {
    let complemento: String = 'CNPJ: ';
    if(value.tipoDono === 1){
      complemento = `CPF: `;
    }

    return `${"Chave: "} ${value.chvEnd}  ${complemento}${this.cpfCnpj(value.idDono)}   ${"Nome: "} ${value.nome} `;
  }

  cpfCnpj(v){

    //Remove tudo o que não é dígito
    v=v.replace(/\D/g,'')

    if (v.length <= 11) {
        v=v.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,'\$1.\$2.\$3\-\$4');
    } else {
        v=v.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,'\$1.\$2.\$3\/\$4\-\$5');
    }

    return v;

}

}

export class CertificadoraDigital {
  id: number;
  nome: string;
  idCliente: string;
  senhaCliente: string;

  constructor(id: number,idCliente: string,  senhaCliente: string) {
    this.id = id;
    this.idCliente = idCliente;
    this.senhaCliente = senhaCliente;
  }
}

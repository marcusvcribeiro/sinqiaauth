import { deserializeAs } from 'cerialize';

export class AlertaNaoLido {
  @deserializeAs(Number, 'QtdAlrtasNaoLidos')
  alertaNaoLido: number;
}

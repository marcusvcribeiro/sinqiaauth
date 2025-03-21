import { deserializeAs } from 'cerialize';

export class DefaultResponseGeneric<T> {
  code: string;
  mensagem: string;
  body: T
}

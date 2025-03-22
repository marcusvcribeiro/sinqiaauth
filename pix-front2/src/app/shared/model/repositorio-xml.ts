import { deserializeAs } from 'cerialize';

export class RepositorioXml {
  @deserializeAs(String, 'xml')
  xml: string;
}

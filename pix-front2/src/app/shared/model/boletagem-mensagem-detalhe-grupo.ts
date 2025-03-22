import { autoserializeAs } from 'cerialize';

export class BoletoArquitetura {
  @autoserializeAs(String, 'id_tag')
  id: String;
  @autoserializeAs(String, 'dsc_lbl_tag')
  label: String;
  @autoserializeAs(String, 'vlr_tag')
  value: String;
  @autoserializeAs(String, 'id_tip_cam')
  type: Number;

  hash;

  @autoserializeAs(BoletoArquitetura, 'tags')
  values: BoletoArquitetura[] = [];
  @autoserializeAs(BoletoArquitetura, 'grupos')
  groups: BoletoArquitetura[] = [];
}

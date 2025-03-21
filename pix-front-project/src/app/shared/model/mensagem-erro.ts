import { Deserialize, deserializeAs, Serialize, serializeAs } from 'cerialize';


function Custom(type?) {
  return {
    Serialize: function (value: any) {
      return Serialize(value, type);
    },
    Deserialize: function (json: any) {
      return Deserialize(json, type);
    }
  };
}

function mensagemErro(t?) {
  class InnerMensagemErro<T> {
    @serializeAs(Custom(t), 'keys') @deserializeAs(Custom(t), 'keys') records: T[];
  }
  return new InnerMensagemErro();
}

class MensagemErro<T> {
  @serializeAs('keys')
  @deserializeAs('keys')
  records: T[];

  constructor(obj) {
    Object.assign(this, obj);
  }
}

export { mensagemErro, MensagemErro };

